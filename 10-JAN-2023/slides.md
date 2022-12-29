---
layout: cover
download: true
highlighter: shiki
info: |
  ## Safe Adaptation

  Kickoff meeting for the Safe Adaptation project.

  Yarden As
title: Learn to Learn Safely
---

# Learn to Learn Safely

<div class="uppercase text-sm tracking-widest">
Yarden As
</div>

<div class="abs-bl mx-14 my-12 flex">
  <div class="ml-3 flex flex-col text-left">
    <div class="text-sm opacity-50">Jan. 10th 2023</div>
  </div>
</div>


---

# Yarden As

<div class="leading-8 opacity-80">
PhD student @ <a href="https://las.inf.ethz.ch/" target="_blank">Learning & Adaptive Systems</a>.<br>
Working on safe reinforcement learning.<br>
</div>

<div class="my-10 grid grid-cols-[40px,1fr] w-min gap-y-4">
  <ri-github-line class="opacity-50"/>
  <div><a href="https://github.com/yardenas" target="_blank">yardenas</a></div>
  <ri-twitter-line class="opacity-50"/>
  <div><a href="https://twitter.com/yarden_as" target="_blank">yarden_as</a></div>
</div>

<img src="https://media.licdn.com/dms/image/D4D03AQHADuIJ4YvLbQ/profile-displayphoto-shrink_800_800/0/1667507229540?e=1677715200&v=beta&t=xuWobJE3km97hXPcP0-zOrCN3VyVwg0gFr8wOjGdpPU" class="rounded-full w-40 abs-tr mt-16 mr-12"/>


---

# Taxonomy of Robotic Guided Spine Surgery

<v-clicks>

<div class="absolute w-full mt-5">
<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6844237/" target="_blank">
```mermaid
graph TB
    can(Computer-Assisted Navigation) --> trad(Traditional)
    can --> shared(Robotic, shared-control)
    shared --> open-loop("Only preoperative (open-loop)")
    open-loop --> spine-assist(Mazor SpineAssist)
    shared --> closed-loop("Pre & intraoperative (closed-loop)")
    closed-loop --> mazor(Mazor Renaissance & X)
    closed-loop --> rosa(Rosa Spine)
    closed-loop --> globus(Excelsius)
    style trad stroke:#38D9A9,stroke-width:3.5px
```
</a>
</div>

<div class="absolute w-full mt-5">
<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6844237/" target="_blank">
```mermaid
graph TB
    can(Computer-Assisted Navigation) --> trad(Traditional)
    can --> shared(Robotic, shared-control)
    shared --> open-loop("Only preoperative (open-loop)")
    open-loop --> spine-assist(Mazor SpineAssist)
    shared --> closed-loop("Pre & intraoperative (closed-loop)")
    closed-loop --> mazor(Mazor Renaissance & X)
    closed-loop --> rosa(Rosa Spine)
    closed-loop --> globus(Excelsius)
    style shared stroke:#38D9A9,stroke-width:3.5px
```
</a>
</div>

<div class="absolute w-full mt-5">
<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6844237/" target="_blank">
```mermaid
graph TB
    can(Computer-Assisted Navigation) --> trad(Traditional)
    can --> shared(Robotic, shared-control)
    shared --> open-loop("Only preoperative (open-loop)")
    open-loop --> spine-assist(Mazor SpineAssist)
    shared --> closed-loop("Pre & intraoperative (closed-loop)")
    closed-loop --> mazor(Mazor Renaissance & X)
    closed-loop --> rosa(Rosa Spine)
    closed-loop --> globus(Excelsius)
    style open-loop stroke:#38D9A9,stroke-width:3.5px
```
</a>
</div>

<div class="absolute w-full mt-5">
<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6844237/" target="_blank">
```mermaid
graph TB
    can(Computer-Assisted Navigation) --> trad(Traditional)
    can --> shared(Robotic, shared-control)
    shared --> open-loop("Only preoperative (open-loop)")
    open-loop --> spine-assist(Mazor SpineAssist)
    shared --> closed-loop("Pre & intraoperative (closed-loop)")
    closed-loop --> mazor(Mazor Renaissance & X)
    closed-loop --> rosa(Rosa Spine)
    closed-loop --> globus(Excelsius)
    style closed-loop stroke:#38D9A9,stroke-width:3.5px
```
</a>
</div>

</v-clicks>


---
layout: two-cols
---

# Example

<v-clicks>

- Example [^1]
- Preoperative CT images are taken
- At the beginning of the procedure: two fluoroscopy (x-ray) images are taken: Anterior-Posterior (front-to-back) and oblique (45 degrees).
- The flouroscopy images are then registered against the preoperative CT images.
- This allows "open-loop" navigation---planning is done manually by the surgeon. Planning seems to be easy.

</v-clicks>

[^1]: [Mazor Robotics Renaissance](https://neurosurgicalassociatespc.com/mazor-robotics-renaissance-guidance-system/patient-information-about-renaissance/)

::right::

<CaptionedImage v-click="3" image="https://www.researchgate.net/profile/Won-Koh/publication/229075792/figure/fig2/AS:216468387045384@1428621493173/AP-and-the-alternative-oblique-views-under-fluoroscopy-AP-view-A-and-the-alternative.png" link="https://www.researchgate.net/figure/AP-and-the-alternative-oblique-views-under-fluoroscopy-AP-view-A-and-the-alternative_fig2_229075792">
<p class="text-sm text-justify">AP and the alternative oblique views under fluoroscopy. AP view <b>(A)</b> and the alternative oblique view <b>(B)</b> under fluoroscopy. Image: <a href="https://www.researchgate.net/publication/229075792_An_Alternative_Approach_to_Needle_Placement_in_Cervicothoracic_Epidural_Injections">Park et. al (2012)</a></p>
</CaptionedImage>


---

# Questions

<v-clicks>

- Freehand/online methods.
- Pre-operative robotic guided methods. [^1]

</v-clicks>
