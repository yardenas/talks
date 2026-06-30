---
title: "Beyond Priors: Reinforcement Learning During Deployment"
fonts:
  sans: Lusitana
  serif: Lusitana
---

# Beyond Priors: Reinforcement Learning During Deployment
<div class="abs-bl mx-14 my-12 flex">
  <div class="ml-3 flex flex-col text-left">
    <div class="text-sm opacity-50">Google DeepMind, July 6, 2026</div>
  </div>
</div>

---

# Introduction
<style>
.intro-bio {
  @apply font-mono opacity-90;
}
.intro-life {
  margin-top: 4.15rem;
  height: 12.55rem;
}
.intro-life img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.intro-media {
  display: grid;
  grid-template-columns: 35% 10% 47%;
  column-gap: 0.38rem;
  align-items: start;
  margin-top: 0.15rem;
  padding: 0;
}
.intro-media-group {
  display: grid;
  gap: 0.28rem;
}
.intro-media-haifa {
  grid-template-columns: 1.35fr 1fr;
}
.intro-media-ethz {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.intro-card {
  box-sizing: border-box;
  height: 5.9rem;
  overflow: hidden;
  background: white;
  border-radius: 12px;
  border: 3px solid rgba(255,255,255,0.94);
  box-shadow: 0 12px 30px rgba(15,23,42,0.15);
}
.intro-card--map {
  height: 5.9rem;
}
.intro-card > img,
.intro-card > iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  object-fit: cover;
}
.intro-card--portrait > img {
  object-position: center 18%;
}
.intro-card--focus-right > img {
  object-position: 58% center;
}
.intro-profile-name {
  position: absolute;
  top: 12rem;
  right: 3rem;
  width: 10rem;
  text-align: center;
  font-size: 1.12rem;
  font-weight: 650;
  line-height: 1;
}
</style>

<div class="intro-bio mt-5 leading-snug">
  PhD student @ <a href="https://ai.ethz.ch/" target="_blank">ETH AI Center</a> & <a href="https://las.inf.ethz.ch/" target="_blank">Learning & Adaptive Systems</a>.<br>
  Working real-world reinforcement learning and robotics.
</div>

<div class="intro-life">
  <img src="/life.svg">
</div>

<div class="intro-media">
  <div class="intro-media-group intro-media-haifa">
    <div class="intro-card intro-card--map">
      <iframe
        src="https://www.google.com/maps?q=Bat%20Galim%2C%20Haifa%2C%20Israel&amp;z=12&amp;output=embed"
        title="Map of Bat Galim, Haifa"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div class="intro-card">
      <img src="/deck/batgalim.jpg" alt="Bat Galim">
    </div>
  </div>

  <div class="intro-media-group intro-media-temi">
    <div class="intro-card intro-card--portrait">
      <img src="/deck/temi1.png" alt="Temi">
    </div>
  </div>

  <div class="intro-media-group intro-media-ethz">
    <div class="intro-card">
      <img src="/deck/ch1.jpg" alt="Swiss landscape">
    </div>
    <div class="intro-card">
      <img src="/deck/ch.jpg" alt="Swiss landscape">
    </div>
    <div class="intro-card intro-card--focus-right">
      <img src="/deck/PXL_20230228_105749773.jpg" alt="Bat Galim, Haifa">
    </div>
    <div class="intro-card">
      <img src="/deck/roni.jpg" alt="Roni">
    </div>
  </div>
</div>

<img src="https://las.inf.ethz.ch/wp-content/uploads/2024/03/yardas.jpeg" class="rounded-full w-40 abs-tr mt-7 mr-12"/>
<div class="intro-profile-name">Yarden As</div>

---

# On the Path to AGI...
Fully autonomous robot leaerning

<div class="mt-[3.75rem] grid grid-cols-[1.02fr_0.98fr] items-stretch gap-[1.15rem]">
  <div class="flex min-h-[21.4rem] flex-col justify-center -translate-y-[0.45rem]">
    <div class="grid gap-[0.82rem]">
      <v-click>
        <div class="border-l-[3px] border-black pl-[0.85rem]">
          <div class="text-[1.18rem] font-semibold leading-tight">Humans collect data for robots? 🙃</div>
          <div class="mt-[0.42rem] text-[0.88rem] leading-tight opacity-80">
            Robots should assist humans, instead of relying on humans to produce their training data.
          </div>
        </div>
      </v-click>
      <v-click>
        <div class="border-l-[3px] border-black pl-[0.85rem]">
          <div class="text-[1.18rem] font-semibold leading-tight">Superhuman performance</div>
          <div class="mt-[0.42rem] text-[0.88rem] leading-tight opacity-80">Because we've seen that already over and over in other domains.</div>
        </div>
      </v-click>
      <v-click>
        <div class="border-l-[3px] border-black pl-[0.85rem]">
          <div class="text-[1.18rem] font-semibold leading-tight">Simulators are powerful, but...</div>
          <div class="mt-[0.42rem] text-[0.88rem] leading-tight opacity-80">
            Soft, contact-rich, human-facing tasks are hard to model faithfully.
          </div>
        </div>
      </v-click>
      <v-click>
        <div>
          <div class="mb-[0.22rem] text-center text-[1.08rem] leading-none">
            <KatexBlock expr="\Downarrow" />
          </div>
          <div class="border-l-[3px] border-black pl-[0.85rem]">
            <div class="text-[1.18rem] font-semibold leading-tight">Robots must obtain their own data in the real world</div>
            <div class="mt-[0.42rem] text-[0.88rem] leading-tight opacity-80">
              To go beyond their priors, robots need autonomous data collection and learning during deployment.
            </div>
          </div>
        </div>
      </v-click>
    </div>
  </div>

  <div class="flex min-h-[21.4rem] flex-col">
    <div class="mx-auto h-[19.55rem] w-[96%]">
      <img
        class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-cover shadow-none"
        src="/deck/GettyImages-2235362094.webp"
        alt="Workers collecting robot training data"
      />
    </div>
    <div class="takeaways-cheese-ref mt-[0.35rem] text-[0.58rem]">
      Source: <a href="https://restofworld.org/2026/china-robots-training-centers-workers/">Rest of World</a>
    </div>
  </div>
