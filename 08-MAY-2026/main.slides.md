---
title: Yarden <> Nicolas
fonts:
  sans: Lusitana
  serif: Lusitana
---

<h1>Yarden &lt;&gt; Nicolas</h1>
<div class="abs-bl mx-14 my-12 flex">
  <div class="ml-3 flex flex-col text-left">
    <div class="text-sm opacity-50">April 15th, 2026</div>
  </div>
</div>


---
layout: center
---

# Introduction

---

# $\pi$-Expand / Dyna-MPO
MPO

<div class="mt-10">

<div class="text-center">


### “$q(a | s)$ selects soft-optimal action for _one step_ and then commits to $\pi$“

<br>
</div>
$$
\begin{aligned}
\max_q J(q,\pi)
&= \max_q T_{\pi,q} Q_{\pi}(s,a) \\
&= \max_q \mathbb{E}_{\mu(s)}
\left[
    \mathbb{E}_{q(\cdot | s)}
    \left[
        Q_{\pi}(s,a)
    \right]
    - \alpha \mathrm{KL}(q \| \pi)
\right],
\\[0.5em]
\text{with}\quad
T_{\pi,q}
&=
\mathbb{E}_{q(a | s)}
\left[
    r(s,a)
    - \alpha \mathrm{KL}(q \| \pi)
    + \gamma _{p(s' | s,a)}
    \left[
        V_{\pi}(s')
    \right]
\right]
\end{aligned}
$$
</div>

---

# $\pi$-Expand / Dyna-MPO
TreePI

<div class="mt-10">

<div class="text-center">


### “Tree expansion represents an improved $q(a|s)$ by searching over future actions“

<br>
</div>
$$
\begin{aligned}
q_{K}^{*}(\cdot | s)
&=
\operatorname*{arg\,max}_{q_{1:K}}
J(q_{K}, \pi)
\\[0.5em]
&=
\operatorname*{arg\,max}_{q_{1:K}}
\left(
T_{\pi,q_1}
T_{\pi,q_2}
\cdots
T_{\pi,q_K}
V_{\pi}
\right)(s)
\\[0.5em]
&=
\operatorname*{arg\,max}_{q_{1:K}}
\mathbb{E}_{q_{1:K}}
\left[
    \gamma^{K} V_{\pi}(s_{K+1})
    +
    \sum_{t=1}^{K}
    \gamma^{t-1}
    \left(
        r_t
        -
        \alpha \mathrm{KL}_t
    \right)
\right]
\end{aligned}
$$
</div>


---

# $\pi$-Expand / Dyna-MPO


<div class="mt-20">

<div class="text-center">


### “Retain the data of your lookahead$^*$ policies“

<br>
</div>
$$
\begin{aligned}
\pi_{\text{new}}
&=
\operatorname*{arg\,max}_{\pi'}
\mathbb{E}_{s \sim \mu_{\text{expand}}(s)}
\left[
    \mathbb{E}_{a \sim q_K^*(\cdot | s)}
    [\log \pi'(a | s)]
\right]
\end{aligned}
$$
</div>

<div class="absolute bottom-6 left-10 text-s">

$^*$ MPC is amenable to GPUs (compared to tree expansion) and works surprisingly well on many robotic tasks.
</div>

<!-- 
Key intution: find in simulation promising states, and supervise the policy with them before seeing them in the real-world.
 -->
---

# $\pi$-Expand / Dyna-MPO
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

---

# $\pi$-Expand / Dyna-MPO
Next steps

<div class="mt-10 grid grid-cols-[0.9fr_1.1fr] items-start gap-12">

<ul class="list-disc space-y-8 pl-8 pt-8 text-[1.45rem] leading-tight">
  <li>
    <span class="font-semibold">Harder tasks</span>
  </li>
  <li>
    <span class="font-semibold">Flow-matching and Best-of-N</span>
  </li>
</ul>

<div class="h-[14rem] overflow-hidden rounded bg-white">
  <img
    class="h-full w-full object-contain"
    src="/deck/ogbench_puzzle_task4_oracle.gif"
    alt="Oracle rollout for OGBench puzzle task 4"
  />
</div>

</div>

---

<section class="absolute inset-0 overflow-hidden bg-gradient-to-b from-white to-[#fafcfc] px-[4.15rem] py-[3.35rem] font-serif text-slate-900">
  <h1 class="m-0 text-[3.15rem] font-medium leading-none tracking-normal">Real-world reinforcement learning</h1>

  <div
    class="absolute left-[22%] top-[24%] z-[1] h-[60%] w-[47%]"
  >
    <img
      class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
      src="/deck/image11.png"
      alt="Robot setup with Realsense camera and cube pickup annotation"
    />
  </div>
  <div
    class="absolute right-[5.6%] top-[41%] z-[2] h-[27%] w-[24%]"
  >
    <img
      class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-cover shadow-none"
      src="/deck/image5.png"
      alt="Robot camera view of the cube pickup task"
    />
  </div>
</section>

---

<section class="absolute inset-0 overflow-hidden bg-gradient-to-b from-white to-[#fafcfc] px-[4.15rem] py-[3.35rem] font-serif text-slate-900">
  <h1 class="m-0 text-[3.15rem] font-medium leading-none tracking-normal">Sim-to-real</h1>

  <div class="mt-[2.3rem] grid h-[calc(100%-4.4rem)] grid-cols-[1.45fr_0.9fr] items-start gap-[2.2rem]">
    <div>
      <div class="mb-[0.55rem] text-[1.34rem] text-slate-900"><strong class="font-bold text-[#5a4a91]">Sim:</strong> x512 environments (MJX)</div>
      <div class="h-[23.2rem]">
        <img
          class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-cover shadow-none"
          src="/deck/image7.png"
          alt="Many simulated robot environments running in parallel"
        />
      </div>
    </div>
    <div class="pt-[4.9rem]">
      <div class="mb-[0.55rem] text-[1.34rem] text-slate-900"><strong class="font-bold text-[#5a4a91]">Real:</strong> x1 robot (!)</div>
      <div class="h-[13.9rem]">
        <img
          class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-cover shadow-none"
          src="/deck/image4.png"
          alt="Real robot camera view"
        />
      </div>
    </div>
  </div>
</section>

---

<section class="absolute inset-0 overflow-hidden bg-gradient-to-b from-white to-[#fafcfc] px-[4.15rem] py-[3.35rem] font-serif text-slate-900">
  <h1 class="m-0 text-[3.15rem] font-medium leading-none tracking-normal">H1 MuJoCo in browser</h1>

  <div class="mt-[1.45rem] h-[25.2rem]">
    <iframe
      class="block h-full w-full rounded-[0.35rem] border border-slate-200 bg-slate-950 shadow-none"
      src="/mjswan/index.html?scene=H1%20Mocap%20Tracking&policy=H1%20SAC%20motion-conditioned&panel=0&ref=0"
      title="H1 MuJoCo simulation running in mjswan"
      allow="fullscreen; xr-spatial-tracking"
    ></iframe>
  </div>
  <div class="mt-[0.55rem] text-[0.92rem] leading-tight text-slate-500">
    MuJoCo WASM via mjswan, H1 MJCF assets, SAC policy and reference motion baked into ONNX.
  </div>
</section>

---

<section class="absolute inset-0 overflow-hidden bg-gradient-to-b from-white to-[#fafcfc] px-[4.15rem] py-[3.35rem] font-serif text-slate-900">
  <h1 class="m-0 text-[3.15rem] font-medium leading-none tracking-normal">Visualization-first!</h1>

  <div class="absolute left-[28%] top-[22%] h-[64%] w-[46%]">
    <img
      class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
      src="/deck/image14.png"
      alt="RViz visualization of robot state and camera reconstruction"
    />
  </div>
</section>

---

<section class="absolute inset-0 overflow-hidden bg-gradient-to-b from-white to-[#fafcfc] px-[4.15rem] py-[3.35rem] font-serif text-slate-900">
  <h1 class="m-0 text-[3.15rem] font-medium leading-none tracking-normal">Online learning</h1>

  <div class="mt-[2.3rem] grid h-[calc(100%-4.4rem)] grid-cols-[1.18fr_1fr] items-center gap-[2.2rem]">
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
</section>

---

<section class="absolute inset-0 overflow-hidden bg-gradient-to-b from-white to-[#fafcfc] px-[4.15rem] py-[3.35rem] font-serif text-slate-900">
  <h1 class="m-0 text-[3.15rem] font-medium leading-none tracking-normal">Unitree Go2</h1>

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
    class="absolute bottom-[3.55rem] left-[4.15rem] right-[4.15rem] grid grid-cols-3 gap-[0.55rem]"
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
    <div class="h-[17.4rem] min-w-0">
      <img
        class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
        src="/deck/image12.png"
        alt="Return over time with cooldown periods"
      />
    </div>
  </div>
</section>

---

<section class="absolute inset-0 overflow-hidden bg-gradient-to-b from-white to-[#fafcfc] px-[4.15rem] py-[3.35rem] font-serif text-slate-900">
  <h1 class="m-0 text-[3.15rem] font-medium leading-none tracking-normal">SOOPER</h1>

  <div class="mt-[2.3rem] grid h-[calc(100%-4.4rem)] grid-cols-[1fr_0.9fr] items-center gap-[2.2rem]">
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
</section>

---

<section class="absolute inset-0 overflow-hidden bg-gradient-to-b from-white to-[#fafcfc] px-[4.15rem] py-[3.35rem] font-serif text-slate-900">
  <h1 class="m-0 text-[3.15rem] font-medium leading-none tracking-normal">Theory</h1>

  <div class="mt-[1.7rem] grid h-[calc(100%-5.1rem)] grid-rows-[auto_7.2rem] gap-[1.1rem]">
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
</section>

---

<section class="absolute inset-0 overflow-hidden bg-gradient-to-b from-white to-[#fafcfc] px-[4.15rem] py-[3.35rem] font-serif text-slate-900">
  <h1 class="m-0 text-[3.15rem] font-medium leading-none tracking-normal">Key result: SOOPER</h1>

  <div class="mt-[1.7rem] grid h-[calc(100%-5.1rem)] grid-rows-[auto_minmax(0,1fr)] gap-[1.15rem]">
    <ul class="m-0 w-[88%] space-y-[0.72rem] pl-[1.8rem] text-[1.36rem] leading-[1.34]">
      <li>First of its kind result for cumulative regret for safe exploration.</li>
      <li>Works under offline-to-online learning and model mismatch, and scales to vision tasks.</li>
    </ul>
    <div class="mx-auto h-full min-h-0 w-[72%]">
      <img
        class="block h-full w-full object-contain"
        src="/deck/image10.png"
        alt="SOOPER key result with performance plots and obstacle avoidance trajectory"
      />
    </div>
  </div>
</section>

---

<section class="absolute inset-0 overflow-hidden bg-gradient-to-b from-white to-[#fafcfc] px-[4.15rem] py-[3.35rem] font-serif text-slate-900">
  <h1
    class="absolute left-[4.15rem] top-1/2 m-0 -translate-y-1/2 text-[4.2rem] font-medium leading-none tracking-normal"
  >
    Appendix &amp; Misc
  </h1>
</section>

---

<section class="absolute inset-0 overflow-hidden bg-gradient-to-b from-white to-[#fafcfc] px-[4.15rem] py-[3.35rem] font-serif text-slate-900">
  <h1 class="m-0 text-[3.15rem] font-medium leading-none tracking-normal">Libero -&gt; MJX</h1>

  <div class="mt-[2.3rem] grid h-[calc(100%-4.4rem)] grid-cols-[1.3fr_0.75fr] items-center gap-[2.7rem]">
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
</section>
