---
title: Yarden <> Nicolas
fonts:
  sans: Lusitana
  serif: Lusitana
---

# Yarden &lt;&gt; Nicolas
<div class="abs-bl mx-14 my-12 flex">
  <div class="ml-3 flex flex-col text-left">
    <div class="text-sm opacity-50">May 08, 2026</div>
  </div>
</div>


---

# $\pi$-Expansion
Three pillars of model-based RL

<div class="relative mx-auto mt-4 aspect-[1040/430] w-full max-w-[60.5rem]">
  <img class="absolute inset-0 block h-full w-full object-contain" src="/deck/model_based_rl_pillars.svg" alt="Three classical pillars labelled Lookahead policies, Value-expansion, and Dyna" />
  <div class="absolute left-[24.5%] top-[63.2%] w-[21%] -translate-x-1/2 -translate-y-1/2 text-center text-[1.4rem] font-semibold leading-none text-black">Lookahead policies</div>
  <div class="absolute left-1/2 top-[63.2%] w-[21%] -translate-x-1/2 -translate-y-1/2 text-center text-[1.4rem] font-semibold leading-none text-black">Value-expansion</div>
  <div class="absolute left-[75.5%] top-[63.2%] w-[21%] -translate-x-1/2 -translate-y-1/2 text-center text-[1.45rem] font-semibold leading-none text-black">Dyna</div>
  <v-switch at="0" class="absolute inset-0">
    <template #1>
      <svg class="absolute inset-0 h-full w-full" viewBox="0 0 1040 430" fill="none" aria-hidden="true">
        <defs>
          <marker
            id="pillar-arrowhead"
            viewBox="0 0 10 10"
            markerWidth="8"
            markerHeight="8"
            refX="8.4"
            refY="5"
            orient="auto"
          >
            <path d="M1.5 1.5L8.5 5L1.5 8.5" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </marker>
        </defs>
        <path
          d="M255 226C345 150 615 145 760 226"
          stroke="black"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
          marker-end="url(#pillar-arrowhead)"
        />
        <path
          d="M520 226C590 176 685 176 760 226"
          stroke="black"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
          marker-end="url(#pillar-arrowhead)"
        />
      </svg>
      <div class="absolute left-[37%] top-[32%] -translate-x-1/2 text-[1.25rem] font-semibold leading-none text-black">
        <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4831em;"></span><span class="mrel">≈</span></span></span></span> AlphaZero
      </div>
    </template>
  </v-switch>
</div>


---

# $\pi$-Expansion
Initial results


<div class="mt-0 grid grid-cols-2 gap-8 items-center">

<div class="h-[20rem] overflow-hidden rounded">
  <img
    class="w-full h-[24rem] object-contain -translate-y-[5rem]"
    src="/deck/rank_02_cand_01_traj_000_start_5492_pi_expansion.gif"
    alt="Pi-expansion trajectory rollout"
  />
</div>

<div>
  <img
    class="w-full h-[24rem] object-contain rounded"
    src="/deck/h1_mpo_vs_pi_expansion.svg"
    alt="Comparison plot of MPO versus pi-expansion"
  />
</div>

</div>
<!--  
Planner works on MJX, "real" runs on MuJoCo CPU
-->
---

# $\pi$-Expansion
Next steps

<div class="mt-10 grid grid-cols-[minmax(0,1fr)_18rem] items-start gap-10">

<ul class="list-disc space-y-2 pl-8 pt-8 text-[1.45rem] leading-tight">
  <li>
    <span class="font-semibold">Harder tasks</span>
  </li>
  <li>
    <span class="font-semibold">New problem setting: co-train from offline data and a simulator</span>
  </li>
  <li>
    <span class="font-semibold">Make it work on flow matching models</span>
  </li>
</ul>
<div
  class="w-[18rem] justify-self-end overflow-hidden rounded-[0.35rem] bg-transparent"
>
  <img
    class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-cover shadow-none"
    src="/deck/ogbench_puzzle_task4_oracle.gif"
    alt="Oracle rollout for OGBench puzzle task 4"
  />
</div>

</div>

<!-- 
I have an implementation of MPO that works with flow matching models, I believe co-training could be an interesting angle.
 -->
---

# Real-world reinforcement learning

<div class="mt-[2.3rem] h-[22rem]">
  <img
    class="mx-auto block h-full w-[47%] rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
    src="/deck/image11.png"
    alt="Robot setup with Realsense camera and cube pickup annotation"
  />
</div>

---

# Sim-to-real

<div class="mt-[2.1rem] grid grid-cols-[1.25fr_0.85fr] items-start gap-[2.1rem]">
  <div>
    <div class="mb-[0.55rem] text-[1.34rem] text-slate-900"><strong class="font-bold">Sim:</strong> x512 environments (MJX)</div>
    <div class="h-[18.4rem] w-[88%]">
      <img
        class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-cover shadow-none"
        src="/deck/image7.png"
        alt="Many simulated robot environments running in parallel"
      />
    </div>
  </div>
  <div>
    <div class="mb-[0.55rem] text-[1.34rem] text-slate-900"><strong class="font-bold">Real:</strong> x1 robot (!)</div>
    <div class="w-[58%]">
      <img
        class="block h-auto w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
        src="/deck/image4.png"
        alt="Real robot camera view"
      />
    </div>
  </div>
