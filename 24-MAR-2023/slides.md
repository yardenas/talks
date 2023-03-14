---
layout: cover
download: true
highlighter: shiki
info: |
  ## Online Safe Adaptation in Uncertain Constrained Markov Decision Processes

  Thesis Proposal

  Yarden As
title: Online Safe Adaptation in Uncertain Constrained Markov Decision Processes
fonts:
  sans: Manrope
---

# Online Safe Adaptation in Uncertain Constrained Markov Decision Processes
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
  @apply font-mono;
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

## <Reference link="http://incompleteideas.net/book/RLbook2020.pdf">Sutton & Barto (2018)</Reference>

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

<div v-click class="container mt-10 text-blue-gray-900 opacity-90">

#### Goal: find a policy $\pi(a_t | s_t)$
$$\pi \in \arg\max_{\pi} \mathbb{E} \left[\sum_{t = 0}^T R(s_t, a_t)\right]$$

</div>


---
layout: statement
---

# Is it a perfect model?


---

# Some Open Challenges


<v-clicks>
<div class="absolute -bottom-40 -left-25">
<IdeaCircle color="bg-violet-50"><h3 class="absolute top-50 left-10 w-140">Is the reward enough to admit<br><em>safety</em> restrictions?</h3></IdeaCircle>
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

# Real-world examples
