---
layout: cover
download: true
highlighter: shiki
info: |
  ## Safe Active Exploration
  Yarden As
title: Safe Active Exploration
fonts:
  sans: Lusitana
  serif: Lusitana
---

# Safe Active Exploration
Theory and Apps
<div class="my-10 grid grid-cols-[40px_1fr] w-min gap-y-4 items-center">
  <carbon-logo-x class="opacity-50"/>
  <div><a href="https://twitter.com/yarden_as" target="_blank" class="no-underline">yarden_as</a></div>
  <ri-user-3-line class="opacity-50"/>
  <div><a href="https://yas.pub" target="_blank">yas.pub</a></div>
</div>
<div class="abs-bl mx-14 my-12 flex">
  <div class="ml-3 flex flex-col text-left">
    <div class="text-sm opacity-50">Jul. 06 2024</div>
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

<img src="https://lh3.googleusercontent.com/a/AAcHTteBDvToW_9PaePyt6sAdzCep1nJD5zWhj-7633bcrs=s288-c-no" class="rounded-full w-40 abs-tr mt-7 mr-12"/>

---

# Autonomous Robotic Surgery
(a Hasler foundation project)

<div class="grid grid-cols-3 gap-10 mt-20">
  <div class="flex items-center mb-5">
    <div class="w-24 h-24 overflow-hidden rounded-full mr-4">
      <img src="https://las.inf.ethz.ch/wp-content/uploads/2023/09/andreas-krause.jpg" alt="Andreas Krause" class="object-cover">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold">Andreas Krause</div>
      <div class="text-sm">ETH Zurich</div>
      <div class="text-sm">Machine Learning</div>
    </div>
  </div>
  <div class="flex items-center mb-5">
    <div class="w-24 h-24 overflow-hidden rounded-full mr-4">
      <img src="https://ee.ethz.ch/news-and-events/d-itet-news-channel/2016/10/new-at-d-itet-prof-benjamin-f-grewe/_jcr_content/wide_content/textimage/image.imageformat.lightbox.662382194.png" alt="Benjamin F. Grewe" class="object-cover">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold">Benjamin F. Grewe</div>
      <div class="text-sm">ETH Zurich</div>
      <div class="text-sm">Neuroscience & ML</div>
    </div>
  </div>
  <div class="flex items-center mb-5">
    <div class="w-24 h-24 overflow-hidden rounded-full mr-4">
      <img src="https://rocs.balgrist.ch/fileadmin/_processed_/4/6/csm_Balgrist-Card-Fuernstahl_Philipp_b7b5dae5ca.jpg" alt="Philipp Fürnstahl" class="w-24 h-24 object-cover">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold">Philipp Fürnstahl</div>
      <div class="text-sm">University Hospital Balgrist</div>
      <div class="text-sm">Medical Robotics</div>
    </div>
  </div>
  <div class="flex items-center mb-5">
    <div class="w-24 h-24 overflow-hidden rounded-full mr-4">
      <img src="https://lh3.googleusercontent.com/a/AAcHTteBDvToW_9PaePyt6sAdzCep1nJD5zWhj-7633bcrs=s288-c-no" alt="Yarden As" class="object-cover">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold">Yarden As <twemoji-waving-hand-medium-light-skin-tone/></div>
      <div class="text-sm">ETH Zurich</div>
      <div class="text-sm">Machine Learning</div>
    </div>
  </div>
  <div class="flex items-center mb-5">
    <div class="w-24 h-24 overflow-hidden rounded-full mr-4">
      <img src="https://services.ini.uzh.ch/admin/extras/img_view.php?id=113226" alt="Yassine Taoudi-Benchekroun" class="object-cover h-24">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold text-sm">Yassine Taoudi-Benchekroun</div>
      <div class="text-sm">ETH Zurich</div>
      <div class="text-sm">Neuroscience & ML</div>
    </div>
  </div>
  <div class="flex items-center mb-5">
    <div class="w-24 h-24 overflow-hidden rounded-full mr-4">
      <img src="https://las.inf.ethz.ch/wp-content/uploads/2023/06/IMG_2874.jpg" alt="Yunke Ao" class="object-cover">
    </div>
    <div class="flex flex-col space-y-1">
      <div class="font-bold">Yunke Ao</div>
      <div class="text-sm">University Hospital Balgrist</div>
      <div class="text-sm">Medical Robotics</div>
    </div>
  </div>
</div>

---
dragPos:
  action: 195,412,97,49
  square: 248,165,432,368
  state: 628,417,136,60
  observation: 421,105,123,60
