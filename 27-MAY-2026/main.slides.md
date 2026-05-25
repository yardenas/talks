---
title: Real-World Reinforcement Learning that Works
fonts:
  sans: Lusitana
  serif: Lusitana
---

# Real-World Reinforcement Learning that Works
<div class="abs-bl mx-14 my-12 flex">
  <div class="ml-3 flex flex-col text-left">
    <div class="text-sm opacity-50">June 16, 2026</div>
  </div>
</div>

---

# Introduction
<style>
.intro-bio {
  @apply font-mono opacity-90;
}
</style>

<div class="intro-bio mt-6 leading-snug">
  PhD student @ <a href="https://ai.ethz.ch/" target="_blank">ETH AI Center</a> & <a href="https://las.inf.ethz.ch/" target="_blank">Learning & Adaptive Systems</a>.<br>
  Working real-world reinforcement learning and robotics.
</div>

<div class="mt-20">
  <img src="/life.svg">
</div>

<img src="https://las.inf.ethz.ch/wp-content/uploads/2024/03/yardas.jpeg" class="rounded-full w-40 abs-tr mt-7 mr-12"/>

---

<style>
.places-title {
  margin: 0 0 0.35rem;
  font-size: 2.25rem;
  line-height: 1;
}
.places-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.55rem;
}
.place-card {
  box-sizing: border-box;
  height: 13.65rem;
  overflow: hidden;
  background: white;
  border-radius: 22px;
  border: 5px solid rgba(255,255,255,0.92);
  box-shadow: 0 20px 48px rgba(15,23,42,0.12);
}
.place-card > img,
.place-card > iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  object-fit: cover;
}
.place-card--portrait > img {
  object-position: center 18%;
}
.place-card--focus-right > img {
  object-position: 35% center;
}
</style>

<h1 class="places-title">Introduction</h1>

<div class="places-grid mt-2">
  <div class="place-card">
    <iframe
      src="https://www.google.com/maps?q=Bat%20Galim%2C%20Haifa%2C%20Israel&amp;z=13&amp;output=embed"
      title="Map of Bat Galim, Haifa"
      loading="lazy"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>

  <div class="place-card">
    <img src="/deck/batgalim.jpg" alt="Bat Galim">
  </div>

  <div class="place-card place-card--focus-right">
    <img src="/deck/PXL_20230228_105749773.jpg" alt="Bat Galim, Haifa">
  </div>

  <div class="place-card">
    <img src="/deck/roni.jpg" alt="Roni">
  </div>

  <div class="place-card">
    <img src="/deck/ch.jpg" alt="Swiss landscape">
  </div>

  <div class="place-card">
    <img src="/deck/ch1.jpg" alt="Swiss landscape">
  </div>

  <div class="place-card place-card--portrait">
    <img src="/deck/temi1.png" alt="Temi">
  </div>

  <div class="place-card place-card--portrait">
    <img src="/deck/temi2.png" alt="Temi">
  </div>
</div>

---

# Real-World Reinforcement Learning

<div class="mt-[2.3rem] h-[22rem]">
  <img
    class="mx-auto block h-full w-[47%] rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
    src="/deck/image11.png"
    alt="Robot setup with Realsense camera and cube pickup annotation"
  />
</div>

---

# Sim-to-Real

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

# Online Learning: Franka Emika Panda

<div class="mt-[2.3rem] grid grid-cols-[1.18fr_1fr] items-center gap-[2.2rem]">
  <div class="h-[19rem]">
    <SlidevVideo class="block h-full w-full rounded-[0.35rem] bg-white object-contain" autoplay controls muted volume="0">
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

# Online Learning: Unitree Go2

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
      <source src="/videos/100K-2-15s.mp4" type="video/mp4" />
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

# Safety Matters in the Real World

<div class="mx-auto mt-8 flex h-[20.5rem] w-[82%] items-center justify-center rounded-[0.5rem] border-[3px] border-dashed border-slate-400 bg-slate-50 text-center text-slate-500">
  <div>
    <div class="text-[1.2rem] font-semibold">Image placeholder</div>
    <div class="mt-2 text-[0.95rem]">Robot undergoing open surgery</div>
  </div>
</div>

---

# Safety and Priors