</div>

---

# Training in Simulation $\rightarrow$ Training in Reality

<div class="mt-[4.05rem] grid grid-cols-[1.43fr_0.67fr] items-start gap-[1.65rem]">
  <div>
    <div class="h-[17.7rem]">
      <img
        class="mx-auto block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
        src="/deck/sim-online.png"
        alt="Simulation and online reinforcement learning setup"
      />
    </div>
  </div>

  <div>
    <div class="flex h-[17.7rem] items-center justify-center">
      <img
        class="mx-auto block h-[16.2rem] w-[92%] rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
        src="/deck/compare-dr-all.svg"
        alt="Domain randomization sim-to-real gap comparison across all settings"
      />
    </div>
    <div class="mt-[0.35rem] flex items-center justify-center gap-[2.05rem] text-slate-900">
      <div class="flex items-center gap-[0.35rem]">
        <img
          class="h-[2rem] w-[2rem] rounded-full object-cover ring-[1px] ring-slate-300"
          src="/deck/dhruva-tirumala.jpeg"
          alt="Dhruva Tirumala"
        />
        <div class="text-[0.56rem] font-semibold leading-tight">Dhruva<br />Tirumala</div>
      </div>
      <div class="flex items-center gap-[0.35rem]">
        <img
          class="h-[2rem] w-[2rem] rounded-full object-cover ring-[1px] ring-slate-300"
          src="/deck/markus-wulfmeier.jpg"
          alt="Markus Wulfmeier"
        />
        <div class="text-[0.56rem] font-semibold leading-tight">Markus<br />Wulfmeier</div>
      </div>
      <div class="flex items-center gap-[0.35rem]">
        <img
          class="h-[2rem] w-[2rem] rounded-full object-cover ring-[1px] ring-slate-300"
          src="/deck/avatar_hu14165578538708235153.png"
          alt="Chenhao Li"
        />
        <div class="text-[0.56rem] font-semibold leading-tight">Chenhao<br />Li</div>
      </div>
      <div class="flex items-center gap-[0.35rem]">
        <img
          class="h-[2rem] w-[2rem] rounded-full object-cover ring-[1px] ring-slate-300"
          src="/deck/rene.jpeg"
          alt="René Zurbrügg"
        />
        <div class="text-[0.56rem] font-semibold leading-tight">René<br />Zurbrügg</div>
      </div>
    </div>
  </div>
</div>

<PaperTag conference="Preprint" year="" href="https://arxiv.org/abs/2602.20220" />

---

# Different Learning Regimes

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

<PaperTag conference="Preprint" year="" href="https://arxiv.org/abs/2602.20220" />

---

# Challenges in Sim-to-Online Transfer

<div class="mt-[5.5rem]">
  <div class="mx-auto mb-[0.4rem] w-[96%] text-center text-[0.92rem] font-semibold leading-tight text-slate-800">
    Compute Q function estimation error from each state in the replay buffer
  </div>

  <div class="mx-auto flex h-[15.4rem] w-[96%] items-center justify-center">
    <RccarQMcPlots />
  </div>

  <div class="mx-auto mt-[1.25rem] grid w-[94%] grid-cols-3 gap-[1.05rem] text-[0.85rem] leading-tight text-slate-900">
    <div class="border-l-[3px] border-black pl-[0.7rem]">
      <div class="font-semibold">Retain sim data if possible</div>
      <div class="mt-[0.25rem] opacity-75">Acts as a regularizer.</div>
    </div>
    <div class="border-l-[3px] border-black pl-[0.7rem]">
      <div class="font-semibold">Update actor less frequently</div>
    </div>
    <div class="border-l-[3px] border-black pl-[0.7rem]">
      <div class="font-semibold">Never discard off-policy data</div>
      <div class="mt-[0.25rem] opacity-75">Every real-world experiment counts.</div>
    </div>
  </div>
</div>

<PaperTag conference="Preprint" year="" href="https://arxiv.org/abs/2602.20220" />

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

<PaperTag conference="Preprint" year="" href="https://arxiv.org/abs/2602.20220" />

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
  <div class="relative h-[17.4rem] min-w-0">
    <div class="absolute -top-[2.05rem] left-0 right-0 text-center text-[1.25rem] font-bold leading-none text-[#111]">
      Sim policy
    </div>
    <SlidevVideo class="block h-full w-full rounded-[0.35rem] bg-slate-950 object-cover" autoplay controls muted volume="0">
      <source src="/videos/base-4.mp4" type="video/mp4" />
      <p>
        Your browser does not support videos. You may download it
        <a href="http://drive.google.com/file/d/1q2C8FrhnTGLXLsyA6-0JVwe2DRDAb72T/view">here</a>.
      </p>
    </SlidevVideo>
  </div>
  <div class="relative h-[17.4rem] min-w-0">
    <div class="absolute -top-[2.05rem] left-0 right-0 text-center text-[1.25rem] font-bold leading-none text-[#111]">
      Fine-tuned
    </div>
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

<PaperTag conference="Preprint" year="" href="https://arxiv.org/abs/2602.20220" />

