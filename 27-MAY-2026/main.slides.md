---
title: Yarden <> Marc
fonts:
  sans: Lusitana
  serif: Lusitana
---

# Yarden &lt;&gt; Marc
<div class="abs-bl mx-14 my-12 flex">
  <div class="ml-3 flex flex-col text-left">
    <div class="text-sm opacity-50">May 27, 2026</div>
  </div>
</div>


---

# About

<div class="mt-6 grid grid-cols-[1.05fr_0.95fr] items-start gap-8">

<div class="space-y-5 text-[1.18rem] leading-snug">
  <div>
    PhD student @ <a href="https://ai.ethz.ch/" target="_blank">ETH AI Center</a>
    &amp; <a href="https://las.inf.ethz.ch/" target="_blank">Learning &amp; Adaptive Systems</a>.
  </div>

  <div>
    Working on reinforcement learning for systems that need to adapt after deployment.
  </div>

  <div>
    I care about making robot learning less of a lab ritual and more of a thing that survives contact with the world.
  </div>

  <div class="text-[0.98rem] opacity-55">
    King Gizzard and the Lizard Wizard Fan
  </div>
</div>

<div class="mt-1 rounded-[0.35rem] border border-black/10 px-6 py-5">
  <div class="text-[0.82rem] uppercase tracking-[0.12em] opacity-45">Research arc</div>
  <div class="mt-5 space-y-4 text-[1.05rem] leading-tight">
    <div class="flex items-center gap-3">
      <div class="h-2.5 w-2.5 rounded-full bg-[#5f4b9b]"></div>
      <div>safe reinforcement learning</div>
    </div>
    <div class="ml-[0.3rem] h-7 border-l border-black/20"></div>
    <div class="flex items-center gap-3">
      <div class="h-2.5 w-2.5 rounded-full bg-[#22709d]"></div>
      <div>offline-to-online adaptation</div>
    </div>
    <div class="ml-[0.3rem] h-7 border-l border-black/20"></div>
    <div class="flex items-center gap-3">
      <div class="h-2.5 w-2.5 rounded-full bg-[#0e8b62]"></div>
      <div>real-world robot learning</div>
    </div>
  </div>
</div>

</div>

<div class="abs-bl mx-14 my-10 text-sm opacity-50">
  <a href="https://yas.pub/" target="_blank">yas.pub</a>
</div>


---

# Odyn: Offline-to-online Dyna
Three pillars of model-based RL

<div class="relative mx-auto mt-4 aspect-[1040/430] w-full max-w-[60.5rem]">
  <img class="absolute inset-0 block h-full w-full object-contain" src="/deck/model_based_rl_pillars.svg" alt="Three classical pillars labelled Lookahead policies, Value-expansion, and Dyna" />
  <div class="absolute left-[24.5%] top-[63.2%] w-[21%] -translate-x-1/2 -translate-y-1/2 text-center text-[1.4rem] font-semibold leading-none text-black">Lookahead policies</div>
  <div class="absolute left-1/2 top-[63.2%] w-[21%] -translate-x-1/2 -translate-y-1/2 text-center text-[1.4rem] font-semibold leading-none text-black">Value-expansion</div>
  <div class="absolute left-[75.5%] top-[63.2%] w-[21%] -translate-x-1/2 -translate-y-1/2 text-center text-[1.45rem] font-semibold leading-none text-black">Dyna</div>
  <v-switch at="1" class="absolute inset-0 overflow-visible">
    <template #1>
      <div class="absolute left-[37.6%] top-[96%] w-[51%] -translate-x-1/2 text-center text-[0.72rem] leading-none text-black">
        <KatexBlock expr="\underbrace{\hspace{30em}}_{\large\text{“deep expansion” - sequential}}" />
      </div>
      <div class="absolute left-[75.5%] top-[96%] w-[22%] -translate-x-1/2 text-center text-[0.72rem] leading-none text-black">
        <KatexBlock expr="\underbrace{\hspace{12em}}_{\large\text{“wide expansion” - parallel}}" />
      </div>
    </template>
  </v-switch>
</div>


---

# Odyn
Initial results


<div class="mt-0 grid grid-cols-2 gap-8 items-center">

<div class="h-[20rem] overflow-hidden rounded">
  <img
    class="w-full h-[24rem] object-contain -translate-y-[5rem]"
    src="/deck/rank_02_cand_01_traj_000_start_5492_pi_expansion.gif"
    alt="pi cubed trajectory rollout"
  />
</div>

<div>
  <img
    class="w-full h-[24rem] object-contain rounded"
    src="/deck/h1_mpo_vs_odyn.svg"
    alt="Comparison plot of MPO versus pi cubed"
  />
</div>

</div>
<!--  
Planner works on MJX, "real" runs on MuJoCo CPU
-->


---

# Odyn
Initial results

<div class="mx-auto mt-2">

  #### Odyn leverages massively-parallel simulators, even on complex tasks
</div>

<div class="mt-6 grid grid-cols-[1.22fr_0.78fr] items-center gap-0">

<div class="h-[21.3rem] min-w-0 rounded-[0.35rem]">
  <img
    class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
    src="/deck/ogbench_puzzle_parallel_tile.gif"
    alt="Parallel OGBench puzzle rollouts"
  />
</div>

<div class="grid gap-3">
  <img
    class="block h-[9.25rem] w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
    src="/deck/puzzle_ik_throughput.svg"
    alt="Puzzle inverse kinematics throughput"
  />
  <img
    class="block h-[9.25rem] w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
    src="/deck/puzzle_mjx_backend_throughput.svg"
    alt="Puzzle MJX backend throughput"
  />
</div>

</div>

---

# Odyn
Harder tasks

