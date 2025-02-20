---
layout: cover
download: true
highlighter: shiki
info: |
  ## Towards Safe Sim-to-Real that Actually Works
  Yarden As
title: Towards Safe Sim-to-Real that Actually Works
fonts:
  sans: Lusitana
  serif: Lusitana
---

<h1>Towards Safe Sim-to-Real <br>that Works<br></h1>
<div class="my-10 grid grid-cols-[40px_1fr] w-min gap-y-4 items-center">
  <carbon-logo-x class="opacity-50"/>
  <div><a href="https://twitter.com/yarden_as" target="_blank" class="no-underline">yarden_as</a></div>
  <ri-user-3-line class="opacity-50"/>
  <div><a href="https://yas.pub" target="_blank">yas.pub</a></div>
</div>
<div class="abs-bl mx-14 my-12 flex">
  <div class="ml-3 flex foex-col text-left">
    <div class="text-sm opacity-50">Feb 21 2025</div>
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

PhD student @ <a href="https://ai.ethz.ch/" target="_blank">ETH AI Center</a> & <a href="https://las.inf.ethz.ch/" target="_blank">Learning & Adaptive Systems</a>.<br>
Working on safe reinforcement learning.


<div class="mt-20">
<img src="/life.svg">
</div>

<img src="https://las.inf.ethz.ch/wp-content/uploads/2024/03/yardas.jpeg" class="rounded-full w-40 abs-tr mt-7 mr-12"/>

<!--
* Was born in Haifa, Israel, did there my Bechalor's in Mechanical engineering, focusing on control theory and robotics. I then became a robotics engineer in a Tel-Avivian startup company, developing planning and localization and mapping algorithms. Moved to Switzerland for my masters and then decided to continue for a PhD in RL x Robotics.
* As you can see, a recurring thing is being involved in robotics for quite some time.
-->

---

# Collaborators
Learning & Adaptive Systems Group @ ETH Zurich
<div class="flex justify-center">
<div class="grid grid-cols-3 gap-5 mt-10">
  <div class="flex items-center mb-5">
    <div class="w-30 h-30 overflow-hidden rounded-full mr-4">
      <img src="https://las.inf.ethz.ch/wp-content/uploads/2024/03/yardas.jpeg" alt="Yarden As" class="object-cover">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold">Yarden As <twemoji-waving-hand-medium-light-skin-tone/></div>
      <div class="text-sm text-gray-500">ETH Zurich</div>
    </div>
  </div>
  <div class="flex items-center mb-5">
    <div class="w-30 h-30 overflow-hidden rounded-full mr-4">
      <img src="https://las.inf.ethz.ch/wp-content/uploads/2023/07/bhavya.jpg" alt="Bhavya Sukhija" class="object-cover">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold">Bhavya Sukhija</div>
      <div class="text-sm text-gray-500">ETH Zurich</div>
    </div>
  </div>
  <div class="flex items-center mb-5">
    <div class="w-30 h-30 overflow-hidden rounded-full mr-4">
      <img src="https://las.inf.ethz.ch/wp-content/uploads/2023/08/lenart.jpeg" alt="Lenart Treven" class="object-cover">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold">Lenart Treven</div>
      <div class="text-sm text-gray-500">ETH Zurich</div>
    </div>
  </div>
  <div class="flex items-center mb-5">
    <div class="w-30 h-30 overflow-hidden rounded-full mr-4">
      <img src="https://sferrazza.cc/img/headshot.jpg" alt="Carmelo Sferrazza" class="object-cover">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold">Carmelo Sferrazza</div>
      <div class="text-sm text-gray-500">UC Berkeley</div>
    </div>
  </div>
  <div class="flex items-center mb-5">
    <div class="w-30 h-30 overflow-hidden rounded-full mr-4">
      <img src="https://las.inf.ethz.ch/wp-content/uploads/2023/09/andreas-krause.jpg" alt="Andreas Krause" class="object-cover">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold">Andreas Krause</div>
      <div class="text-sm text-gray-500">ETH Zurich</div>
    </div>
  </div>
</div>
</div>

<!--
Before diving into the details of the work, I want to acknowledge some of my collaborators in this project.
-->

---

# Safety matters