---

# Recycling Off-Policy Data Accelerates Online Learning

<div class="mt-[2.0rem] flex h-[21.3rem] items-center justify-center">
  <img
    class="block h-full w-[94%] rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
    src="/deck/rae-all.svg"
    alt="Recycling off-policy data results"
  />
</div>

<PaperTag conference="Preprint" year="" href="https://arxiv.org/abs/2602.20220" />


---

# ⚠️ Robots May Break ⚠️

<!--
Previous result showed that we can continue training online after simulated pre-training, but can anyone guess how many robots got broken in the process?
-->

<div class="mx-auto mt-[2.0rem] flex h-[7.7rem] w-[92%] items-center justify-center">
  <img
    class="block h-full w-full object-contain"
    src="/deck/go1-crash.png"
    alt="Unitree Go1 robot after a crash"
  />
</div>

<div class="mx-auto mt-[1.4rem] grid w-[92%] grid-cols-2 gap-[1.2rem]">
  <div>
    <img
      class="block aspect-video w-full rounded-[0.35rem] object-cover"
      src="/deck/anymal.gif"
      alt="ANYmal robot crashing into an obstacle"
    />
  </div>
  <div>
    <img
      class="block aspect-video w-full rounded-[0.35rem] object-cover"
      src="/deck/nikita.gif"
      alt="Robot completing the course elegantly"
    />
  </div>
</div>


---

# Constrained Markov Decision Processes
A language for safe RL

<div class="relative mt-30 mx-auto h-[14rem] w-[96%] text-[1.22rem] leading-tight">
  <KatexBlock expr="\pi_c^* \in \arg \max_\pi \; \underbrace{\mathbb{E}_\pi \left[\sum_{t = 0}^{\infty} \gamma^t r(s_t, a_t)\right]}_{J_r(\pi,f)} \quad \text{ s.t. } \quad \underbrace{\mathbb{E}_\pi \left[\sum_{t = 0}^{\infty} \gamma^t c(s_t, a_t)\right]}_{J_c(\pi,f)} \leq d" />
</div>

---

# Learning Objective

<div class="relative mx-auto mt-34 h-[15rem] w-[96%] text-[1.12rem] leading-tight">
  <KatexBlock expr="R(N) = \sum_{n=1}^N \left( J_r(\pi_c^*,f) - J_r(\pi_n,f) \right) \quad \text{s.t.} \quad J_c(\pi_n,f) \leq d,\ \forall n \in \{1,\dots,N\}." />
  <svg
    class="pointer-events-none absolute left-[64.5%] top-[2.75rem] h-[4.8rem] w-[10.8rem] overflow-visible"
    viewBox="0 0 172 76"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M148 68C116 62 78 45 44 16"
      stroke="#000000"
      stroke-width="3.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M58 16L44 16L50 29"
      stroke="#000000"
      stroke-width="3.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="absolute left-[73.5%] top-[7.2rem] -translate-x-1/16 text-center text-[0.86rem] font-semibold leading-none">
    satisfy <span class="italic">during</span> learning <br>hard without any prior knowledge.
  </div>
  <div class="absolute left-[8%] top-[10.85rem] w-[78%] text-[1.02rem] font-semibold leading-tight text-black">
    <div class="mb-[0.35rem] text-left text-black">Prior work:</div>
    <ul class="m-0 list-disc space-y-[0.32rem] pl-[1.3rem]">
      <li>Constraint satisfaction, but no optimality.</li>
      <li>Optimality at convergence, but not during learning.</li>
    </ul>
  </div>
</div>

---

# Safety and Priors

<div class="mt-16 flex h-[18rem] items-center justify-center text-center">
  <div class="relative h-full w-full">
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="mx-auto max-w-[56rem] leading-tight">
        <div class="mt-8 text-[3.4rem] font-semibold">
          How to avoid unsafe situations without ever having experienced them?
        </div>
      </div>
    </div>
    <div v-click class="absolute inset-0 flex items-center justify-center bg-white">
      <div class="text-[3.4rem] font-semibold leading-tight">
        Simulate first!
      </div>
    </div>
  </div>
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
      <div class="text-[0.75rem] leading-tight">
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

<PaperTag conference="NeurIPS" year="2025" href="https://openreview.net/forum?id=Pe1ypX9gBO" />

---

# Zero-Shot Constraint Satisfaction on Real Hardware

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

<PaperTag conference="NeurIPS" year="2025" href="https://openreview.net/forum?id=Pe1ypX9gBO" />

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

# Closing the Loop

<div class="absolute right-[2.1rem] top-[4.1rem] z-20 flex items-center gap-[0.85rem] text-slate-900">
  <div class="flex items-center gap-[0.45rem]">
    <img
      class="h-[2.05rem] w-[2.05rem] rounded-full object-cover ring-[1px] ring-slate-300"
      src="/deck/manuel-wendl.jpeg"
      alt="Manuel Wendl"
    />
    <div class="text-[0.68rem] font-semibold leading-tight">Manuel Wendl</div>
  </div>
  <div class="flex items-center gap-[0.45rem]">
    <img
      class="h-[2.05rem] w-[2.05rem] rounded-full object-cover ring-[1px] ring-slate-300"
      src="/deck/manish.jpeg"
      alt="Manish Prajapat"
    />
    <div class="text-[0.68rem] font-semibold leading-tight">Manish<br />Prajapat</div>
  </div>
</div>

<div class="relative mt-[6.0rem] mx-auto h-[23rem] w-[94%]">
  <TrainingLoop />
</div>

---

# Challenges in Online Safe Learning

