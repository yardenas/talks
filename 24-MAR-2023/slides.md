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
  
  <VarP size="text-2xl" class="relative -left-40 top-1"/> Objectives and dynamics may vary.<Reference link="">Thrun et al., (2005)</Reference>

  <Reward size="text-2xl" class="relative -left-38 top-1"/> Robots should not harm themselves or their environment.

  </RoundedImage>
  </div>
</v-clicks>
</div>

---
layout: image-right
image: /spine-surgery.png
---

# Automatic Spine Surgery
Key challenges remain


<div class="my-5 grid grid-cols-[50px,1fr] gap-y-4">
  <VarP size="text-2xl"/>
  <div><em>Orthopedic variation</em> of patients create similar, but different, planning problems.</div>
  <Reward size="text-2xl"/>
  <div>Clinical setting requires high-precision and safety.</div>
</div>


<div v-click class="mt-15">


### $\implies$ _safe_ and _adaptive_ planning algorithms.


</div>


---

# Safety in Reinforcement Learning
Three common approaches

<div class="flex container mx-auto gap-25 h-max mt-25 -ml-10">
  <div v-click class="text-center flex flex-col">
  <div>
    <ph-line-segments class="text-8xl opacity-90 text-blue-gray-900"/>
    <p class="text-1.25em">Ergodicity</p>
  </div>
    <div>
    <Reference text-size="text-0.5em" translate="" link="https://arxiv.org/abs/1205.4810">Moldoven & Abeel (2012)</Reference><Reference text-size="text-0.5em" translate="" link="https://proceedings.neurips.cc/paper/2016/file/9a49a25d845a483fae4be7e341368e36-Paper.pdf">Turchetta et al., (2016)</Reference><Reference text-size="text-0.5em" translate="" link="https://arxiv.org/abs/1711.06782">Eysenbach et al., (2017)</Reference>
    </div>
  </div>
  <div v-click class="text-center flex flex-col">
  <div>
    <ooui-map-trail class=" text-8xl opacity-90 text-blue-gray-900"/>
    <p class=" text-1.25em">Lyapunov Stability</p>
  </div>
    <Reference text-size="text-0.5em" translate="" link="https://proceedings.neurips.cc/paper/2017/hash/766ebcd59621e305170616ba3d3dac32-Abstract.html">Berkenkamp et al., (2017)</Reference>
  </div>
  <div v-click class="text-center flex flex-col">
  <div>
    <ph-arrow-line-down-left-bold class="text-8xl opacity-90 text-blue-gray-900"/>
    <p class="text-1.25em"> Constrained Markov<br>Decision Processes</p>
  </div>
    <div>
    <Reference text-size="text-0.5em" translate="" link="https://www-sop.inria.fr/members/Eitan.Altman/TEMP/h.pdf">Altman, (1999)</Reference><Reference text-size="text-0.5em" translate="" link="https://arxiv.org/abs/1705.10528">Achiam et al., (2017)</Reference><Reference text-size="text-0.5em" translate="" link="https://arxiv.org/abs/1801.08757">Dalal et al., (2018)</Reference>
    </div>
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

# Meta-Learning
A framework for data-efficient adaptation

Central concept: use data from multiple, related, tasks to learn informative priors for future tasks.

<div class="flex justify-items-center mt-5">

<div class="w-3/5">

<v-clicks>

* Meta-train data: $\mathcal{D}_k = \{x_i, y_i\}_{i = 1}^N$
* $k = 1 \dots K$ tasks, typically $N \ll K$
* $y_i = f_{\theta^k}(x_i) + \epsilon, \epsilon \sim \mathcal{N}(0, \sigma)$
* Meta-test data: $\tilde{\mathcal{D}} = \{x_j, f_{\tilde{\theta}}(x_j) + \epsilon\}_{j = 1}^M$
* Learn prior $p(\tilde{\theta})$ with $\mathcal{D}_{1:K}$. Use it to infer $p(\tilde{\theta} | \tilde{\mathcal{D}})$ more efficiently.<Reference link="http://proceedings.mlr.press/v139/rothfuss21a/rothfuss21a.pdf">Rothfuss et al. (2021)</Reference>

</v-clicks>

</div>

<div class="w-3/5">
<img v-if="$slidev.nav.clicks < 3 && $slidev.nav.clicks > 0" src="/sinusoid-train-wo.svg"/>
<img v-if="$slidev.nav.clicks == 3" src="/sinusoid-train-w.svg"/>
<img v-if="$slidev.nav.clicks == 4" src="/sinusoid-wo.svg"/>
<img v-if="$slidev.nav.clicks == 5" src="/sinusoid.svg"/>
</div>

</div>

---

# Safe adaptation via Meta-Learning
How can agents adapt efficiently and safely to new tasks?

<div class="flex justify-items-center">

<div class="w-3/5">

| **Paper** | **Safety?** |
|:---|:---:|
| <Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1611.02779">Duan et al., (2016)</Reference>,<Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1703.03400">Finn et al., (2017)</Reference>,<Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1810.06784">Rothfuss et al. (2018)</Reference>,<Reference text-size="text-0.8em" translate="" link="URL https://arxiv.org/abs/1803.11347">Nagabandi et al. (2018)</Reference> and more...  |   <twemoji-cross-mark />   |
| <Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/2008.06622">Zhang et al., (2020)</Reference>,<Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/2112.03575">Luo et al., (2021)</Reference>   | <twemoji-check-mark-button />   |

</div>
</div>


