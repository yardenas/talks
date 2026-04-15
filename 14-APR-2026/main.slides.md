---
title: Markov Decision Processes in 15 Minutes
fonts:
  sans: Lusitana
  serif: Lusitana
---

<h1>Markov Decision Processes<br>in 15 Minutes</h1>
<div class="my-10 grid grid-cols-[40px_1fr] w-min gap-y-4 items-center my-20">
  <carbon-logo-x class="opacity-50"/>
  <div><a href="https://twitter.com/yarden_as" target="_blank" class="no-underline">yarden_as</a></div>
  <ri-user-3-line class="opacity-50"/>
  <div><a href="https://yas.pub" target="_blank">yas.pub</a></div>
</div>
<div class="abs-bl mx-14 my-12 flex">
  <div class="ml-3 flex foex-col text-left">
    <div class="text-sm opacity-50">April 15th, 2026</div>
  </div>
</div>

---
layout: full
---

<div class="absolute overflow-hidden bg-white text-slate-900" style="inset: -8%;">
  <div
    class="absolute inset-0"
    style="background: radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 28%, rgba(248,250,252,0.95) 100%);"
  ></div>

  <img
    src="/Laura_Chaubard_%26_Yann_Le_Cun_-_2024_(53814052697)_(cropped).jpg"
    alt="Laura Chaubard and Yann Le Cun"
    style="position: absolute; top: 1%; left: 6%; width: 22%; height: 45%; object-fit: cover; transform: rotate(-8deg); border-radius: 30px; border: 10px solid rgba(255,255,255,0.92); box-shadow: 0 24px 60px rgba(15,23,42,0.12); z-index: 1;"
  />
  <img
    src="/Sam_Altman_TechCrunch_SF_2019_Day_2_Oct_3_(cropped_3).jpg"
    alt="Sam Altman"
    style="position: absolute; top: 1%; right: 7%; width: 21%; height: 45%; object-fit: cover; transform: rotate(10deg); border-radius: 30px; border: 10px solid rgba(255,255,255,0.92); box-shadow: 0 24px 60px rgba(15,23,42,0.12); z-index: 1;"
  />
  <img
    src="/dario-amodei-900x900-2.jpg"
    alt="Dario Amodei"
    style="position: absolute; right: 6%; bottom: 4%; width: 21%; height: 35%; object-fit: cover; transform: rotate(-7deg); border-radius: 30px; border: 10px solid rgba(255,255,255,0.92); box-shadow: 0 24px 60px rgba(15,23,42,0.12); z-index: 1;"
  />
  <img
    src="/1687642392390.jpeg"
    alt="Artificial intelligence illustration"
    style="position: absolute; left: 8%; bottom: 3%; width: 24%; height: 22%; object-fit: cover; transform: rotate(-11deg); border-radius: 28px; border: 10px solid rgba(255,255,255,0.9); box-shadow: 0 20px 55px rgba(15,23,42,0.1); z-index: 1;"
  />
  <img
    src="/download.jpeg"
    alt="Artificial intelligence visual"
    style="position: absolute; left: 28%; top: 15%; width: 12%; height: 14%; object-fit: cover; transform: rotate(11deg); border-radius: 24px; border: 8px solid rgba(255,255,255,0.92); box-shadow: 0 16px 40px rgba(15,23,42,0.11); z-index: 2;"
  />
  <img
    src="/images.png"
    alt="Artificial intelligence icon"
    style="position: absolute; right: 28%; top: 20%; width: 12%; height: 14%; object-fit: cover; transform: rotate(-9deg); border-radius: 24px; border: 8px solid rgba(255,255,255,0.92); box-shadow: 0 16px 40px rgba(15,23,42,0.11); z-index: 2;"
  />
  <img
    src="/images%20(1).png"
    alt="Artificial intelligence icon"
    style="position: absolute; right: 18%; bottom: 17%; width: 11%; height: 13%; object-fit: cover; transform: rotate(13deg); border-radius: 24px; border: 8px solid rgba(255,255,255,0.92); box-shadow: 0 16px 40px rgba(15,23,42,0.11); z-index: 2;"
  />

  <div
    style="position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.24) 22%, rgba(255,255,255,0.58) 38%, rgba(255,255,255,0.82) 52%, rgba(248,250,252,0.9) 100%); z-index: 4;"
  ></div>

  <div
    style="position: absolute; left: 50%; top: 50%; width: 74%; transform: translate(-50%, -50%); text-align: center; z-index: 10;"
  >
    <h1 style="margin: 0; font-size: 4.35rem; line-height: 0.92; letter-spacing: -0.06em; white-space: nowrap; text-shadow: 0 10px 28px rgba(255,255,255,0.95), 0 2px 10px rgba(15,23,42,0.1);">
      “Artificial Intelligence“
    </h1>
  </div>
</div>

---
layout: statement
---

# Artificial Intelligence <br> $\approx$ <br> Learning to solve sequential decision-making problems

---
layout: quote
---

# Markov Decision Processes: the Language of Sequential Decision-Making

<!-- MDPs describe sequential decisions under consequences and uncertainty. -->
---

# Cliff Daredevil
In pairs...

<div class="mt-8 flex w-full justify-center">
  <img
    class="h-auto w-80 max-w-full"
    src="/qrcode.svg"
    alt="QR code for hands-on activity"
  />
</div>

https://tinyurl.com/mpj575pa

<!-- 
1. what does the robot need to know?
2. If you were controlling this robot yourself, would you take the short path near the cliff, or the longer safer path?
 -->

---
layout: cover
---

# Consolidation

<!-- 
1. MDPs let us describe sequential decision problems in terms of states, actions, rewards, and uncertain transitions.
In the cliff world, the best policy depends not only on distance to the goal, but also on the probability and severity of bad outcomes.
2. How does it relate to LLMs? For that you will have to take the course :)
 -->

---
layout: center
---

# Thank You



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