<div class="mx-auto mt-[1.9rem] h-[24.5rem] w-[58rem]">
  <SafeLearningChallenges />
</div>

<div class="mx-auto mt-[0.8rem] w-[54rem] text-center text-[1.35rem] font-bold leading-tight text-[#d52222]">
  Given the data we have, we can't say if the optimal policy satisfies the constraint
</div>

---

# Safe Exploration via Policy Priors
Online rollout


<div class="absolute right-[1.7rem] top-[3.2rem] h-[7rem] w-[18.5rem]">
  <TrainingLoop compact focus="collect" />
</div>

<div class="absolute left-[1.3rem] top-[7.7rem] z-10 w-[54%] text-[0.92rem] leading-tight">
  <KatexBlock expr="\Phi(s_t,a_t,c_{&lt;t},Q_{c,n}^{\hat{\pi}}) = c_{&lt;t} + \gamma^tQ_{c,n}^{\hat{\pi}}(s_t,a_t)" />
</div>

<div class="mt-[2.9rem] grid grid-cols-[1fr_0.9fr] items-center gap-[2.2rem]">
  <div class="h-[21.3rem] min-w-0">
    <img
      class="block h-full w-full object-contain"
      src="/deck/sooper_schematic_simplified.png"
      alt="SOOPER safe exploration schematic and constraint equation"
    />
  </div>
  <div class="h-[21.3rem]">
    <SlidevVideo class="block h-full w-full rounded-[0.35rem] bg-slate-950 object-contain" autoplay controls muted volume="0">
      <source src="/videos/sooper-demo.DWH0Dlo-.mp4" type="video/mp4" />
      <p>
        Your browser does not support videos. You may download it
        <a href="http://drive.google.com/file/d/1RsE_Z7R1L35YGs6OAk_kLwSXYu-kwE3m/view">here</a>.
      </p>
    </SlidevVideo>
  </div>
</div>

<PaperTag conference="ICLR" year="2026" href="https://openreview.net/forum?id=JC8xYAADHL" note="top 0.5%" />

---

# Simulated Planning
Reduction to “standard” MDPs

<div class="absolute right-[1.7rem] top-[3.2rem] h-[7rem] w-[18.5rem]">
  <TrainingLoop compact focus="plan" />
</div>

<div class="mt-[0.85rem] flex h-[23.6rem] w-full items-center justify-center">
  <img
    class="block h-full w-full object-contain"
    src="/deck/sooper_schematic.svg"
    alt="SOOPER unconstrained planning MDP schematic"
  />
</div>

<PaperTag conference="ICLR" year="2026" href="https://openreview.net/forum?id=JC8xYAADHL" note="top 0.5%" />

---

# Efficient Online Learning
Regret decomposition