</div>

---

# Online learning

<div class="mt-[2.3rem] grid grid-cols-[1.18fr_1fr] items-center gap-[2.2rem]">
  <div class="h-[19rem]">
    <SlidevVideo class="block h-full w-full rounded-[0.35rem] bg-slate-950 object-cover" autoplay controls muted volume="0">
      <source src="/videos/franka-learning.mp4" type="video/mp4" />
      <p>
        Your browser does not support videos. You may download it
        <a href="/videos/franka-learning.mp4">here</a>.
      </p>
    </SlidevVideo>
  </div>
  <div class="h-[18.3rem]">
    <img
      class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
      src="/deck/image13.png"
      alt="Online learning success plot comparing retained data and baseline"
    />
  </div>
</div>

---

# Unitree Go2

<div
  class="absolute right-[4.15rem] top-[2.15rem] h-[7.75rem] w-[5.8rem]"
>
  <img
    class="block h-full w-full object-contain"
    src="/deck/image3.png"
    alt="Stop robot abuse sign"
  />
</div>

<div
  class="absolute bottom-[6.55rem] left-[4.15rem] right-[4.15rem] grid grid-cols-3 gap-[0.55rem]"
>
  <div class="h-[17.4rem] min-w-0">
    <SlidevVideo class="block h-full w-full rounded-[0.35rem] bg-slate-950 object-cover" autoplay controls muted volume="0">
      <source src="/videos/base-4.mp4" type="video/mp4" />
      <p>
        Your browser does not support videos. You may download it
        <a href="http://drive.google.com/file/d/1q2C8FrhnTGLXLsyA6-0JVwe2DRDAb72T/view">here</a>.
      </p>
    </SlidevVideo>
  </div>
  <div class="h-[17.4rem] min-w-0">
    <SlidevVideo class="block h-full w-full rounded-[0.35rem] bg-slate-950 object-cover" autoplay controls muted volume="0">
      <source src="/videos/100K-2.mp4" type="video/mp4" />
      <p>
        Your browser does not support videos. You may download it
        <a href="http://drive.google.com/file/d/1pxbbmzqoZ8KKQM6YVZu84B2ry60oJjFV/view">here</a>.
      </p>
    </SlidevVideo>
  </div>
  <div class="flex h-[17.4rem] min-w-0 items-center">
    <div class="relative mx-auto aspect-[1643/1005] w-full">
      <img
        class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
        src="/deck/image12.png"
        alt="Return over time with cooldown periods"
      />
      <svg
        class="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="cooldown-arrowhead"
            viewBox="0 0 4.2 4.2"
            markerWidth="4.2"
            markerHeight="4.2"
            refX="3.8"
            refY="2.1"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path
              d="M0.8 0.8 L3.8 2.1 L0.8 3.4"
              stroke="#111111"
              stroke-width="0.65"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </marker>
        </defs>
        <path
          d="M58 53 C48.2 47.8 39.6 39.4 36.4 20.2"
          stroke="#111111"
          stroke-width="0.85"
          stroke-linecap="round"
          stroke-linejoin="round"
          marker-end="url(#cooldown-arrowhead)"
        />
        <path
          d="M58 53 C69.2 47.2 80.4 37.6 98.4 15.8"
          stroke="#111111"
          stroke-width="0.85"
          stroke-linecap="round"
          stroke-linejoin="round"
          marker-end="url(#cooldown-arrowhead)"
        />
      </svg>
      <div
        class="pointer-events-none absolute left-[58%] top-[57.5%] -translate-x-1/2 text-center text-[0.72rem] font-medium leading-[0.92] text-black"
      >
        Cooldown<br />breaks🔥
      </div>
    </div>
  </div>
</div>

---

# SOOPER

<div class="mt-[2.3rem] grid grid-cols-[1fr_0.9fr] items-center gap-[2.2rem]">
  <div class="h-[21.3rem] min-w-0">
    <img
      class="block h-full w-full object-contain"
      src="/deck/image8.png"
      alt="SOOPER safe exploration schematic and constraint equation"
    />
  </div>
  <div class="h-[21.3rem]">
    <SlidevVideo class="block h-full w-full rounded-[0.35rem] bg-slate-950 object-cover" autoplay controls muted volume="0">
      <source src="/videos/sooper-demo.DWH0Dlo-.mp4" type="video/mp4" />
      <p>
        Your browser does not support videos. You may download it
        <a href="http://drive.google.com/file/d/1RsE_Z7R1L35YGs6OAk_kLwSXYu-kwE3m/view">here</a>.
      </p>
    </SlidevVideo>
  </div>