<div class="mx-auto mt--8 flex w-[46rem] flex-col gap-[0.55rem]">
  <img
    class="mx-auto block h-[12.25rem] w-[44rem] rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
    src="/deck/puzzle_cube_dyna_bon_ablation_eval_success_puzzle_cube.svg"
    alt="Puzzle cube Dyna best-of-N ablation success rate"
  />

  <div class="mx-auto grid w-[36.5rem] grid-cols-2 gap-[0.65rem]">
    <div class="h-[12.35rem] overflow-hidden rounded-[0.35rem] bg-slate-950">
      <iframe
        class="block h-full w-full border-0"
        src="/mjswan/index.html?scene=Puzzle%20task5&controller=onnx&autoplay=1&speed=1&seed=random&panel=0"
        title="OGBench puzzle MuJoCo WASM demo"
      />
    </div>
    <div class="h-[12.35rem] overflow-hidden rounded-[0.35rem] bg-slate-950">
      <iframe
        class="block h-full w-full border-0"
        src="/mjswan-cube/index.html?scene=Cube%20task5&controller=onnx&autoplay=1&speed=1&seed=random&panel=0"
        title="OGBench cube MuJoCo WASM demo"
      />
    </div>
  </div>
</div>

<!-- 
I have an implementation of MPO that works with flow matching models, I believe co-training could be an interesting angle.
 -->

---

# VLA Policy Extraction

<div class="mt-5 flex flex-col items-center">

<div class="h-[7.8rem] w-full text-center text-[1.03rem] leading-tight">


<v-switch at="0">
  <template #1>
    <div class="mt-4 flex justify-center">
      <div class="py-3">
        <KatexBlock expr="\begin{gathered}a_K=\operatorname{ODE}_K(v_\theta,s,a_0,0,1)\\[0.35em]\text{where}\quad a_{k+1}=a_k+\frac{1}{K}v_{\theta}(s,a_k,\tau_k),\quad \tau_k=\frac{k}{K}\\[0.45em]\max_{\theta}\;\mathbb{E}_{s\sim\mathcal{D},\,a_0\sim\mathcal{N}(0,I)}\left[Q_{\phi}(s,a_K)\right]\end{gathered}" />
      </div>
    </div>
  </template>
  <template #2>
    <div class="mt-4 flex justify-center">
      <div class="py-3">
        <KatexBlock expr="\begin{gathered}a_t=\operatorname{sg}\!\left(\operatorname{ODE}_K(v_\theta,s,x_0,0,t)\right),\quad x_0\sim\mathcal{N}(0,I),\quad t\sim U[0,1]\\[0.45em]\hat{a}=a_t+(1-t)v_{\theta}(s,a_t,t)\\[0.45em]\max_{\theta}\;\mathbb{E}_{s\sim\mathcal{D},\,x_0,\,t}\left[Q_{\psi}(s,\hat{a})\right]\end{gathered}" />
      </div>
    </div>
  </template>
</v-switch>

</div>

<div class="mt-5 h-[14.5rem] w-[72%] min-w-0">
  <img
    class="block h-full w-full rounded-[0.35rem] object-contain"
    src="/videos/560167437-1f72ccca-5b90-4d6c-86c5-a423b686314c.gif"
    alt="Q-guided flow matching rollout"
  />
</div>

</div>

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
  <v-switch at="0" class="absolute inset-0">
    <template #1>
      <svg class="absolute inset-0 h-full w-full" viewBox="0 0 1040 430" fill="none" aria-hidden="true">
        <defs>
          <marker
            id="taxonomy-pillar-arrowhead"
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
          marker-end="url(#taxonomy-pillar-arrowhead)"
        />
        <path
          d="M520 226C590 176 685 176 760 226"
          stroke="black"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
          marker-end="url(#taxonomy-pillar-arrowhead)"
        />
      </svg>
      <div class="absolute left-[37%] top-[32%] -translate-x-1/2 text-[0.82rem] font-semibold leading-none text-black">
        <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4831em;"></span><span class="mrel">≈</span></span></span></span> AlphaZero
      </div>
    </template>
  </v-switch>
</div>

<div class="mx-auto mt-3 grid w-[92%] grid-cols-[1fr_1.18fr_1fr] gap-5 text-[0.88rem] leading-none">
  <div class="flex h-[8.1rem] flex-wrap content-center justify-center gap-x-5 gap-y-3 rounded-[0.35rem] border-[2px] border-black px-5 py-3 text-center">
    <span>TreePI</span>
    <span>AlphaZero</span>
    <span>SPO</span>
    <span>TD-MPC<br /><span class="text-[0.72rem]">(online, slow)</span></span>
    <span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">π</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">3</span></span></span></span></span></span></span></span></span></span></span></span>
  </div>
  <div class="flex h-[8.1rem] flex-wrap content-center justify-center gap-x-5 gap-y-3 rounded-[0.35rem] border-[2px] border-black px-5 py-3 text-center">
    <span>TreePI<sup>*</sup></span>
    <span>AlphaZero</span>
    <span>TD-MPC</span>
    <span>Dreamer</span>
    <span>SPO</span>
    <span class="basis-full">SVG</span>
    <span>MVE</span>
    <span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">π</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">3</span></span></span></span></span></span></span></span></span></span></span></span>
  </div>
  <div class="flex h-[8.1rem] flex-wrap content-center justify-center gap-x-6 gap-y-3 rounded-[0.35rem] border-[2px] border-black px-5 py-3 text-center">
    <span>MBPO</span>
    <span>AlphaZero</span>
    <span>Dreamer</span>
    <span>SPO</span>
    <span>TreePI<sup>*</sup></span>
    <span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">π</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">3</span></span></span></span></span></span></span></span></span></span></span></span>
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
