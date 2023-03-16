---
layout: cover
download: true
highlighter: shiki
info: |
  ## Safe Adaptation in Uncertain Constrained Markov Decision Processes

  Thesis Proposal

  Yarden As
title: Safe Adaptation in Uncertain Constrained Markov Decision Processes
fonts:
  sans: Manrope
---

# Safe Adaptation in Uncertain Constrained Markov Decision Processes
THESIS PROPOSAL

<div class="text-sm tracking-widest">
Yarden As
</div>

<div class="abs-bl mx-14 my-12 flex">
  <div class="ml-3 flex flex-col text-left">
    <div class="text-sm opacity-50">Mar. 24th 2023</div>
  </div>
</div>


---

# Yarden As
<style>
p, ul {
  @apply font-mono opacity-90;
}
</style>

<br>
<br> 

PhD student @ <a href="https://las.inf.ethz.ch/" target="_blank">Learning & Adaptive Systems</a>.<br>
Working on safe reinforcement learning.

<br>


Previously:

- MSc, Robotics, Systems & Control (ETH Zürich)
- Robotics Algorithms Engineer (Industry, Tel-Aviv)
- BSc, Mechanical Engineering (Technion, Haifa)

<br>
<br>

Passionate about making reinforcement learning work in the real world.

<img src="https://media.licdn.com/dms/image/D4D03AQHADuIJ4YvLbQ/profile-displayphoto-shrink_800_800/0/1667507229540?e=1684368000&v=beta&t=-hHzEeHHFcwlHyQw50OKa3uvhJCEyvmPmnljMTdgRtY" class="rounded-full w-40 abs-tr mt-16 mr-12"/>


---
clicks: 2
---

# Back to Basics
Reinforcement learning: a data-driven approach for sequential decision-making

<div class="relative bottom-10">

<div v-click-hide="2" class="absolute ml-58 mt-40 text-right">

state
<br>
$s_{t}$

</div>

<div v-click="1" class="absolute ml-147 mt-40 text-left">

action
<br>
$a_{t}$

</div>

<div v-click="2" class="absolute ml-42 mt-40 text-right">

state, reward
<br>
$s_{t + 1}, r_{t}$

</div>

<img src="/rl-loop.svg" class="absolute">

<div class="absolute right-30 top-65">

## <Reference link="http://incompleteideas.net/book/RLbook2020.pdf">Sutton & Barto (1992)</Reference>

</div>

</div>


---

# Recap
Interacting with the environment is modeled as a Markov Decision Process

* State space: $s_t \in \mathcal{S}$
* Action space: $a_t \ \in \mathcal{A}$
* Transition function: $s_{t + 1} \sim P(\cdot | s_t, a_t), P: \mathcal{S} \times \mathcal{A} \times \mathcal{S} \rightarrow [0, 1]$
* Reward function: $r_t = R(s_t, a_t), R: \mathcal{S} \times \mathcal{A} \rightarrow \mathbb{R}$
* Policy: $\pi: \mathcal{S} \times \mathcal{A} \rightarrow [0, 1]$
* Trajectory $\tau = \left\{s_0, a_0, a_1, \dots, a_{T -1}, s_T \right\}, 
\tau \sim p(\tau) = p(s_0) \prod_{t = 1}^{T} \pi(a_t | s_t)P(s_{t + 1} | s_t, a_t)$

<div v-click class="container mt-10 text-blue-gray-900">

#### Goal: find a policy $\pi(a_t | s_t)$
$$\pi \in \arg\max_{\pi} \mathbb{E}_{\tau \sim p(\tau)} \left[\sum_{t = 0}^T R(s_t, a_t)\right]$$

</div>


---
layout: statement
---

# Is it a perfect model?


---

# Some Open Challenges


<v-clicks>
<div class="absolute -bottom-40 -left-25">
<IdeaCircle color="bg-blue-gray-50">
<Reward class="absolute bottom-60 left-28" />
<h3 class="absolute top-55 left-10 w-140">
Is the reward enough to guarantee<br><em>safe</em> behavior?
</h3>
</IdeaCircle>
</div>

<div class="absolute bottom-35 left-125">
<IdeaCircle color="bg-violet-50">
<VarP class="absolute top-50 right-50"/>
<h3 class="absolute top-80 -left-5 w-140">

What if $P(s^\prime | s, a)$ or $R(s_t, a_t)$ vary <br> between trials?

</h3>
</IdeaCircle>
</div>
</v-clicks>


---

# Real-World Examples
Where do these challeges emerge?