</div>

---

# SOOPER

<div class="mt-[2.3rem] grid grid-cols-2 items-center gap-[2.2rem]">
  <div class="h-[21.3rem] min-w-0">
    <SlidevVideo class="block h-full w-full rounded-[0.35rem] bg-slate-950 object-cover" autoplay controls muted volume="0">
      <source src="/videos/timelapse.BoG5wRG9.mp4" type="video/mp4" />
      <p>
        Your browser does not support videos. You may download it
        <a href="/videos/timelapse.BoG5wRG9.mp4">here</a>.
      </p>
    </SlidevVideo>
  </div>
  <div class="h-[21.3rem] min-w-0">
    <img
      class="block h-full w-full object-contain"
      src="/deck/image10.png"
      alt="SOOPER key result with performance plots and obstacle avoidance trajectory"
    />
  </div>
</div>

---
layout: cover
---
# Appendix & Misc

---

# Taxonomy of MBRL Algorithms

<div class="relative mx-auto mt-1 aspect-[1040/430] w-full max-w-[37rem]">
  <img class="absolute inset-0 block h-full w-full object-contain" src="/deck/model_based_rl_pillars.svg" alt="Three classical pillars labelled Lookahead policies, Value-expansion, and Dyna" />
  <div class="absolute left-[24.5%] top-[63.2%] w-[21%] -translate-x-1/2 -translate-y-1/2 text-center text-[0.84rem] font-semibold leading-none text-black">Lookahead policies</div>
  <div class="absolute left-1/2 top-[63.2%] w-[21%] -translate-x-1/2 -translate-y-1/2 text-center text-[0.84rem] font-semibold leading-none text-black">Value-expansion</div>
  <div class="absolute left-[75.5%] top-[63.2%] w-[21%] -translate-x-1/2 -translate-y-1/2 text-center text-[0.88rem] font-semibold leading-none text-black">Dyna</div>
</div>

<div class="mx-auto mt-3 grid w-[92%] grid-cols-[1fr_1.18fr_1fr] gap-5 text-[0.88rem] leading-none">
  <div class="flex h-[8.1rem] flex-wrap content-center justify-center gap-x-5 gap-y-3 rounded-[0.35rem] border-[2px] border-black px-5 py-3 text-center">
    <span>TreePI</span>
    <span>TD-MPC<br /><span class="text-[0.72rem]">(online, slow)</span></span>
    <span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">π</span></span></span></span>-Expansion</span>
  </div>
  <div class="flex h-[8.1rem] flex-wrap content-center justify-center gap-x-5 gap-y-3 rounded-[0.35rem] border-[2px] border-black px-5 py-3 text-center">
    <span>TreePI<sup>*</sup></span>
    <span>TD-MPC</span>
    <span>Dreamer</span>
    <span class="basis-full">Stochastic Value Gradient</span>
    <span>MVE</span>
    <span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">π</span></span></span></span>-Expansion</span>
  </div>
  <div class="flex h-[8.1rem] flex-wrap content-center justify-center gap-x-6 gap-y-3 rounded-[0.35rem] border-[2px] border-black px-5 py-3 text-center">
    <span>MBPO</span>
    <span>Dreamer</span>
    <span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">π</span></span></span></span>-Expansion</span>
  </div>
</div>

---

# Libero -> MJX

<div class="mt-[2.3rem] grid grid-cols-[1.3fr_0.75fr] items-center gap-[2.7rem]">
  <div class="h-[21rem]">
    <img
      class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
      src="/deck/image6.png"
      alt="Throughput chart comparing CPU and MJX environments"
    />
  </div>
  <div class="grid gap-[0.65rem]">
    <div class="h-[12.1rem]">
      <img
        class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-cover shadow-none"
        src="/deck/image15.gif"
        alt="Libero rollout animation"
      />
    </div>
    <div class="h-[12.1rem]">
      <img
        class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-cover shadow-none"
        src="/deck/image16.gif"
        alt="MJX rollout animation"
      />
    </div>
  </div>
</div>

---

# Theory

<div class="mt-[1.7rem] grid grid-rows-[auto_7.2rem] gap-[1.1rem]">
  <ul class="m-0 w-[92%] space-y-[0.72rem] pl-[1.8rem] text-[1.36rem] leading-[1.34]">
    <li>
      Split episodic regret into a term that relates to performance in the simulated MDP and the performance of an optimal policy on the real MDP under the augmented policy.
    </li>
    <li>
      First term: invoke theory for online learning in non-linear RKHS dynamics due to Kakade 2020.
    </li>
    <li>
      Second term: show that as the model improves, the algorithm need not fall back to the prior policy.
    </li>
  </ul>
  <div class="mx-auto h-full w-[72%] self-end">
    <img
      class="block h-full w-full object-contain"
      src="/deck/image9.png"
      alt="Regret decomposition formula"
    />
  </div>
</div>
