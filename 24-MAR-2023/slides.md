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
* Trajectory $\tau = \left\{s_0, a_0, a_1, \dots, a_{T -1}, s_T \right\}$

<div v-click class="container mt-10 text-blue-gray-900 opacity-90">

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
<IdeaCircle color="bg-violet-50"><h3 class="absolute top-50 left-10 w-140">Is the reward enough to admit<br><em>safe</em> behavior?</h3></IdeaCircle>
</div>

<div class="absolute -bottom-65 left-110">
<IdeaCircle color="bg-emerald-50"><h3 class="absolute top-2/5 left-6 w-140">

What if $P(s^\prime | s, a)$ changes over time? 

</h3></IdeaCircle>
</div>

<div class="absolute bottom-35 left-125">
<IdeaCircle color="bg-blue-gray-50"><h3 class="absolute top-80 -left-8 w-140">

What if $P(s^\prime | s, a)$ or $R(s_t, a_t)$ vary <br> between trials?

</h3></IdeaCircle>
</div>
</v-clicks>


---

# Real-World Examples
Where do these challeges emerge?

<div class="grid grid-cols-3">
<v-clicks>
<div>
  <RoundedImage image="https://source.unsplash.com/HeqXGxnsnX4/640*960" title="Agriculture & Sustainability">

  * Different weather regimes and soil compositions.
  * Over-fertilization accelerates greenhouse effects.<Reference link="https://www.nature.com/articles/ngeo325">Erisman et al., (2008)</Reference>

  
  </RoundedImage>
  </div>
  <div>
  <RoundedImage image="https://source.unsplash.com/cUmFjDhiTfc" title="Medical Applications">
  
  * Patients react differently to different treatments.
  * Clinical setting requires safety.<Reference link="https://arxiv.org/abs/2203.08057">Pace et al., (2022)</Reference>

  </RoundedImage>
  </div>
    <div>
  <RoundedImage image="https://roboticsandautomationnews.com/wp-content/uploads/2021/03/basf-autonomous-robot-anymal-0.png" title="Robotics">
  
  * Robots should not harm themselves or their environment.
  * Objectives and dynamics may vary.<Reference link="">Thrun et al., (2005)</Reference>

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

Idea: instantaneous cost signal $c_t$ together with the reward $r_t$.

* Cost function: $c_t = C(s_t, a_t), C: \mathcal{S} \times \mathcal{A} \rightarrow \mathbb{R}$

<div v-click class="container mt-10 text-blue-gray-900">

#### Goal: find a policy $\pi(a_t | s_t)$ that solves the _constrainend_ problem
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


* CMDP: $\mathcal{M}_i = \left(P_i(s^\prime | s, a, ), C_i(s, a), R_i(s, a)\right)$
* “Meta-environment”: $\mathcal{M}_i \sim \mathcal{E}(\cdot)$

<v-clicks>

During training, interact with $\mathcal{M}_i, i = 1, \dots, M$ CMDPs.


During testing, interact with $\tilde{\mathcal{M}}$


<div v-click class="container mt-2.5 text-blue-gray-900">

Goal: solve the constrained problem induced by $\tilde{\mathcal{M}}$
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

# Related Work
Safety in reinforcement learning


<div class="flex justify-items-center">

<div class="w-3/5">

| **Paper** | **Approach** |
|:---|:---:|
| <Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1205.4810">Moldoven & Abeel (2012)</Reference>,<Reference text-size="text-0.8em" translate="" link="https://proceedings.neurips.cc/paper/2016/file/9a49a25d845a483fae4be7e341368e36-Paper.pdf">Turchetta et al., (2016)</Reference>,<Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1711.06782">Eysenbach et al., (2017)</Reference>  |   Ergodicity   |
| <Reference text-size="text-0.8em" translate="" link="https://proceedings.neurips.cc/paper/2017/hash/766ebcd59621e305170616ba3d3dac32-Abstract.html">Berkenkamp et al., (2017)</Reference>  |   Lyapunov Stability   |
| <Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1705.10528">Achiam et al., (2017)</Reference>,<Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1801.08757">Dalal et al., (2018)</Reference>  |   CMDP   |

</div>

<div class="w-2/5 ml-30">

<div v-click>

### <twemoji-warning class="animate-bounce" /> Limitation:<br>all methods assume a _single_ instance of $P(s^\prime | s, a)$

</div>

<br>
<br>

<div v-click>

### <twemoji-check-mark-button class="animate-bounce" /> Strength:<br>(relatively) large body of literature, empirically works well.

</div>

</div>


</div>

---
layout: image-right
image: https://source.unsplash.com/_0fXQrtNZEo
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