<div class="grid grid-cols-3 gap-10 leading-10">
<v-clicks>
<div>
  <RoundedImage image="https://source.unsplash.com/HeqXGxnsnX4/640*960" title="Agriculture & Sustainability">

  <VarP size="text-2xl" class="relative -left-42 top-3"/> Different weather regimes and soil compositions.


  <Reward size="text-2xl" class="relative -left-42 top-3"/> Over-fertilization accelerates greenhouse effects.<Reference link="https://www.nature.com/articles/ngeo325">Erisman et al., (2008)</Reference>

  
  </RoundedImage>
  </div>
  <div>
  <RoundedImage image="https://source.unsplash.com/cUmFjDhiTfc" title="Medical Applications">
  
  <VarP size="text-2xl" class="relative -left-40 top-2"/> Patients react differently to different treatments.
  
  <Reward size="text-2xl" class="relative -left-40 top-2"/> Clinical setting requires safety.<Reference link="https://arxiv.org/abs/2203.08057">Pace et al., (2022)</Reference>

  </RoundedImage>
  </div>
    <div>
  <RoundedImage image="https://roboticsandautomationnews.com/wp-content/uploads/2021/03/basf-autonomous-robot-anymal-0.png" title="Robotics">
  
  <VarP size="text-2xl" class="relative -left-38 top-1"/> Robots should not harm themselves or their environment.

  <Reward size="text-2xl" class="relative -left-38 top-1"/> Objectives and dynamics may vary.<Reference link="">Thrun et al., (2005)</Reference>

  </RoundedImage>
  </div>
</v-clicks>
</div>


---

# Safety in Reinforcement Learning
Three common approaches

<div class="flex gap-25 container mx-auto w-max h-max mt-25">
  <div v-click>
    <ph-line-segments class="text-8xl opacity-90 text-blue-gray-900"/>
    <p class="text-1.25em">Ergodicity</p>
  </div>
  <div v-click>
    <ooui-map-trail class=" text-8xl opacity-90 text-blue-gray-900"/>
    <p class=" text-1.25em">Lyapunov Stability</p>
  </div>
  <div v-click>
    <ph-arrow-line-down-left-bold class="text-8xl opacity-90 text-blue-gray-900"/>
    <p class="text-1.25em"> Constrained Markov<br>Decision Processes </p>
  </div>
</div>


---

# Constrained Markov Decision Processes (CMDP)
A short introduction

Idea: cost signal $c_t$ together with the reward $r_t$.

* Cost function: $c_t = C(s_t, a_t), C: \mathcal{S} \times \mathcal{A} \rightarrow \mathbb{R}$

<div v-click class="container mt-10 text-blue-gray-900">

#### Goal: find a policy $\pi(a_t | s_t)$ that solves the _constrained_ problem
$$
\begin{aligned}
  \max_{\pi} & \; \mathbb{E}_{\tau \sim p(\tau)} \left[\sum_{t = 0}^T R(s_t, a_t)\right] \\ 
  \text{s.t.} &  \;\mathbb{E}_{\tau \sim p(\tau)} \left[\sum_{t = 0}^T C(s_t, a_t)\right] \le 0
\end{aligned}
$$

</div>


---
clicks: 3
---

# Adaptation to Variable CMDPs
Via meta-reinforcement learning

<div class="flex justify-items-center">

<div class="w-4/5">

<div class="flex flex-col justify-evenly h-full">


* CMDP (informally): $\mathcal{M}_i = \left(P_i(s^\prime | s, a, ), C_i(s, a), R_i(s, a)\right)$
* “Meta-environment”: $\mathcal{M}_i \sim \mathcal{E}(\cdot)$

<v-clicks>

**During training:** interact with $\mathcal{M}_i, i = 1, \dots, M$ CMDPs.


**During testing:** interact with $\tilde{\mathcal{M}}$


<div v-click class="container text-blue-gray-900">

Goal: _adapt_ to the problem induced by $\tilde{\mathcal{M}}$ and solve
$$
\begin{aligned}
  \max_{\pi} & \; \mathbb{E}_{\tilde{\tau} \sim p(\tilde{\tau})} \left[\sum_{t = 0}^T R(s_t, a_t)\right] \\ 
  \text{s.t.} &  \;\mathbb{E}_{\tilde{\tau} \sim p(\tilde{\tau})} \left[\sum_{t = 0}^T C(s_t, a_t)\right] \le 0
\end{aligned}
$$

</div>

</v-clicks>

</div>

</div>

<div class="w-2/5">

<Arrow v-click=1 x1="650" y1="125" x2="705" y2="210" width="2" />

<Arrow v-click=2 x1="950" y1="125" x2="900" y2="200" width="2" />

<img src="/meta-rl.svg" class="w-full"/>

</div>
</div>


---
layout: quote
---

# Thesis Goal
_Devise algorithms that address the key challenges of safe adaptation with the aim of making them <br>applicable in the field of robotic spinal surgery._


---

# Related Work
Safety in reinforcement learning


<div class="flex justify-items-center">

<div class="w-3/5">

| **Paper** | **Approach** |
|:---|:---:|
| <Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1205.4810">Moldoven & Abeel (2012)</Reference>,<Reference text-size="text-0.8em" translate="" link="https://proceedings.neurips.cc/paper/2016/file/9a49a25d845a483fae4be7e341368e36-Paper.pdf">Turchetta et al., (2016)</Reference>,<Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1711.06782">Eysenbach et al., (2017)</Reference>  |   Ergodicity   |
| <Reference text-size="text-0.8em" translate="" link="https://proceedings.neurips.cc/paper/2017/hash/766ebcd59621e305170616ba3d3dac32-Abstract.html">Berkenkamp et al., (2017)</Reference>  |   Lyapunov Stability   |
| <Reference text-size="text-0.8em" translate="" link="https://www-sop.inria.fr/members/Eitan.Altman/TEMP/h.pdf">Altman, (1999)</Reference>,<Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1705.10528">Achiam et al., (2017)</Reference>,<Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1801.08757">Dalal et al., (2018)</Reference>  |   CMDP   |