<div class="container mx-auto p-8 bg-white">
  <div class="grid grid-cols-2 grid-rows-2 gap-10 h-80">
  <!-- Upper Left Image (Nikita) -->
  <div class="p-4 col-start-1 row-start-1">
    <img src="/nikita.gif" alt="Nikita" class="w-full h-auto rounded-lg shadow-md">
  </div>
  <!-- Lower Right Image (Anymal) -->
  <div v-click class="p-4 col-start-2 row-start-2">
    <img src="/anymal.gif" alt="Anymal" class="w-full h-auto rounded-lg shadow-md">
  </div>
  </div>
</div>

<div class="abs-tr w-27">
  <img src="/robot-abuse.png" alt="Anymal">
</div>

<!--
* I want to make the case for robotics.
* Here on the top left, you can see Nikita. Nikita is a robotics engineer and also practices parkour on he's free time in Zurich.
* **click**
* Now watch anymal, a robot running reinforcement learning policies onboard. Well you can see that it basically fails and hits the obstacles.
* Now this could due to multiple reasons: it could be due to perception, but could also be due to wrong decision making.
* The point is -- here's a cute problem -- no one was hurt. But what happens in other domains?
-->

---

# Safety matters
In autonomous driving too


<div class="flex justify-center text-center mt-30">

## ~6.7 times less “injury-reported crashes” with Waymo ADS compared to humans[^1]

</div>

[^1]: “Comparison of Waymo Rider-Only Crash Data to Human Benchmarks at 7.1 Million Miles” Kusano et al. 2023

<!--
To answer this question, I know that you guys in the group care a lot about autonomous driving. So I added this fact from a recent paper by Waymo. 

Roads are dangerous -- can we use RL to improve that?
Why RL? because we don't have a perfect model, planning is not enough.
-->

---
dragPos:
  action: 195,412,97,49
  square: 248,165,432,368
  state: 628,417,136,60
  observation: 421,105,123,60
---

# Reinforcement learning
<div class="relative bottom-10">

<div class="absolute ml-65 mt-35 text-right">

<br>

$s_{t}$

</div>

<div class="absolute ml-147 mt-35 text-left">

<br>

$a_{t}$

</div>

<div class="absolute ml-73 mt-35 text-right">

<br>

$s_{t + 1}, r_{t}$

</div>
<img src="/rl-loop.svg" class="absolute">

<div>
<img src="/robotic-arm.png" class="w-15 relative top-45 left-115">
</div>
<div>
<img src="/nn.png" class="w-15 relative top-3 left-85">
</div>

</div>

<!--
So what is reinforcement learning? I guess you guys know that very well.
But essentially, we have an environment, here depicted by this robot and an agent that interacts with it.

The goal of RL is to learn policies that maximize some notion of reward.
RL is different than planning, in that *learning happens in the loop* so agents have to trade off between what to "learn" next, and just plainly maximizing the rewards. This is in contrast to planning, where we only care about maximizing the reward, because there's no learning -- the model is given.
-->

---

# Safe reinforcement learning[^1]
<br>
<div class="mt-25">

$$
    \max_{\pi \in \Pi} \; \underbrace{\mathbb{E_{\pi}} \left[\sum_{t}^{\infty} \gamma ^ t r(s_t, a_t)\right]}_{\doteq \; J(\pi) \; \text{(objective)}} \; \text{s.t.} \;\underbrace{\mathbb{E_{\pi}} \left[\sum_{t}^{\infty} \gamma ^ t c(s_t, a_t)\right] \le 0}_{\doteq \; C(\pi) \; \text{(constraint)}}
$$
</div>


<div class="relative top-10">

[^1]: Constrained Markov Decision Processes, Altman (1991)

</div>

<!--
* what's nice about CMDPs is that they allow us to more easily specify constraints, separately from the reward. This allows agents to learn how to tradeoff between the objective and safety on their own, without us hand-tuning/reward shaping -- it is actually cleaner than penalties.
-->

---

# Safe reinforcement learning (?)
<br>

<div class="flex justify-center">
  <img src="https://pbs.twimg.com/profile_images/1483577865056702469/rWA-3_T7_400x400.jpg" alt="Yan Lecun" class="absolute top-50 left-121 right-30 transform rotate--45 h-7 rounded-full z-1000">
  <img src="https://opendatascience.com/wp-content/uploads/2018/01/cake.jpg" class="w-40">
</div>

<div class="mt-10">

<div class="text-center text-2xl">

