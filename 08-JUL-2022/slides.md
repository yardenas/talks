---
layout: cover
download: true
highlighter: shiki
info: |
  ## Safe Adaptation

  Kickoff meeting for the Safe Adaptation project.
  
  [Yarden As](https://asyarden.com)
---

# Learn to Learn Safely

Project kickoff meeting


<div class="uppercase text-sm tracking-widest">
Yarden As
</div>

<div class="abs-bl mx-14 my-12 flex">
  <div class="ml-3 flex flex-col text-left">
    <div class="text-sm opacity-50">May. 8th 2022</div>
  </div>
</div>


---
layout: intro
---

# Yarden As

<div class="leading-8 opacity-80">
PhD student @ <a href="https://las.inf.ethz.ch/" target="_blank">Learning & Adaptive Systems</a>.<br>
Working on safe reinforcement learning.<br>
</div>

<div class="my-10 grid grid-cols-[40px,1fr] w-min gap-y-4">
  <ri-github-line class="opacity-50"/>
  <div><a href="https://github.com/yardenas" target="_blank">yardenas</a></div>
  <ri-twitter-line class="opacity-50"/>
  <div><a href="https://twitter.com/yarden_as" target="_blank">yarden_as</a></div>
  <ri-user-3-line class="opacity-50"/>
  <div><a href="https://asyarden.com" target="_blank">asyarden.com</a></div>
</div>

<img src="/yarden-as.jpg" class="rounded-full w-40 abs-tr mt-16 mr-12"/>

---
layout: section
---

# Preliminary work: constrained Markov decision processes
###### Learning to act safely via constraints

---

# Constrained Markov decision processes

A quick recap

<div class="grid grid-cols-2 gap-x-4">
<div>

### Gist

<v-clicks>

- An agent is rewarded for taking actions that help solving the task <fluent-reward-24-filled class="text-3xl text-yellow-400 animate-pulse" />
- An agent incurs cost at each time step for taking unsafe actions <maki-danger class="text-3xl text-red-600 animate-pulse" />
- Bound the expected sum of costs (under the MDP's and policy's stochasticity.) <ic-round-gpp-good class="text-3xl text-blue-500 animate-pulse" />

</v-clicks>


</div>
<div>

<v-clicks>

### (A bit more) formally


Find a policy $\pi$ that solves:
$$
  \begin{aligned}
    \max_{\pi} \quad & \mathbb{E}_{\pi} \left[\sum_t r_t\right] \\
    \text{s.t.} \quad & \mathbb{E}_{\pi} \left[\sum_{t}^{} c_t\right] < d
  \end{aligned}
$$

</v-clicks>
</div>
</div>

---

# LAMBDA

[Constrained Policy Optimization via Bayesian World Models](https://arxiv.org/abs/2201.09802) (ICLR 2022, joint work with [Ilnura Usmanova](https://control.ee.ethz.ch/people/profile.ilnura-usmanova.html), [Sebastian Curi](https://las.inf.ethz.ch/people/sebastian-curi) and [Andreas Krause](https://las.inf.ethz.ch/krausea))


<!-- TODO (yarden): create a Vue component of a tooltip that explains the different things. -->
<div class="grid grid-cols-2 gap-x-4">
<div class="relative">
  <div v-click class="w-72 absolute inset-x-18 top-20 z-1">
      <img src="/lambda-demo.svg">
  </div>
  <div v-click="2" clas="absolute inset-x-30 z-0">
    <img src="/lambda-training-loop.svg" width="500">
  </div>
</div>
<div>

<v-clicks>

- Collect data on the real environment based on $\pi$
- Use this data to fit a statistical model of the environment
</v-clicks>
<ul>
  <li v-click="7">Simulate the policy with the model. Backpropagate policy gradients through the model</li>
  <li v-click="8">Solve the constrained problem with <i><b>the Augmented Lagrangian</b></i></li>
</ul>

<div v-click="6">

```python {all|2|7|all}
def policy_loss(policy, model, initial_state, lagrangian):
  trajectory = model.simulate(policy, initial_state)
  # Use learned critics to **estimate** the 
  # objective and constraints.
  objective = reward_critic(trajectory).mean()
  constraint = cost_critic(trajectory).mean()
  return -objective + lagrangian * constraint

policy_grads = grad(policy_loss)(...)
```
</div>
</div>
</div>

---


# How well does it work?

Testing LAMBDA with the [Safety Gym](https://openai.com/blog/safety-gym/) benchmark suite


<div class="flex flex-row">
<div>
  <img src="https://imgur.com/0G3VKle.gif" width="800">
  <img src="https://imgur.com/zdyuRdN.gif" width="800">
</div>

<div>
  <img src="/lambda-results.svg" class="w-65">
</div>
</div>

<br>

<div class="text-center mt-10">

## Main takeaway: solves nicely <b><i>all tasks</i></b> with <b><i>all robots</i></b>.
</div>

---
layout: statement
---

# But... <twemoji-thinking-face /> 


<v-clicks>

### The tasks seem quite similar (especially with the same robot)...

</v-clicks>

<br>
<br>

<v-clicks>

### So

</v-clicks>

<br>
<br>

<v-clicks>

### Can we share knowledge between different tasks?

### Can we do so safely?

</v-clicks>

---
layout: statement
---

# Can we use *meta-learning* to solve *safe adaptation*?

<sub class="relative inset-y-45">\**Hint: we don't know, yet</sub>

---

# Meta-learning

Solving multiple tasks

<div class="grid grid-cols-2 gap-x-4">
<div class=opacity-80>


 - Assume MDPs (=tasks) can be sampled from a root distribution: $\mathcal{T} \sim p(\mathcal{T})$
 - Maximize the expected value across tasks: $\max_{\pi} \mathbb{E}_{p(\mathcal{T}), \pi} \left[\sum_t r_t\right]$

 <br>
 <br>
 <br>

<div v-click>

 ## How to extend this idea to safety?
</div>
</div>
<div>
  <img src="/ml45.gif" class="absolute w-auto -top-10 left-128">
  <div class="absolute bottom-5">
  
  [^1] Image: meta-world benchmark

  [^1]: [Meta-World](https://meta-world.github.io/)
  </div>
</div>

</div>

---

# Extending meta-learning to CMDPs
What's the problem with the following?
<!-- Naìve approach -->

<div class="flex">



<div class="opacity-80">

$$
  \begin{aligned}
    \max_{\pi} \quad & \mathbb{E}_{p(\mathcal{T}), \pi} \left[\sum_t r_t\right] \\
    \text{s.t.} \quad & \mathbb{E}_{\textcolor {red} {p(\mathcal{T})}, \pi} \left[\sum_{t}^{} c_t\right] < d
  \end{aligned}
$$
</div>

<div class="text-5xl mx-30 my-15">

<twemoji-face-with-monocle />

</div>

<div v-click class="mx-20 my-15 opacity-80">

## That's quite Naìve
</div>


</div>

<div class="opacity-80">

<v-clicks>

## Safety is not maintained per task!

## This is still an open question.

Previous work tends to look at _robustness to uncertainty_ over MDPs, but this typically comes with a price: reduction of performance

</v-clicks>

</div>

---
layout: section
---

# Current progress

---

# Baselines

Creating a testbed for safe adaptation algorithms



<div class="flex">
<v-clicks>
<div>

### `safe-adaptation-gym`

A benchmark suite for safe adaptation

- 8 different tasks implemented
- Each sampled task is subject to different dynamical properties
- Number of obtacles and their sizes sampled randomly per task
- CMDP constraint bound ($d$) sampled randomly per task
</div>

<div>

### `safe-adaptation-agents`

Implementation of 4 different baseline algorithms

- RL$^2$ ([Duan et al. 2016](https://arxiv.org/abs/1611.02779?context=cs)) combined with CPO ([Achiam et al. 2017](https://meta-world.github.io/))
- MAML ([Finn et al. 2017](https://arxiv.org/abs/1703.03400?context=cs)) combined with PPO-Lagrangian ([Ray et al. 2019](https://cdn.openai.com/safexp-short.pdf))
- LAMBDA ([As et al. 2022](https://arxiv.org/abs/2201.09802))
- MAML ([Finn et al. 2017](https://arxiv.org/abs/1703.03400?context=cs)) combined with safe CEM-MPC ([Liu et al. 2021](https://arxiv.org/abs/2010.07968))


</div>
</v-clicks>
</div>

---
layout: iframe-right
url: https://www.youtube.com/embed/v6mZG8W7Qck?&autoplay=1&start=58
---

# Outlook

Why is this problem interesting? Trajectory planning in spinal robotic surgeries 

<v-clicks>

- Trajectory planning in the pre-operative stage is done manually by surgeon.
- Patients come in "all shapes and sizes."
- But still share a common structure.
- Thus, a we need algorithms that use the _prior knowledge of common structure_ to adapt _quickly and safely_ to new patients.

</v-clicks>

---
layout: image-right
image: https://source.unsplash.com/_0fXQrtNZEo/1920*2560
---
# Recap

<div class="opacity-80">

- Constrained Markov decision processes.
- Meta-reinforcement learning with constraints (?)
- Current state of progress.
- Application.

</div>

<div class="abs-bl mx-14 my-12">

## Thanks!

</div>