<div class="mt-16 flex h-[18rem] items-center justify-center text-center">
  <v-switch at="0">
    <template #1>
      <div class="mx-auto max-w-[56rem] leading-tight">
        <div class="text-[2.35rem]">
          How can agents explore new environments without any notion of what is safe?
        </div>
        <div class="mt-8 text-[2.75rem] font-semibold">
          Some prior knowledge is needed.
        </div>
      </div>
    </template>
    <template #2>
      <div class="text-[3.4rem] font-semibold leading-tight">
        Use simulators as priors.
      </div>
    </template>
    <template #3>
      <div class="text-[3.4rem] font-semibold leading-tight">
        How to train in simulation a policy that is satisfies constraints zero shot in reality?
      </div>
    </template>
  </v-switch>
</div>

<!-- ---

# From Simulation to Reality

<div class="mt-12 grid grid-cols-[1fr_0.42fr_1.22fr] items-center gap-5">
  <div class="h-[16.2rem] min-w-0 text-center">
    <img
      class="mx-auto block h-full w-full rounded-[0.45rem] object-contain"
      src="/deck/rccar_sim.gif"
      alt="Simulated RC car driving"
    />
  </div>

  <div v-click class="text-center text-[1.55rem] font-semibold leading-tight">
    simulation<br />
    <div class="my-1 text-[2.9rem] leading-none">
      <KatexBlock expr="\neq" />
    </div>
    reality
  </div>

  <div class="h-[16.2rem] min-w-0 translate-x-5 text-center">
    <SlidevVideo class="mx-auto block h-full w-full rounded-[0.45rem] bg-white object-contain" autoplay loop muted volume="0">
      <source src="/videos/first_episodes.mp4" type="video/mp4" />
      <p>
        Your browser does not support videos. You may download it
        <a href="/videos/first_episodes.mp4">here</a>.
      </p>
    </SlidevVideo>
  </div>
</div> -->

---

# Pessimistic Domain Randomization

<div class="mt-4 grid h-[22.5rem] grid-cols-[1.22fr_0.78fr] items-center gap-4">
  <div class="flex h-full flex-col justify-center text-center">
    <div class="w-full">
      <div class="mb-1 text-[0.76rem] font-semibold opacity-60">
        Pessimistic upper bound
      </div>
      <div class="text-[0.55rem] leading-tight">
        <KatexBlock expr="C_{p^\star}(\pi)\le \underbrace{\mathbb{E}_{\xi\sim\mu} C_{\hat{p}_\xi}(\pi)}_{\text{constraint in simulation}} + \quad \underbrace{\mathbb{E}_{\xi\sim\mu}\!\left[\mathbb{E}_{(s,a)\sim d_{\hat{p}_\xi,\pi}}\left[\frac{\gamma L_C}{1-\gamma}D_W(\hat{p}_\xi,p^\star)(s,a)\right]\right]}_{\text{uncertainty w.r.t. sim-to-real gap}}" />
      </div>
    </div>
    <div v-click>
      <div class="my-[0.2rem] text-[1.1rem] leading-none opacity-45">&darr;</div>
      <div class="mx-auto w-[96%]">
        <div class="mb-1 text-[0.76rem] font-semibold opacity-60">
          Conservative surrogate cost
        </div>
        <div class="text-[0.86rem] leading-tight">
          <KatexBlock expr="\tilde{c}(s,a)\triangleq c(s,a)+\underbrace{\frac{\gamma L_C}{1-\gamma}\max_{\xi\in\Xi}D_W(\hat{p}_\xi,p^\star)(s,a)}_{\text{penalty}}" />
        </div>
      </div>
    </div>
    <div v-click>
      <div class="my-[0.2rem] text-[1.1rem] leading-none opacity-45">&darr;</div>
      <div class="mx-auto w-[98%]">
        <div class="mb-1 text-[0.76rem] font-semibold opacity-60">
          Approximate the penalty by ensemble disagreement
        </div>
        <div class="text-[0.66rem] leading-tight">
          <KatexBlock expr="\begin{gathered} s_i\sim\hat{p}_{\xi_i}(\cdot\mid s,a),\quad \xi_i\overset{\mathrm{i.i.d.}}{\sim}\mu\\[0.35em]\upsilon(s,a)\triangleq\left\|\operatorname{Var}(s_1,\ldots,s_n)\right\|_1=\sum_{j=1}^{\operatorname{dim}(\mathcal{S})}\operatorname{Var}(s_{1,j},\ldots,s_{n,j}) \end{gathered}" />
        </div>
      </div>
    </div>
  </div>

  <div class="flex h-full items-center justify-center">
    <img
      class="block w-full max-w-none object-contain"
      src="/deck/teaser.svg"
      alt="Pessimistic domain randomization teaser"
    />
  </div>
