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
    <div class="text-sm opacity-50">Sep 30 2024</div>
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

---

# Collaborators
Learning & Adaptive Systems Group @ ETH Zurich
<div class="flex justify-center">
<div class="grid grid-cols-2 gap-20 mt-10">
  <div class="flex items-center mb-5">
    <div class="w-32 h-32 overflow-hidden rounded-full mr-4">
      <img src="https://las.inf.ethz.ch/wp-content/uploads/2024/03/yardas.jpeg" alt="Yarden As" class="object-cover">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold">Yarden As <twemoji-waving-hand-medium-light-skin-tone/></div>
    </div>
  </div>
  <div class="flex items-center mb-5">
    <div class="w-32 h-32 overflow-hidden rounded-full mr-4">
      <img src="https://las.inf.ethz.ch/wp-content/uploads/2023/07/bhavya.jpg" alt="Bhavya Sukhija" class="object-cover">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold">Bhavya Sukhija</div>
    </div>
  </div>
  <div class="flex items-center mb-5">
    <div class="w-32 h-32 overflow-hidden rounded-full mr-4">
      <img src="https://las.inf.ethz.ch/wp-content/uploads/2023/08/lenart.jpeg" alt="Lenart Treven" class="object-cover">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold">Lenart Treven</div>
    </div>
  </div>
  <div class="flex items-center mb-5">
    <div class="w-32 h-32 overflow-hidden rounded-full mr-4">
      <img src="https://las.inf.ethz.ch/wp-content/uploads/2023/09/andreas-krause.jpg" alt="Andreas Krause" class="object-cover">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold">Andreas Krause</div>
    </div>
  </div>
</div>
</div>

---

# Safety Matters

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

<!-- * Want to make the case for learning safely.
* It's a group that works on autonomous driving, so might as well give an example from autonomous driving.
* Maybe an image of Yudkowski -->

---

# Safety Matters
In autonomous driving too


<div class="flex justify-center text-center mt-30">

## ~6.7 times less “injury-reported crashes” with Waymo ADS compared to humans[^1]

</div>

[^1]: “Comparison of Waymo Rider-Only Crash Data to Human Benchmarks at 7.1 Million Miles” Kusano et al. 2023

---
dragPos:
  action: 195,412,97,49
  square: 248,165,432,368
  state: 628,417,136,60
  observation: 421,105,123,60
---

# Reinforcement Learning
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
- Tell about the application (as a way to motivate research)
- Can I find some statistics that motivate why it's important?
- Pros: High precision (required in many types of surgeries), + cost, + letting surgeons to deal with tough cases.
- challenges: safety is crucial and 3d ultra-sound/x-ray measurements
- why deep reinforcement learning is important? classical methods are too specific. want to operate “end-to-end” like humans do, allows to learn sophisticated behaviors (”winning go grand champion RL”), from high-dimensional observations and safety within RL is well-studied.
-->

---

# Safe Reinforcement Learning[^1]
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
* why deep reinforcement learning is important? It is the most general framework we have to combining sequential decision-making and learning.
* what's nice about CMDPs is that they allow us to more easily specify constraints, separately from the reward. This allows agents to learn how to tradeoff between the objective and safety on their own, without us hand-tuning/reward shaping -- it is actually cleaner than penalties.
-->

---

# Safe Reinforcement Learning (?)
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

# Safe Exploration: two key ingredients

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
- But what happens if the optimal policy is not within the safe set?
- Key challenge: expansion-exploration-exploitation dilemma. If you don’t expand your safe set enough, you might not “see” enough to get the optimal solution within your safe set. 
- It's very limiting to restrict all learning to simulation or behavior data.
- need to try out new, safe policies (aka behaviors)

- How do we expand safely? forget about rewards and just focus on learning something new! Formally: $\max_{\Pi_{\text{safe}}} \mathbb{E} [\text{I}[P; \pi | \mathcal{D}]]$
- If you don’t expand your safe set enough, you might not “see” enough to get the optimal solution within your safe set. (Mark $\pi^\star$ somewhere outside of the initial safe set).
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

# The Cartpole Testbed

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

# The Cartpole Testbed

<div class="flex justify-center mt-15">
  <img src="/learn-curves-cartpole-exploration.svg" class="w-110">
</div>


---
layout: quote
---

# Outlook
Sometimes the optimal solution is beyond reach. Keep expanding your horizons.

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