</div>

<div class="w-2/5 ml-30">

<div v-click>

### <twemoji-warning /> **Limitation:**<br>all methods assume a _single_ instance of $P(s^\prime | s, a)$

</div>

<br>
<br>

<div v-click>

### <twemoji-check-mark-button /> **Strength:**<br>(relatively) large body of literature, empirically works well.

</div>

</div>


</div>


---

# Related Work
Safe adaptation via meta-learning

<div class="flex justify-items-center">

<div class="w-3/5">

| **Paper** | **Safety?** |
|:---|:---:|
| <Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1611.02779">Duan et al., (2016)</Reference>,<Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1703.03400">Finn et al., (2017)</Reference>,<Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1810.06784">Rothfuss et al. (2018)</Reference>,<Reference text-size="text-0.8em" translate="" link="URL https://arxiv.org/abs/1803.11347">Nagabandi et al. (2018)</Reference> and more...  |   <twemoji-cross-mark />   |
| <Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/2008.06622">Zhang et al., (2020)</Reference>,<Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/2112.03575">Luo et al., (2021)</Reference>   | <twemoji-check-mark-button />   |

</div>

<div class="w-2/5 ml-30">

<div v-click>

### <twemoji-warning /> **Limitation:**<br>previous work on _safe_ adaptation is scarce

</div>

<br>
<br>

<div v-click>

### <twemoji-check-mark-button /> **Strength:**<br>(relatively) large body of literature, empirically works well.

</div>

</div>


</div>


---
layout: statement
---

# Takeway: strong foundation on safety and meta-learning,<br>_but not on their intersection_.


---

# Progress to Date
On safe reinforcement learning


---
clicks: 6
---

# LAMBDA

[Constrained Policy Optimization via Bayesian World Models](https://arxiv.org/abs/2201.09802) (ICLR 2022, joint work with [Ilnura Usmanova](https://control.ee.ethz.ch/people/profile.ilnura-usmanova.html), [Sebastian Curi](https://las.inf.ethz.ch/people/sebastian-curi) and [Andreas Krause](https://las.inf.ethz.ch/krausea))


<!-- TODO (yarden): create a Vue component of a tooltip that explains the different things. -->
<div class="grid grid-cols-2 gap-x-4">
<div>

<v-clicks>

- Collect data on the real environment based on $\pi$
- Use this data to fit a statistical model of the environment
</v-clicks>

<div v-click="3">

<br>
<br>

## Planning
</div>
<ul>
  <li v-click="4">Simulate the policy with the model</li>
  <li>Solve the constrained problem with <i><b>the Augmented Lagrangian</b></i></li>
  <li>Backpropagate policy gradients through the model</li>
</ul>

</div>

<div>

<div v-click="3" class="absolute top-50">

```python {all|2|7|9}
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

# LAMBDA

A probabilistic perspective

<div class="opacity-80">

- Maintain a posterior distribution over model parameters given previously seen data $\theta \sim p(\theta | \mathcal{D})$
- Models track an underlying representation of the environment's state, given image observations (think non-linear Kalman filter)
</div>

<div class="text-center my-15"> 
<v-clicks>

#### This probabilistic modeling allows the agent to be robust for safety (through pessimism).
#### But still discover new behaviors (through optimism).
</v-clicks>
</div>


<div class="abs-br m-10">
    <img src="https://imgur.com/W5n1wuV.gif" width="600">
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
layout: image-right
image: ./leg.svg
---

# Recap

- Constrained Markov decision processes.
- Preliminary work.
- Meta-reinforcement learning with constraints (?)
- Current state of progress.

<div class="abs-bl mx-14 my-12">

## Thanks!

</div>


---
layout: cover
---

# Appendix


---
layout: quote
---

# Thesis Objectives
_Devise algorithms that address the key challenges of safe adaptation with the aim of making them <br>applicable in the field of robotic spinal surgery._

* Derive a mathematical foundation for safe adaptation by applying meta-RL to solve randomly generated CMDPs. 
* Answer how agents can summarize data generated from multiple CMDPs (in the form of trajectories) into a model that represents an informative prior for new CMDP samples of $\mathcal{E}$. Answer how agents can use this model upon deployment in M˜ to adapt their policy efficiently
and safely.
* Derive an algorithmic framework for controlling E to generate informative CMDPs, aiming to “teach” agents more efficiently and to improve their generalization in terms of safety and utility to test CMDPs.
* Experimentally apply my findings on a problem that reflects a real challenge in robotic spine surgery. The experiment should be as close as possible to the real clinical setting, within the scope of my studies and available resources.