</div>

---

# Results

<div class="mt-10 grid h-[22.5rem] grid-rows-[7.6rem_13.7rem] gap-3">
  <div class="mx-auto min-h-0 w-[92%]">
    <img
      class="block h-full w-full object-contain"
      src="/deck/real-world-safety.svg"
      alt="SPiDR real-world safety results"
    />
  </div>

  <div class="mx-auto min-h-0 w-[92%]">
    <img
      class="block h-full w-full object-contain"
      src="/deck/spidr-results.png"
      alt="SPiDR simulated safety and performance results"
    />
  </div>
</div>

---
layout: center
class: text-center
---

<div class="flex flex-col items-center justify-center">
  <div class="text-[3.9rem] font-semibold leading-tight">
    Can we do better?
  </div>

  <div class="mt-10 text-[2.35rem] font-semibold leading-tight opacity-70">
    close the loop, learn online
  </div>
</div>

---

# Close the Loop

<div class="relative mt-[2.0rem] mx-auto h-[23rem] w-[94%]">
  <svg class="absolute inset-0 h-full w-full" viewBox="0 0 1200 560" role="img" aria-label="SOOPER training loop">
    <path d="M 350 56 H 88 Q 42 56 42 102 V 146 Q 42 168 64 168 H 116" fill="none" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <polygon points="138,168 116,157 116,179" fill="black" />
    <path d="M 1048 168 H 1138 Q 1184 168 1184 122 V 102 Q 1184 56 1138 56 H 880" fill="none" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <polygon points="858,56 880,45 880,67" fill="black" />
    <path d="M 340 168 H 472" fill="none" stroke="black" stroke-width="4" stroke-linecap="round" />
    <polygon points="494,168 472,157 472,179" fill="black" />
    <path d="M 706 168 H 852" fill="none" stroke="black" stroke-width="4" stroke-linecap="round" />
    <polygon points="874,168 852,157 852,179" fill="black" />
  </svg>
  <div class="absolute left-[27%] top-0 flex h-[3.4rem] w-[46%] items-center justify-center border-[2.5px] border-black bg-white px-4">
    <KatexBlock class="text-[0.92rem]" expr="\text{Iterate for } n=0,\ldots,N-1\text{ episodes}" />
  </div>
  <div class="absolute left-[8.5%] top-[6.35rem] w-[26%] text-center">
    <div class="inline-block bg-white px-1 text-[1.22rem] font-semibold leading-none">Collect data</div>
  </div>
  <div class="absolute left-[40%] top-[6.35rem] w-[26%] text-center">
    <div class="inline-block bg-white px-3 text-[1.22rem] font-semibold leading-none">Improve model</div>
  </div>
  <div class="absolute left-[66.5%] top-[6.35rem] w-[26%] text-center">
    <div class="inline-block bg-white px-3 text-[1.22rem] font-semibold leading-none">Plan</div>
  </div>
  <div class="absolute left-[3.2%] top-[10.4rem] w-[31%] text-center text-[0.98rem] leading-tight">
    <div>
      Deploy <KatexBlock class="inline-block" :display="false" expr="\pi_n" /> safely and append
    </div>
    <div>
      real transitions to <KatexBlock class="inline-block" :display="false" expr="\mathcal{D}_{\le n}" />.
    </div>
    <KatexBlock
      class="mt-4 text-[0.48rem]"
      expr="\Phi(s_t,a_t,c_{&lt;t},Q_{c,n}^{\hat{\pi}})=c_{&lt;t}+\gamma^tQ_{c,n}^{\hat{\pi}}(s_t,a_t)"
    />
  </div>
  <div class="absolute left-[36.5%] top-[10.4rem] w-[27%] text-center text-[0.98rem] leading-tight">
    <div>Fit the dynamics model</div>
    <div>from all collected data.</div>
  </div>
  <div class="absolute left-[70%] top-[10.4rem] w-[27%] text-center text-[0.98rem] leading-tight">
    <div>Plan optimistically for reward,</div>
    <div>pessimistically for cost.</div>
    <div>
      Return the next <KatexBlock class="inline-block" :display="false" expr="\pi_{n+1}" />.
    </div>
  </div>
</div>