$\implies$ _first_ learn $\pi$ in $\{$simulation, human demonstrations, generative model$\}$, 

<twemoji-cherries/> _then_ adapt safely.

</div>
</div>

<!--
- It's very limiting to restrict all learning to simulation or behavior data.
- Caveats: “cherry at the top of cake” (Yan Lecun’s Cake). Training online is challenging
  - RL is notoriously sample inneficient it can take hours/days to train a single policy!

-  => aka safely fine-tuning a policy from {simulation, human demonstrations, generative models,…}
- Adapting requires _safe exploration_
-->

---

# Safe exploration

<div class="flex justify-center mt-20">
  <img src="/dora.png" class="w-100">  
</div>

<!--
Adapting safely online requires us to explore safely.
That is:
figuring out what's safe and what's not  *and* searching for policies within what we are sure that is safe.
Why this picture? Intuitively, a key component in safe exploration is being able to stand somewhere and determine which parts in your _local neighborhood_ are safe/unsafe and rewarding.
-->

---

# Safe exploration: two key ingredients

<div class="flex justify-center mt-8">
<div class="flex w-full max-w-3xl">
<div class="flex-1 text-center">
  <h4>Uncertainty Quantification</h4>
  <img src="/uncertainty-set.svg" class="w-80 mx-auto mt-8">
  <div class="relative bottom-90 left-35">

  $$\Pi$$

  </div>
  <div class="relative bottom-80">

  $$\Pi_{\text{Safe}}$$

  </div>
  <div class="relative bottom-78.5 left-9">

  $$\Pi_{\text{Pessimistic}}$$

  </div>
  <div class="relative bottom-82 right-10">

  $$\pi_{\text{safe}}^\star$$

  </div>
  <div class="relative bottom-109 right-16">

  $$\pi^\star$$

  </div>
</div>
<div class="flex-1 text-center mt--4">
  <h4>
  
  Policy Improvement[^1]
  
  </h4>
  <img src="/policy-improvement.svg" class="w-40 mx-auto mt-8">
  <div class="relative bottom-48 left-1">

  $$\pi_{\text{safe}}^\star$$

  </div>
</div>
</div>
</div>

[^1]: Safe Exploration Using Bayesian World Models and Log-Barrier Optimization, As et al. (2024)


<!--
- Start by explaining the illustrations. Use the island example.
- Two key ingredients: uncertainty quantification + improving policies within what is known to be the safe set.
- Uncertainty quantification: we don't know how the environment behaves => must learn it => must "know what we don't know" aka (epistemic) uncertainty quantification

-->


---

<br>
<div class="container mx-auto mt--10">
  <div class="flex items-center justify-between">
  <div class="w-1/2 p-4">
      <img src="/expansion.svg" alt="Expansion" class="w-full h-auto">
  </div>
  <div class="w-1/12 flex justify-center">
  </div>
  <div class="w-1/2 p-4 h-40 mt--50">
  <div class="w-[300px] h-[300px] overflow-hidden">
      <img src="/expansion.svg" alt="Expansion Zoom-in" class="w-[600px] h-300px object-none object-[20%_20%]">
  </div>
  <div class="relative bottom-55 right-19">

  $$\pi^\star$$

  </div>
  <div class="relative bottom-45 right-7">

  $$\pi_{\text{safe}}^\star$$

  </div>
  <div class="relative bottom-85 left-55 text-6xl">
  ?
  </div>
  </div>
  </div>
</div>



<div class="text-center text-2xl mt-10">

Need to expand the pessimistic safe set of policies!

</div>

<!--
So how do we find optimal policies?

This of the autonomous driving example. Say that I give you initially only one policy of "doing nothing". Clearly this is safe, but will it be able to actually drive from Lower east side to Brooklyn? So we need to gradually add more and more policies/behaviors to what we know that is safe.
-->

---

# Expansion-exploration-exploitation[^1]