<div class="relative min-h-[22rem] w-full">
  <div class="mx-auto flex min-h-[22rem] w-full items-center justify-center">
    <div class="w-full text-center text-[1.22rem] leading-none">
      <KatexBlock expr="R(N) \leq \underbrace{\sum_{n=1}^N \left(J_{\tilde r}(\pi^*,f) - J_{\tilde r}(\pi_n,f)\right)}_{\text{“optimality under the learned model”}} + \underbrace{\sum_{n=1}^N \left(J_r(\pi_c^*,f) - J_r(\bar{\pi}_{c,n}^*,f)\right)}_{\text{“price of safety”}}" />
      <div class="mt-[1.15rem] translate-x-[-6.2rem] text-[0.78rem] font-semibold leading-none opacity-65">
        <a href="https://arxiv.org/abs/2006.12466" target="_blank" rel="noopener noreferrer">
          Kakade et al. (2020)
        </a>
      </div>
    </div>
  </div>

  <div class="absolute bottom-[0.25rem] right-[0.8rem] h-[7.6rem] w-[12.7rem]">
    <svg
      class="pointer-events-none absolute -left-[2.75rem] top-[-1.15rem] h-[4.0rem] w-[4.4rem] overflow-visible"
      viewBox="0 0 98 65"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <marker
          id="regret-safety-arrowhead"
          viewBox="0 0 10 10"
          markerWidth="7"
          markerHeight="7"
          refX="8.4"
          refY="5"
          orient="auto"
        >
          <path d="M1.5 1.5L8.5 5L1.5 8.5" stroke="#111111" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </marker>
      </defs>
      <path
        d="M8 7C34 18 58 32 92 54"
        stroke="#111111"
        stroke-width="3.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        marker-end="url(#regret-safety-arrowhead)"
      />
    </svg>
    <img
      class="block h-full w-full object-contain"
      src="/deck/sooper_schematic_simplified.png"
      alt="SOOPER safe exploration schematic and constraint equation"
    />
  </div>
</div>

<PaperTag conference="ICLR" year="2026" href="https://openreview.net/forum?id=JC8xYAADHL" note="top 0.5%" />

---

# Hardware Experiments

<div class="mt-[3.0rem] grid grid-cols-[0.72fr_1.28fr] items-center gap-[1.9rem]">
  <div class="flex h-[21.5rem] items-center justify-center">
    <div class="relative h-full aspect-[138.74227/185.78385]">
      <img
        class="block h-full w-full object-contain"
        src="/deck/hardware.svg"
        alt="Real robotic system used for SOOPER experiments"
      />
      <svg class="pointer-events-none absolute inset--8 h-full w-full overflow-visible" viewBox="0 0 138.74227 185.78385" aria-hidden="true">
        <defs>
          <marker id="unsafe-arrow" markerWidth="5" markerHeight="5" refX="4.35" refY="2.5" orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 5 2.5 L 0 5 z" fill="#d52222" />
          </marker>
        </defs>
        <text x="105" y="119" fill="#d52222" font-family="Inter, Arial, sans-serif" font-size="4.2" font-weight="700">unsafe</text>
        <path d="M 105 119 C 98 123 92 126 84 140" fill="none" stroke="#d52222" stroke-width="1.1" stroke-linecap="round" marker-end="url(#unsafe-arrow)" />
      </svg>
    </div>
  </div>
  <div class="h-[21.5rem]">
    <SlidevVideo class="block h-full w-full rounded-[0.35rem] bg-slate-950 object-contain" autoplay controls loop muted volume="0">
      <source src="/videos/timelapse.BoG5wRG9.mp4" type="video/mp4" />
    </SlidevVideo>
  </div>
</div>

<PaperTag conference="ICLR" year="2026" href="https://openreview.net/forum?id=JC8xYAADHL" note="top 0.5%" />

---
class: takeaways-slide
---

# Takeaways

<div class="takeaways-profile">
  <div class="takeaways-profile-person">
    <img
      class="takeaways-profile-img"
      src="/deck/manuel-wendl.jpeg"
      alt="Manuel Wendl"
    />
    <div class="takeaways-profile-name">Manuel Wendl</div>
  </div>
  <div class="takeaways-profile-person">
    <img
      class="takeaways-profile-img"
      src="/deck/manish.jpeg"
      alt="Manish Prajapat"
    />
    <div class="takeaways-profile-name">Manish<br />Prajapat</div>
  </div>
</div>

<div class="takeaways-cheese-figure">
  <img class="takeaways-cheese" src="/deck/Swiss_cheese_model_textless.svg" alt="Swiss cheese model of layered safety barriers" />
  <div class="takeaways-cheese-ref">
    Source: <a href="https://en.wikipedia.org/wiki/Swiss_cheese_model">Wikipedia, Swiss cheese model</a>
  </div>
</div>

1. Good priors are critical for safe online learning
2. Swiss cheese model for safety🇨🇭
3. Optimal performance, _even when exploring under constraints_

<style>
.takeaways-slide ol {
  margin-top: 5.4rem;
  width: 52%;
  font-size: 1.55rem;
  line-height: 1.2;
}

.takeaways-slide li {
  margin-bottom: 2rem;
  padding-left: 0.35rem;
}

.takeaways-cheese-figure {
  position: absolute;
  right: 1.8rem;
  top: 7.6rem;
  width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.32rem;
}

.takeaways-cheese {
  width: 100%;
}

.takeaways-cheese-ref {
  width: 100%;
  line-height: 1;
  text-align: center;
}

.takeaways-profile {
  position: absolute;
  right: 2.1rem;
  top: 4.25rem;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  color: #0f172a;
}

.takeaways-profile-person {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.takeaways-profile-img {
  height: 2.05rem;
  width: 2.05rem;
  border-radius: 9999px;
  object-fit: cover;
  box-shadow: 0 0 0 1px #cbd5e1;
}

.takeaways-profile-name {
  font-size: 0.68rem;
  font-weight: 600;
  line-height: 1.1;
}
</style>

<PaperTag conference="ICLR" year="2026" href="https://openreview.net/forum?id=JC8xYAADHL" note="top 0.5%" />

---
layout: center
class: text-center
---

<div class="flex flex-col items-center justify-center">
  <div class="text-[3.9rem] font-semibold leading-tight">
    More Expressive Policy Classes
  </div>
  <div class="mt-10 text-[2.35rem] font-semibold leading-tight opacity-70">
    (online RL with flow matching models)
  </div>
</div>

<PaperTag conference="Initial results" year="" />

---
layout: center
class: text-center
---

<div class="flex flex-col items-center justify-center">
  <v-switch at="0">
    <template #0>
      <div class="text-[3.9rem] font-semibold leading-tight">
        Offline RL is Hard!
      </div>
    </template>
    <template #1>
      <div class="text-[3.9rem] font-semibold leading-tight">
        How can simulators accelerate learning from demonstrations?
      </div>
    </template>
  </v-switch>
</div>

<PaperTag conference="Initial results" year="" />

---

# Dyna Expansion From Demonstration States
Simulation can start from arbitrary states

<div class="mx-auto mt-[1.5rem] h-[25rem] w-[58rem]">
  <DemoSimulatorExpansion />
</div>

<PaperTag conference="Initial results" year="" />

---

# Soft Action Targets

<PaperTag conference="Initial results" year="" />

<div class="relative mx-auto mt-[4.45rem] h-[19.4rem] w-[54rem] text-slate-900">
  <svg class="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 864 310" fill="none" aria-hidden="true">
    <defs>
      <marker id="acfql-black-arrow" viewBox="0 0 10 10" markerWidth="8" markerHeight="8" refX="8.6" refY="5" orient="auto">
        <path d="M1.5 1.5L8.5 5L1.5 8.5" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </marker>
    </defs>
    <path d="M174 113H224" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" marker-end="url(#acfql-black-arrow)" />
    <path d="M403 113H453" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" marker-end="url(#acfql-black-arrow)" />
    <path d="M632 113H682" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" marker-end="url(#acfql-black-arrow)" />
  </svg>

  <div class="absolute left-0 top-[0.8rem] h-[10.4rem] w-[10.6rem] rounded-[0.35rem] border-[2px] border-slate-900 bg-white px-[0.65rem] py-[0.65rem]">
    <div class="text-[0.78rem] font-semibold leading-tight">1. Proposal actions</div>
    <div class="relative mx-auto mt-[0.72rem] h-[4.0rem] w-[7.6rem]">
      <div class="absolute left-[3.55rem] top-[1.65rem] h-[0.9rem] w-[0.9rem] rounded-full bg-slate-900"></div>
      <div class="absolute left-[0.5rem] top-[0.5rem] h-[0.62rem] w-[0.62rem] rounded-full bg-slate-400"></div>
      <div class="absolute left-[1.2rem] top-[2.75rem] h-[0.62rem] w-[0.62rem] rounded-full bg-slate-400"></div>
      <div class="absolute left-[3.1rem] top-[0.05rem] h-[0.62rem] w-[0.62rem] rounded-full bg-slate-400"></div>
      <div class="absolute left-[5.25rem] top-[0.75rem] h-[0.62rem] w-[0.62rem] rounded-full bg-emerald-600"></div>
      <div class="absolute left-[5.85rem] top-[2.85rem] h-[0.62rem] w-[0.62rem] rounded-full bg-slate-400"></div>
      <div class="absolute left-[3.6rem] top-[3.15rem] h-[0.62rem] w-[0.62rem] rounded-full bg-slate-400"></div>
    </div>
    <div class="mt-[0.38rem] text-center text-[0.48rem] font-semibold uppercase tracking-[0.08em] text-slate-500">
      from the flow actor
    </div>
  </div>

  <div class="absolute left-[14.3rem] top-[0.8rem] h-[10.4rem] w-[10.6rem] rounded-[0.35rem] border-[2px] border-slate-900 bg-white px-[0.65rem] py-[0.65rem]">
    <div class="text-[0.78rem] font-semibold leading-tight">2. Score with critic</div>
    <div class="mx-auto mt-[0.62rem] flex h-[4.4rem] w-[7.1rem] items-end justify-center gap-[0.32rem] border-b-[2px] border-l-[2px] border-slate-900 pb-[0.18rem] pl-[0.25rem]">
      <span class="block h-[1.0rem] w-[0.66rem] bg-slate-400"></span>
      <span class="block h-[2.8rem] w-[0.66rem] bg-slate-700"></span>
      <span class="block h-[1.55rem] w-[0.66rem] bg-slate-500"></span>
      <span class="block h-[3.9rem] w-[0.66rem] bg-emerald-600"></span>
      <span class="block h-[2.25rem] w-[0.66rem] bg-slate-600"></span>
    </div>
    <div class="mt-[0.28rem] text-center text-[0.6rem] leading-none text-slate-600">
      <KatexBlock expr="Q(s,a_j)" />
    </div>
  </div>

  <div class="absolute left-[28.6rem] top-[0.8rem] h-[10.4rem] w-[10.6rem] rounded-[0.35rem] border-[2px] border-slate-900 bg-white px-[0.65rem] py-[0.65rem]">
    <div class="text-[0.78rem] font-semibold leading-tight">3. Importance weights</div>
    <div class="mt-[0.75rem] text-center text-[0.82rem] leading-tight">
      <KatexBlock expr="w_j\propto \exp(Q(s,a_j)/\eta)" />
    </div>
    <div class="mx-auto mt-[0.55rem] grid h-[2.3rem] w-[7.1rem] grid-cols-5 items-end gap-[0.32rem]">
      <span class="block h-[0.38rem] bg-slate-300"></span>
      <span class="block h-[0.85rem] bg-slate-500"></span>
      <span class="block h-[0.48rem] bg-slate-400"></span>
      <span class="block h-[2.15rem] bg-emerald-600"></span>
      <span class="block h-[0.65rem] bg-slate-500"></span>
    </div>
  </div>

  <div class="absolute left-[42.9rem] top-[0.8rem] h-[10.4rem] w-[10.6rem] rounded-[0.35rem] border-[2px] border-slate-900 bg-white px-[0.65rem] py-[0.65rem]">
    <div class="text-[0.78rem] font-semibold leading-tight">4. Weighted flow matching</div>
    <div class="mt-[0.56rem] text-[0.5rem] font-semibold uppercase tracking-[0.08em] text-slate-500">before</div>
    <div class="mt-[0.18rem] flex h-[1.15rem] items-end justify-center gap-[0.32rem]">
      <span class="block h-[0.62rem] w-[0.66rem] bg-slate-300"></span>
      <span class="block h-[0.62rem] w-[0.66rem] bg-slate-300"></span>
      <span class="block h-[0.62rem] w-[0.66rem] bg-slate-300"></span>
      <span class="block h-[0.62rem] w-[0.66rem] bg-slate-300"></span>
      <span class="block h-[0.62rem] w-[0.66rem] bg-slate-300"></span>
    </div>
    <div class="mx-auto mt-[0.35rem] h-[0.58rem] w-[0.58rem] rotate-45 border-b-[3px] border-r-[3px] border-slate-900"></div>
    <div class="mt-[0.12rem] text-[0.5rem] font-semibold uppercase tracking-[0.08em] text-slate-500">after</div>
    <div class="mt-[0.16rem] flex h-[1.75rem] items-end justify-center gap-[0.32rem]">
      <span class="block h-[0.32rem] w-[0.66rem] bg-slate-300"></span>
      <span class="block h-[0.70rem] w-[0.66rem] bg-slate-500"></span>
      <span class="block h-[0.40rem] w-[0.66rem] bg-slate-400"></span>
      <span class="block h-[1.55rem] w-[0.66rem] bg-emerald-600"></span>
      <span class="block h-[0.55rem] w-[0.66rem] bg-slate-500"></span>
    </div>
  </div>

</div>

---

# Odyn: Offline-to-Online Dyna
Manipulation

<PaperTag conference="Initial results" year="" />

<div class="mx-auto mt--8 flex w-[46rem] flex-col gap-[0.55rem]">
  <PuzzleCubeBonAblationReveal
    class="mx-auto block h-[12.25rem] w-[44rem] rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
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

# Odyn: Offline-to-online Dyna
Locomotion

<PaperTag conference="Initial results" year="" />

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

# Future & Ongoing Work
VLA policy extraction

<div class="mt-[2.45rem] grid grid-cols-[18.5rem_1fr] items-center gap-[2.2rem]">
<div class="min-w-0 text-center text-[0.86rem] leading-tight">
  <KatexBlock expr="\begin{gathered}a_K=\operatorname{ODE}_K(v_\theta,s,a_0,0,1)\\[0.45em]\text{where}\quad a_{k+1}=a_k+\frac{1}{K}v_{\theta}(s,a_k,\tau_k)\\[0.3em]\tau_k=\frac{k}{K}\\[0.55em]\max_{\theta}\;\mathbb{E}_{s\sim\mathcal{D},\,a_0\sim\mathcal{N}(0,I)}\left[Q_{\phi}(s,a_K)\right]\end{gathered}" />
  <div class="mx-auto mt-[1.15rem] w-[17rem] text-[0.88rem] font-semibold leading-tight text-slate-700">
    Can we backprop directly from Q instead of using distillation?
  </div>
</div>

<div class="h-[17.4rem] min-w-0">
  <img
    class="block h-full w-full rounded-[0.35rem] object-contain"
    src="/videos/560167437-1f72ccca-5b90-4d6c-86c5-a423b686314c.gif"
    alt="Q-guided flow matching rollout"
  />
</div>

</div>


---

# Future & Ongoing Work
Learning without manual resets

<div class="mt-[1.4rem] flex flex-col items-center gap-[1.35rem]">
  <img
    class="block h-[14.8rem] w-[76%] object-contain"
    src="/deck/recovery.png"
    alt="Recovery effort examples for humanoid poses"
  />

  <div class="w-[92%] text-center text-[0.96rem] leading-tight">
    <KatexBlock expr="V_{\mathcal{R}}^{\pi_r}(s) := \mathbb{E}_{\pi_r}\left[\sum_{t=0}^{\infty} -\mathbf{1}\{s_t \notin \mathcal{R}\}\,\big|\,s_0=s\right]" />
  </div>
</div>


---
layout: cover
---

<div class="absolute inset-0 bg-white"></div>

<div class="absolute bottom-0 right-0 top-0 w-[43%] overflow-hidden border-l border-slate-200 bg-white">
  <img
    src="/deck/london-tube-abstract.svg"
    class="absolute left-0 top-[-4.4rem] h-[112%] w-full object-cover"
    style="object-position: 58% center;"
    alt=""
  />
</div>

<div class="absolute left-[0.85rem] top-[1.25rem] z-10 w-[32.5rem] text-slate-950">
  <h1 class="m-0 text-[2.5rem] font-semibold leading-none">Thank you. Questions?</h1>

  <div class="mt-[0.55rem]">
    <ul class="m-0 list-disc space-y-[0.55rem] pl-[1.45rem] text-[1.24rem] leading-tight">
      <li v-click>
        Optimal performance can be obtained even under constrained exploration.
      </li>
      <li v-click>
        All prior types are useful: simulation and demonstrations. How can we scale their usage in synergy?
        Simple methods tend to scale better.
      </li>
      <li v-click>
        Still, in the long run, robots must <em>collect their own</em> training data, extending beyond priors.
      </li>
      <li v-click>
        Off-policy RL might play a major role towards this vision.
      </li>
    </ul>
  </div>
</div>

<div class="absolute right-[2rem] bottom-[0.75rem] z-20 flex flex-col items-center">
  <img
    src="https://las.inf.ethz.ch/wp-content/uploads/2024/03/yardas.jpeg"
    class="h-40 w-40 rounded-full object-cover shadow-lg ring-2 ring-black/15"
    alt="Yarden As"
  />
  <div class="mt-[0.65rem] text-center text-[1.12rem] font-semibold leading-none text-slate-950">Yarden As</div>
</div>

---
layout: cover
---
# Appendix & Misc

---

# Odyn: Offline-to-online Dyna
MuJoCo Wrap as simulator

<PaperTag conference="Initial results" year="" />

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

# Flow Matching Recap

<div class="mt-[4.1rem] grid grid-cols-2 items-start gap-[2.2rem]">
  <div class="min-w-0 text-center">
    <div class="mb-[1.05rem] text-[1.3rem] font-semibold leading-none">Training</div>
    <div class="text-[0.82rem] leading-tight">
      <KatexBlock expr="\begin{gathered}(s,a_1)\sim\mathcal{D},\quad a_0\sim\mathcal{N}(0,I),\quad t\sim\mathrm{Uniform}(0,1)\\[0.55em]a_t=(1-t)a_0+t a_1,\quad u_t=a_1-a_0\\[0.65em]\min_{\theta}\;\mathbb{E}\left[\left\|v_{\theta}(s,a_t,t)-u_t\right\|_2^2\right]\end{gathered}" />
    </div>
  </div>

  <div class="min-w-0 text-center">
    <div class="mb-[1.05rem] text-[1.3rem] font-semibold leading-none">Inference</div>
    <div class="text-[0.82rem] leading-tight">
      <KatexBlock expr="\begin{gathered}a_0\sim\mathcal{N}(0,I),\quad a_K=\operatorname{ODE}_K(v_\theta,s,a_0,0,1)\\[0.55em]\text{where}\quad a_{k+1}=a_k+\frac{1}{K}v_{\theta}(s,a_k,\tau_k)\\[0.35em]\tau_k=\frac{k}{K}\end{gathered}" />
    </div>
  </div>
</div>

<div class="mt-[4.85rem] text-center text-[1.75rem] font-semibold leading-none">
  Off-policy RL?
</div>

<PaperTag conference="Initial results" year="" />

---

# Flow Matching for Off-Policy RL


<div class="relative mt-[7.25rem] grid grid-cols-2 gap-[1.25rem]">
  <div class="flex min-h-[9.0rem] min-w-0 flex-col border-l-[3px] border-slate-900 py-[0.3rem] pl-[0.8rem]">
    <div class="text-[1.15rem] font-semibold leading-none">AWR: selective BC</div>
    <div class="mt-[0.95rem] text-[0.6rem] leading-tight">
      <KatexBlock expr="\begin{gathered}\bar{\theta}\leftarrow\arg\min_{\theta}\;\mathbb{E}_{(s,a_1)\sim\mathcal{D},\,a_0,\,t}\left[\exp\!\left(\frac{Q_\phi(s,a_1)-V^{\bar{\pi}}(s)}{\beta}\right)\left\|v_\theta(s,a_t,t)-(a_1-a_0)\right\|_2^2\right]\\[0.55em]a_t=(1-t)a_0+t a_1,\quad a_0\sim\mathcal{N}(0,I),\quad t\sim\mathrm{Uniform}(0,1)\\[0.55em]\bar{\pi}(\cdot\mid s)=\operatorname{ODE}(v_{\bar{\theta}},s,\epsilon,0,1),\quad \epsilon\sim\mathcal{N}(0,I)\end{gathered}" />
    </div>
  </div>

  <svg class="pointer-events-none absolute left-[7%] top-[8.65rem] h-[3.5rem] w-[86%] overflow-visible" viewBox="0 0 740 150" fill="none" aria-hidden="true">
    <defs>
      <marker
        id="awr-mpo-arrowhead"
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
      d="M42 24C172 136 568 136 698 24"
      stroke="black"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
      marker-end="url(#awr-mpo-arrowhead)"
    />
  </svg>

  <div class="flex min-h-[9.0rem] min-w-0 flex-col border-l-[3px] border-slate-900 py-[0.3rem] pl-[0.8rem]">
    <div class="text-[1.15rem] font-semibold leading-none">MPO: policy improvement</div>
    <div class="mt-[0.95rem] text-[0.6rem] leading-tight">
      <KatexBlock expr="\begin{gathered}q(a\mid s)\propto \bar{\pi}(a\mid s)\exp\!\left(\frac{Q_\phi(s,a)}{\eta^\star}\right)\\[0.65em]\theta\leftarrow\arg\min_{\theta}\;\mathbb{E}_{s\sim\mathcal{D}}\;\mathbb{E}_{a_1\sim q(\cdot\mid s),\,a_0,\,t}\left[\left\|v_\theta(s,a_t,t)-(a_1-a_0)\right\|_2^2\right]\\[0.55em]a_t=(1-t)a_0+t a_1,\quad a_0\sim\mathcal{N}(0,I),\quad t\sim\mathrm{Uniform}(0,1)\end{gathered}" />
    </div>
  </div>
</div>


<PaperTag conference="Initial results" year="" />

---

# Number of Simulated Environment Matters


<div class="mt-[3.9rem] flex h-[20.8rem] items-center justify-center">
  <img
    class="block h-full w-[40%] rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
    src="/deck/compare-dr.svg"
    alt="Domain randomization comparison showing the number of simulated environments matters"
  />
</div>

<PaperTag conference="Preprint" year="" href="https://arxiv.org/abs/2602.20220" />

---

# Tradeoffs in Massively-Parallel Off-Policy Learning
Runtime vs. Parallel Environments vs. Performance

<div class="mx-auto mt-[0.55rem] grid h-[22rem] w-[37.2rem] grid-cols-[2.1rem_16.85rem_16.85rem] grid-rows-[1.05rem_10.1rem_10.1rem] items-center gap-x-[0.7rem] gap-y-[0.35rem]">
  <div></div>
  <div class="text-center text-[0.72rem] font-semibold text-slate-700">Performance</div>
  <div class="text-center text-[0.72rem] font-semibold text-slate-700">Runtime</div>

  <div class="text-right text-[0.68rem] font-semibold leading-tight text-slate-700">Franka</div>
  <img
    class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
    src="/deck/franka-sweep-performance.svg"
    alt="Franka performance sweep over eta and number of transitions"
  />
  <img
    class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
    src="/deck/franka-sweep-runtime.svg"
    alt="Franka runtime sweep over eta and number of transitions"
  />

  <div class="text-right text-[0.68rem] font-semibold leading-tight text-slate-700">Go1</div>
  <img
    class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
    src="/deck/go1-sweep-performance.svg"
    alt="Go1 performance sweep over eta and number of transitions"
  />
  <img
    class="block h-full w-full rounded-[0.35rem] border-0 bg-transparent object-contain shadow-none"
    src="/deck/go1-sweep-runtime.svg"
    alt="Go1 runtime sweep over eta and number of transitions"
  />
</div>

<PaperTag conference="Preprint" year="" href="https://arxiv.org/abs/2602.20220" />

---

# SOOPER Works in Practice

<div class="mx-auto mt-[1.7rem] flex h-[23rem] w-[96%] items-center justify-center">
  <img
    class="block h-full w-full object-contain"
    src="/deck/main_results.svg"
    alt="SOOPER practice results"
  />
</div>

<PaperTag conference="ICLR" year="2026" href="https://openreview.net/forum?id=JC8xYAADHL" note="top 0.5%" />

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