---

# SOOPER

<div class="mt-[2.3rem] grid grid-cols-[1fr_0.9fr] items-center gap-[2.2rem]">
  <div class="h-[21.3rem] min-w-0">
    <img
      class="block h-full w-full object-contain"
      src="/deck/sooper_schematic.svg"
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
        src="/mjswan/index.html?scene=Puzzle%20task5&controller=onnx&autoplay=1&speed=1&seed=1&panel=0"
        title="OGBench puzzle MuJoCo WASM demo"
      />
    </div>
    <div class="h-[12.35rem] overflow-hidden rounded-[0.35rem] bg-slate-950">
      <iframe
        class="block h-full w-full border-0"
        src="/mjswan-cube/index.html?scene=Cube%20task5&controller=onnx&autoplay=1&speed=1&seed=1&panel=0"
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

<div class="h-[10.2rem] w-full text-center text-[1.03rem] leading-tight">


<v-switch at="0">
  <template #1>
    <div class="mt-4 flex justify-center">
      <div class="py-3">
        <KatexBlock expr="\begin{gathered}a_K=\operatorname{ODE}_K(v_\theta,s,a_0,0,1)\\[0.35em]\text{where}\quad a_{k+1}=a_k+\frac{1}{K}v_{\theta}(s,a_k,\tau_k),\quad \tau_k=\frac{k}{K}\\[0.45em]\max_{\theta}\;\mathbb{E}_{s\sim\mathcal{D},\,a_0\sim\mathcal{N}(0,I)}\left[Q_{\phi}(s,a_K)\right]\end{gathered}" />
      </div>
    </div>
  </template>
  <template #2>
    <div class="mt-1 grid w-full grid-cols-[0.98fr_1.02fr] items-start gap-2 text-[0.73rem] leading-tight">
      <div class="py-2">
        <div class="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] opacity-65">BC flow matching</div>
        <KatexBlock expr="\begin{gathered}(s,a_1)\sim\mathcal{D},\quad x_0\sim\mathcal{N}(0,I),\quad t\sim U[0,1]\\[0.35em]a_t=(1-t)x_0+t a_1,\quad u_t=a_1-x_0\quad\Longleftrightarrow\quad a_1=a_t+(1-t)u_t\\[0.45em]\min_{\theta}\;\mathbb{E}\left[\left\|v_{\theta}(s,a_t,t)-u_t\right\|_2^2\right]\end{gathered}" />
      </div>
      <div class="py-2">
        <div class="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] opacity-65">GradFlow</div>
        <KatexBlock expr="\begin{gathered}a_t=\operatorname{sg}\!\left(\operatorname{ODE}_K(v_\theta,s,x_0,0,t)\right),\quad x_0\sim\mathcal{N}(0,I),\quad t\sim U[0,1]\\[0.45em]\hat{a}=a_t+(1-t)v_{\theta}(s,a_t,t)\\[0.45em]\max_{\theta}\;\mathbb{E}_{s\sim\mathcal{D},\,x_0,\,t}\left[Q_{\phi}(s,\hat{a})\right]\end{gathered}" />
      </div>
    </div>
  </template>
</v-switch>

</div>

<div class="mt-4 h-[12.4rem] w-[72%] min-w-0">
  <img
    class="block h-full w-full rounded-[0.35rem] object-contain"
    src="/videos/560167437-1f72ccca-5b90-4d6c-86c5-a423b686314c.gif"
    alt="Q-guided flow matching rollout"
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
    <span>Odyn</span>
  </div>
  <div class="flex h-[8.1rem] flex-wrap content-center justify-center gap-x-5 gap-y-3 rounded-[0.35rem] border-[2px] border-black px-5 py-3 text-center">
    <span>TreePI<sup>*</sup></span>
    <span>AlphaZero</span>
    <span>TD-MPC</span>
    <span>Dreamer</span>
    <span>SPO</span>
    <span class="basis-full">SVG</span>
    <span>MVE</span>
    <span>Odyn</span>
  </div>
  <div class="flex h-[8.1rem] flex-wrap content-center justify-center gap-x-6 gap-y-3 rounded-[0.35rem] border-[2px] border-black px-5 py-3 text-center">
    <span>MBPO</span>
    <span>AlphaZero</span>
    <span>Dreamer</span>
    <span>SPO</span>
    <span>TreePI<sup>*</sup></span>
    <span>Odyn</span>
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