<div class="flex justify-center">
<div class="text-center mt-15">
  <div  class="w-[300px] h-[300px] overflow-hidden">
      <v-switch>
      <template #0-1><img  src="/expansion.svg" alt="Expansion Zoom-in" class="w-[600px] h-300px object-none object-[20%_20%]"></template>
      <template #1-2><img  src="/expansion-1.svg" alt="Expansion Zoom-in" class="w-[600px] h-300px object-none object-[20%_20%]"></template>
      <template #2-3><img  src="/expansion-2.svg" alt="Expansion Zoom-in" class="w-[600px] h-300px object-none object-[20%_20%]"></template>
      <template #3-4><img  src="/expansion-3.svg" alt="Expansion Zoom-in" class="w-[600px] h-300px object-none object-[20%_20%]"></template>
      <template #4-5><img  src="/expansion-4.svg" alt="Expansion Zoom-in" class="w-[600px] h-300px object-none object-[20%_20%]"></template>
      </v-switch>
  </div>
  <div class="relative bottom-52 right-10.5">

  $$\pi^\star$$

  </div>
</div>
</div>
<div v-if="$slidev.nav.clicks > 0" class="flex items-center absolute top-35 left-25">
  <img  src="/traj.svg" class="w-3">
  <p class="text-xl ml-4">Trajectory</p>
</div>

[^1]: Transductive Active Learning: Theory and Applications, Hübotter et al. (2024)
<!-- 
- Key idea: use regularity and problem structure to learn about what happens outside the pessimistic safe set, by trying things only within the safe set.

- but how do we choose which policies to try?
 -->
 

---

# Expansion-exploration-exploitation: how to expand?

<div class="flex items-center justify-center h-80">
<div class="text-3xl">

$$
    \max_{\pi \in \Pi_{\text{Pessimistic}}} \; \mathbb{E} [\text{I}[\hphantom{ PP}; \hphantom{\pi} | \mathcal{D}]]
$$
</div>
<div class="relative bottom-2 right-37">
  <img src="/robotic-arm.png" class="w-12">
</div>
<div class="relative bottom-2 right-33">
  <img src="/traj.svg" class="w-4">
</div>
</div>

<div class="relative bottom-53 left-146">

[^1]

</div>

<div class="text-center text-2xl relative bottom-25">

_Given all the previously-seen data, which trajectories maximize the information about the environment?_

</div>

[^1]: Optimistic Active Exploration of Dynamical Systems, Sukhija et al. (2024)

<!--
- Key challenge: expansion-exploration-exploitation dilemma. 
- How do we expand safely? forget about rewards and just focus on learning something new! Formally: $\max_{\Pi_{\text{safe}}} \mathbb{E} [\text{I}[P; \pi | \mathcal{D}]]$
-->

---

# Expansion-exploration-exploitation dilemma

<div class="flex justify-center mt-8">
<div class="flex w-full max-w-3xl">
<div class="flex-1 text-center">
  <h4>Expansion</h4>
  <img src="/expansion-dilemma.svg" class="w-80 mx-auto mt-2">
</div>
<div class="flex-1 text-center text-6xl mt-30">
?
</div>
<div class="flex-1 text-center">
  <h4>Exploration-Exploitation</h4>
  <img src="/exploration-exploitation.svg" class="w-40 mx-auto mt-2">
</div>
</div>
</div>


<div class="text-center text-2xl mt-5">
  First expand sufficiently the safe set, then commit to it to find an optimal (and safe) policy.

</div>


<!-- 
- So I convinced you know that under some regularity assumptions, and assuming that we can choose any policy within \Pi, we can expand the safe set as much as we want.
- But how much should we expand?
- Turns out, if we first focus only on expanding, and only then solve the CMDP, we can find an optimal policy.
- This can be even proven formally, if the dynamics, cost and reward are in the RKHS.
 -->


---

# Results