<div class="flex justify-center mt-15 text-center">

## <twemoji-warning /> Current literature on _safe_ adaptation does not address most of its challenges.

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

<hr class="w-12 bg-red-400 h-1 relative bottom-10.5 left-49.5 border-top-red-400">
<hr class="w-12 bg-red-400 h-1 relative bottom-28.75 left-49.5 border-top-red-400">

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
layout: statement
---

# Takeway: strong foundation on safety and meta-learning,<br>_but not on their intersection_.


---
layout: quote
---

# Thesis Goal
_Devise algorithms that address the key challenges of safe adaptation with the aim of making them <br>applicable in the field of robotic spinal surgery._



---
clicks: 5
---

# Progress to Date
On safe reinforcement learning

Constrained Policy Optimization via Bayesian World Models<Reference link="https://arxiv.org/abs/2201.09802" translate="translate-y-[-1.5em] translate-x-[0.7em]">As et al. (2022)</Reference>

<div class="grid grid-cols-[1fr,1fr] gap-x-10 mt-10">
<div v-click=0>

- Learn a Bayesian model of $P(s^\prime | s, a)$
- Use it for policy optimization
- Solve constrained problem via Augmented Lagrangian<Reference link="https://people.tamu.edu/~j-zhou//Constrained-Opt.pdf">Bertsekas, Dimitri P. (1996)</Reference>

</div>

<div v-click=1>

```python {all|2,3,4,5|10|12|all}
def policy_loss(policy, model, initial_state, lagrangian):
  (
    reward_optimistic_trajectory, 
    cost_pessimistic_trajectory,
  ) = model.simulate(policy, initial_state)
  # Use learned critics to **estimate** the 
  # objective and constraints.
  objective = reward_critic(reward_optimistic_trajectory)
  constraint = cost_critic(cost_pessimistic_trajectory)
  return -objective + lagrangian * constraint

policy_grads = grad(policy_loss)(policy, ...)
```
</div>
</div>


---

# Progress to Date
On safe transfer learning


Log Barriers for Safe Black-box Optimization with Application to Safe Reinforcement Learning<Reference link="https://arxiv.org/abs/2201.09802" translate="translate-y-[-1.5em] translate-x-[0.7em]">Usmanova et al. (2022)</Reference>

<div v-if="$slidev.nav.clicks < 3" v-click=1>

**Challenge:** given an initially safe policy,

</div>

<div v-if="$slidev.nav.clicks < 3" v-click=1 class="leading-0">how to transfer it to a new task while maintaining safety?</div>


<div v-if="$slidev.nav.clicks >= 3" v-click=3>

**Idea:** log-barrier functions ensure feasibility of iterates.<Reference link="https://arxiv.org/abs/1912.09466" translate="translate-y-[-1.5em] translate-x-[0.7em]">Usmanova et al. (2020)</Reference>

</div>



<div class="flex justify-center mt-15">

<RoundedImage v-if="$slidev.nav.clicks < 3" v-click=2 class="w-100" image="/easy.png" title=""></RoundedImage>
<RoundedImage v-if="$slidev.nav.clicks < 3" v-click=2 class="w-100" image="/hard.png" title=""></RoundedImage>

<img v-if="$slidev.nav.clicks == 3" v-click=3 src="/barrier.svg" class="-mt-8"/>

</div>


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
clicks: 7
---

# LAMBDA

[Constrained Policy Optimization via Bayesian World Models](https://arxiv.org/abs/2201.09802) (ICLR 2022, joint work with [Ilnura Usmanova](https://control.ee.ethz.ch/people/profile.ilnura-usmanova.html), [Sebastian Curi](https://las.inf.ethz.ch/people/sebastian-curi) and [Andreas Krause](https://las.inf.ethz.ch/krausea))



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
layout: image-right
image: /spine-surgery.png
---

# Spine Surgery & RL
What's the motivation to use RL?

Online planning and control from noisy observations problem.

<div v-click>

**Limitations**

<div class="my-5 grid grid-cols-[30px,1fr] gap-y-4">
  <healthicons-death-alt />
  <div>Invasive imaging (CT, X-Ray).</div>
  <healthicons-death-alt />
  <div>Pre-operative planning, open-loop control.</div>
  <healthicons-death-alt />
  <div>~15% surgery complication rate.<Reference link="https://pubmed.ncbi.nlm.nih.gov/20672949/" translate="translate-y-[-4.5em] translate-x-65">Nasser et al. (2010)</Reference></div>
</div>

</div>

<div v-click>

**Can RL address these limitations?**

<div class="my-5 grid grid-cols-[30px,1fr] gap-y-4">
  <healthicons-doctor />
  <div>Non-invasive but more noisy & complex observations (Ultrasound, RGBD).</div>
  <healthicons-doctor />
  <div>Closed-loop control, intra-operative planning.</div>
</div>

</div>

<!--
* pre-operative CT & intra-operative fluoroscopy (X-Ray)
* Complication rate is bad because pre-operative planning cannot cope with intra-operative comlications---basically need to re-plan.
-->

---

# Model-Based Reinforcement Learning
Using supervised-learning to accelerate 

<div class="grid grid-cols-2 gap-x-4 mt-10">
<div>

- Collect data on the real environment.
- Use this data to fit a statistical model of the environment.
- Use the model to (inexpensive) simulate trajectories for policy learning or online control.

</div>

<div class="">
  <img src="/mbrl-training-loop.svg">
</div>
</div>

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
