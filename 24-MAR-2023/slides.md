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
  * Tasks and dynamics may vary.<Reference link="">Thrun et al., (2005)</Reference>

  </RoundedImage>
  </div>
</v-clicks>
</div>

---


# Related Work
Safety in reinforcement learning


<div class="flex justify-items-center">

<div class="w-3/5">

| **Paper** | **Approach** |
|:---|:---:|
| <Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1205.4810">Moldoven & Abeel (2012)</Reference>,<Reference text-size="text-0.8em" translate="" link="https://arxiv.org/abs/1205.4810https://proceedings.neurips.cc/paper/2016/file/9a49a25d845a483fae4be7e341368e36-Paper.pdf">Turchetta et al., (2016)</Reference>,<Reference text-size="text-0.8em" translate="" link="">Eysenbach et al., (2017)</Reference>  |   Ergodicity   |
| <Reference text-size="text-0.8em" translate="" link="">Berkenkamp et al., (2017)</Reference>  |   Lyapunov Stability   |
| <Reference text-size="text-0.8em" translate="" link="">Achiam et al., (2017)</Reference>,<Reference text-size="text-0.8em" translate="" link="">Dalal et al., (2018)</Reference>  |   CMDP   |

</div>

<div class="w-2/5 ml-30">

<div v-click>

### <twemoji-warning class="animate-bounce" /> Limitation:<br>all methods assume a _single_ instance of $P(s^\prime | s, a)$

</div>

<br>
<br>

<div v-click>

### <twemoji-check-mark-button class="animate-bounce" /> Strength:<br>(relatively) large body of literature, works well empirically.$

</div>

</div>


</div>