<div class="flex justify-center mt-30 rounded-lg bg-gray-100 p-3">
  <div>
  
  **Theorem (informal):** <br> under regularity assumptions on $p(s'|s,a)$ we have with high probability **(i)** safety during learning and **(ii)** $\epsilon$-optimal performance after $N(\epsilon)$ trajectory samples.
  </div>
</div>

<!-- 
- Explain about the robots and the box
- Explain the plots
 -->
---

# The Cartpole testbed

<div class="p-4 flex justify-center mt-25 ml-60 relative">
  <!-- Main cartpole-combined image -->
  <img src="/cartpole-combined.png" alt="cartpole task" class="w-150 h-auto rounded-lg shadow-md max-w-full">
</div>
<!-- Unsafe gif with annotation -->
<div class="absolute mt--24 ml-30 flex items-center">
  <img src="/unsafe-cartpole.gif" alt="unsafe" class="w-26 h-auto rounded-lg shadow-md">
  <span class="ml-2 text-black absolute right-30">Unsafe</span>
</div>
<!-- Safe gif with annotation -->
<div class="absolute mt--48 ml-30 flex items-center">
  <img src="/safe-cartpole.gif" alt="safe" class="w-26 h-auto rounded-lg shadow-md">
  <span class="ml-2 text-black absolute right-30">Safe</span>
</div>
---

# The Cartpole testbed
Closer to theory (GPs)

<div class="flex justify-center mt-10">
  <img src="/pendulum-exploration.svg" class="w-170">
</div>

--- 

# The Cartpole testbed
More practical (vision control)

<div class="flex justify-center mt-10">
  <img src="/learn-curves-cartpole-exploration.svg" class="w-100">
</div>

<!--
Optimistic does not do any expansion.
-->


---

# Harder problems
Navigation from first-person view with sparse rewards

<div class="flex items-center items-start gap-4 p-4 mt-8 ml-40">
  <div>
    <img src="/point-push.gif" class="w-100 rounded-lg shadow-md max-w-full">
  </div>
  <div class="w-55 px-3 py-1 border border-gray-300 rounded-lg text-sm mt--33">
    <div class="flex items-center my-2">
      <div class="w-5 h-5 rounded-full bg-[#ff3030] mr-4"></div>
      <span>Robot</span>
    </div>
    <div class="flex items-center my-2">
      <div class="w-5 h-5 rounded-full bg-[#32CD32] mr-4"></div>
      <span>Goal Position</span>
    </div>
    <div class="flex items-center my-2">
      <div class="w-5 h-5 bg-[#ffd700] mr-4"></div>
      <span>Box (to be pushed to goal)</span>
    </div>
    <div class="flex items-center my-2">
      <div class="w-5 h-5 bg-[#20B2AA] mr-4"></div>
      <span>Obstacles</span>
    </div>
    <div class="flex items-center my-2">
      <div class="w-5 h-5 rounded-full bg-[#4169E1] mr-4"></div>
      <span>Obstacles</span>
    </div>
  </div>
</div>

--- 

# Harder problems
Navigation from first-person view with sparse rewards

<div class="flex justify-center mt-5">
  <img src="/learning-curves-sparse.svg" class="w-170">
</div>
---

# Harder problems
Humanoid

<div class="flex justify-center mt-10">
<div class="flex w-full max-w-3xl gap-10">
<div class="text-center">
  <img src="/humanoid-optimized.gif" class="rounded-lg shadow-md max-w-full">
</div>
<div class="text-center">
  <img src="/humanoid.svg" class="w-110 mx-auto mt--4">
</div>
</div>
</div>

---
layout: quote
---

# Outlook
Keep expanding your horizons

<!-- 
- We all operate under constraints
- Sometimes the best behaviors is outside what is considered safe, the only way to find out is to continue learning, this will help expanding what you know is safe.
- This form of learning should be independent of trying to maximize the original objective.
-->


---
layout: center
---

# Thank You

Let's talk.


Yarden As

<div class="my-10 grid grid-cols-[40px_1fr] w-min gap-y-4 items-center">
  <carbon-logo-x class="opacity-50"/>
  <div><a href="https://twitter.com/yarden_as" target="_blank" class="no-underline">yarden_as</a></div>
  <ri-user-3-line class="opacity-50"/>
  <div><a href="https://yas.pub" target="_blank">yas.pub</a></div>
</div>

---
layout: cover
---

# Appendix

---

# Theoretical assumptions

<div class="flex flex-col gap-1 justify-center mt-5">

<MathStatementBlock type="Assumption" number="4.1" title="Lipschitz continuity">

The dynamics model $\bm{f}^*$ is $L_{\bm{f}}$-Lipschitz, the cost $c$ is $L_c$-Lipschitz, and all $\bm{\pi} \in \Pi$ are continuous. 

</MathStatementBlock>

<MathStatementBlock type="Assumption" number="4.2" title="Process noise distribution">

The process noise is i.i.d. Gaussian with variance $\sigma^2$, i.e., $\bm{w}_t \overset{\text{i.i.d}}{\sim} \mathcal{N}(0, \sigma^2\mathbb{I})$.

</MathStatementBlock> 

<MathStatementBlock type="Assumption" number="4.3" title="Initial safe seed">

We have access to an initial nonempty safe set $\mathcal{S}_0$ of policies, i.e., $\forall \bm{\pi} \in \mathcal{S}_0: J_c(\bm{\pi}) \leq d$ and $\mathcal{S}_0 \neq \emptyset$. 

</MathStatementBlock> 

</div>


---

# Theoretical assumptions (cont.)

<div class="flex flex-col gap--10 justify-center mt--5">

<MathStatementBlock type="Definition" number="4.4" title="All-time well-calibrated statistical model">

Let $\mathcal{Z} := \mathcal{S} \times \mathcal{A}$.
An all-time well-calibrated statistical model of the function $\bm{f}^*$ is a sequence $\{\mathcal{Q}_{n}(\delta)\}_{n \ge 0}$, where
$$
    \mathcal{Q}_n(\delta) := \left\{\bm{f}: \mathcal{Z} \to \mathbb{R}^{d_s} \mid  \forall \bm{z} \in \mathcal{Z}, \forall j \in \{1, \ldots, d_s\} : \lvert\mu_{n, j}(\bm{z}) - f_j(\bm{z})\rvert \leq \beta_n(\delta) \sigma_{n, j}(\bm{z})\right\},
$$
if, with probability at least $1-\delta$, we have $\bm{f}^* \in \bigcap_{n \ge 0}\mathcal{Q}_n(\delta)$.
Here, $f_{j}$, $\mu_{n, j}$ and $\sigma_{n, j}$ denote the $j$-th element in the vector-valued functions $\bm{f}$, $\bm{\mu}_n$ and $\bm{\sigma}_n$ respectively, and $\beta_n(\delta) \in \mathbb{R}_{\geq 0}$ is sequence of scalar functions that depends on the confidence level $\delta \in (0, 1]$ and is monotonically increasing in $n$. 

</MathStatementBlock>

<MathStatementBlock type="Assumption" number="4.5">

We assume that the functions $f^*_j$, $j=\{1, \dots, d_s\}$ lie in a RKHS with kernel $k$ and have a bounded norm $B$, that is $\bm{f}^* \in \mathcal{H}^{d_s}_{k, B}$, with $\mathcal{H}^{d_s}_{k, B} = \{\bm{f} \mid \lVert f_j \rVert_k \leq B, j=\{1, \dots, d_s\}\}$. Moreover, we assume that $k(\bm{z}, \bm{z}) \leq \sigma_{\max}$ for all $\bm{z} \in \mathcal{Z}$.

</MathStatementBlock>
</div>

--- 

# Pessimistic safe set

<MathStatementBlock type="Definition" number="4.6">

Let $\mathcal{M}_n := \mathcal{M}_{n-1} \cap \mathcal{Q}_{n}, \forall n \geq 1$  denote the set of plausible models, and  $P_{n}(\bm{\pi}) = \max_{\bm{f} \in \mathcal{M}_n} J_c(\bm{\pi}, \bm{f})$ our pessimistic estimate of the expected costs w.r.t.
$\mathcal{M}_n$. Then, we define the safe set $\mathcal{S}_n$ as
$$
\mathcal{S}_n := \mathcal{S}_{n-1} \cup \left\{\bm{\pi} \in \Pi \setminus \mathcal{S}_{n-1};  
\exists \bm{\pi}' \in \mathcal{S}_{n-1} \ \text{s.t.} \ P_n(\bm{\pi}') + D(\bm{\pi}, \bm{\pi}') \leq d\right\},
$$
where
$$
\begin{aligned}
&D(\bm{\pi}, \bm{\pi}') = \\
& \mathbb{E}_{\bm{\tau}^{\bm{\pi}'}} 
\left[
  \sum^{T-1}_{t=0}
  \min\left\{L_c\lVert\bm{\pi}'(\bm{s}_t) - \bm{\pi}(\bm{s}_t)\rVert, 2C_{\max} \right\}
 + TC_{\max} \min\left\{\frac{L_f\lVert\bm{\pi}'(\bm{s}_t) - \bm{\pi}(\bm{s}_t)\rVert}{\sigma}, 1\right\}
\right]
\end{aligned}
$$

</MathStatementBlock>

---

# Expansion

<div class="flex flex-col items-center justify-center gap-5">
<div>

$$
\begin{aligned}
   \bm{\pi}_n,  \bm{f}_n &= \argmax_{\bm{\pi} \in \mathcal{S}_n, \bm{f} \in \mathcal{M}_n} \underbrace{\mathbb{E}_{\bm{\tau}^{\bm{\pi}, \bm{f}}}\left[\sum_{t=0}^{T-1} \lVert\bm{\sigma}_{n-1}(\hat{\bm{s}}_t, \bm{\pi}(\hat{\bm{s}}_t))\rVert\right]}_{:= J_{r_n}(\bm{\pi}, \bm{f})}     
\end{aligned}
$$
</div>

<div>

  <img src="/expansion-stages.svg" class="w-180">
</div>
</div>

---
layout: center
---

<MathStatementBlock type="Theorem" number="4.8" title="Expansion">

Let assumptions 4.1-4.3 and 4.5 hold. Then, we have with probability at least $1-\delta$ that $J_c(\bm{\pi}_n, \bm{f}^*) \leq d$ $\forall n \geq 0$, i.e., ActSafe is safe during all episodes. 
Moreover, consider any $\epsilon > 0$ and define $\mathcal{R}^{\epsilon}_H(\bm{S}_0)$ as the reachable safe set after $H$ expansions 

$$
\begin{aligned}
  \mathcal{R}^{\epsilon}_H(\mathcal{S}_0) &:= \mathcal{R}^{\epsilon}_{H-1}(\mathcal{S}_0) \cup \left\{\bm{\pi}\in \Pi\setminus \mathcal{R}^{\epsilon}_{H-1}(\bm{S}_0);  
  \exists \mathcal{\pi}' \in \bm{R}^{\epsilon}_{H-1}(\bm{S}_0) \ \text{s.t.} \ J_c(\bm{\pi}') + D(\bm{\pi}, \bm{\pi}') \leq d - \epsilon\right\} \\
  \mathcal{R}^{\epsilon}_0(\mathcal{S}_0) &:= \mathcal{S}_0.
\end{aligned}
$$
Let $n^*$ be the smallest integer such that
$$
  \frac{n^*}{\gamma_{n^*}(k) \beta^4_{n^*}(\delta)} \geq \frac{(H + 1) T^{6} C^4\frac{d_s \sigma^2_0}{\log(1 + \sigma^{-2}\sigma^2_0)}}{\epsilon^2},
$$

where $C = (1 + \sqrt{d_s}) \max\{C_{\max}, R_{\max}, \sigma_0\}$, $\gamma_n(k)$  the maximum information gain, and $\tilde{\bm{\pi}}_n$ the solution to $\underset{\bm{\pi} \in \mathcal{S}_n}{\arg\max} \min_{\bm{f} \in \mathcal{M}_n} J_r(\bm{\pi}, \bm{f})$.
Then we have $\forall n \geq n^{*}$ with probability at least $1-\delta$
$$
    \max_{\bm{\pi} \in \mathbb{R}^{\epsilon}_H(\mathcal{S}_0)} J_r(\bm{\pi}) - J_r(\tilde{\bm{\pi}}_n) \leq \epsilon.
$$
</MathStatementBlock>

---

# Pessimistic State Propagation


<div class="flex flex-col items-center justify-center mt-10">
<div>

$$
  \max_{\bm{\pi} \in \Pi} \max_{\bm{f} \in \mathcal{Q}_n} J_n(\bm{\pi}, \bm{f}) \ \text{s.t.}\  \max_{\bm{f}' \in \mathcal{Q}_n} J_c(\bm{\pi}, \bm{f}') \leq d.
$$

</div>

<div class="mt--20">
  <StatePropagation/>
</div>

<div class="mt--20">

$$
    \max_{\bm{f}' \in \mathcal{Q}_n} J_c(\bm{\pi}, \bm{f}') \lessapprox J_{c -\lambda \bm{\sigma}}(\bm{\pi}_n) = \mathrm{E}_{\bm{\pi}_n}\left[\sum^{H}_{t=0}\gamma^t\left(c(\bm{s}_t, \bm{a}_t) + \lambda \textcolor{#059669}{\underbrace{\lVert\bm{\sigma}{_n}(\bm{s}_t, \bm{a}_t)\rVert}_{\text{disagreement}}}\right)\right]
$$
</div>

</div>
<!-- \textcolor{#059669}{disagreement} -->