---

# Autonomous Robotic Surgery
<br>

<div v-drag="'action'">

$a \sim \pi(a | o)$

</div>
<div v-drag="'state'">

$s' \sim p(s' | s, a)$

</div>
<div v-drag="'observation'">

$o \sim p(o | s')$

</div>
<img v-drag="'square'" src="/loop.svg" class="w-80">

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
    \max_{\pi \in \Pi} \; \underbrace{\mathbb{E_{\pi}} \left[\sum_{t}^{\infty} r(s_t, a_t)\right]}_{\doteq \; J(\pi) \; \text{(objective)}} \; \text{s.t.} \;\underbrace{\mathbb{E_{\pi}} \left[\sum_{t}^{\infty} c(s_t, a_t)\right] \le 0}_{\doteq \; C(\pi) \; \text{(constraint)}}
$$
</div>


<div class="relative top-10">

[^1]: Constrained Markov Decision Processes, Altman (1991)

</div>

<!-- 
* why deep reinforcement learning is important? It is the most general framework we have to combining sequential decision-making and learning.
-->
---

# Safe Reinforcement Learning (?)
<br>

<div class="flex justify-center">
  <img src="https://pbs.twimg.com/profile_images/1483577865056702469/rWA-3_T7_400x400.jpg" alt="Yan Lecun" class="absolute top-50 left-121 right-30 transform rotate--45 h-7 rounded-full z-1000">
  <img src="https://opendatascience.com/wp-content/uploads/2018/01/cake.jpg" class="w-40">
</div>

<div v-click class="mt-10">

<div class="text-center text-2xl">

$\implies$ _first_ learn $\pi$ in $\{$simulation, human demonstrations, generative model$\}$, 

<twemoji-cherries/> _then_ adapt safely.

</div>
</div>

<!--
- Caveats: “cherry at the top of cake” (Yan Lecun’s Cake). Traning online is challenging
  - RL is notoriously sample inneficient.

-  => aka safely fine-tuning a policy from {simulation, human demonstrations, generative models,…}
- Adapting requires _safe exploration_
-->

---

# Safe Exploration: two key ingredients
<!-- Two sides: one side discusses improving policies (show drawing of arrow get's closer to optimal policy) and another side discusses uncertainty quantification as a way to quantify the safe set. -->

<div class="flex justify-center mt-15">
<div class="flex w-full max-w-3xl">
<div class="flex-1 text-center">
  <h4>Uncertainty Quantification</h4>
  <img src="/uncertainty-set.svg" class="w-80 mx-auto mt-8">
  <div class="relative bottom-90 left-35">

  $$\Pi$$

  </div>
  <div class="relative bottom-68 left-9">

  $$\Pi_{\text{Pessimistic}}$$

  </div>
  <div class="relative bottom-72 right-10">

  $$\pi_{\text{safe}}^\star$$

  </div>
  <div class="relative bottom-99 right-16">

  $$\pi^\star$$

  </div>
</div>
<div class="flex-1 text-center">
  <h4>Policy Improvement</h4>
  <img src="/policy-improvement.svg" class="w-40 mx-auto mt-8">
  <div class="relative bottom-48 left-1">

  $$\pi_{\text{safe}}^\star$$

  </div>
</div>
</div>
</div>



<!-- - Two key ingredients: uncertainty quantification + improving policies within what is known to be the safe set.
- Key challenge: expansion-exploration-exploitation dilemma. If you don’t expand your safe set enough, you might not “see” enough to get the optimal solution within your safe set. (Mark $\pi^\star$ somewhere outside of the initial safe set).
- How do we expand safely? forget about rewards and just focus on learning something new! Formally: $\max_{\Pi_{\text{safe}}} \mathbb{E} [\text{I}[P; \pi | \mathcal{D}]]$ -->


---

<br>
<div class="container mx-auto mt--10">
  <div class="flex items-center justify-between">
  <div class="w-1/2 p-4">
      <img src="./expansion.svg" alt="Full SVG" class="w-full h-auto">
  </div>
  <div class="w-1/12 flex justify-center">
  </div>
  <div class="w-1/2 p-4 h-40 mt--50">
  <div class="w-[300px] h-[300px] overflow-hidden">
      <img src="./expansion.svg" alt="Cropped SVG" class="w-[600px] h-300px object-none object-[20%_20%]">
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


<div v-click>

<div class="text-center text-2xl mt-10">

Need to expand the pessimistic safe set of policies!

</div>
</div>