---
layout: cover
download: true
highlighter: shiki
info: |
  ## Safe Adaptation

  Overview of Robotic Surgery Methods.

  Yarden As
title: Learn to Learn Safely
---

# Learn to Learn Safely

<div class="uppercase text-sm tracking-widest">
Yarden As
</div>

<div class="abs-bl mx-14 my-12 flex">
  <div class="ml-3 flex flex-col text-left">
    <div class="text-sm opacity-50">Jan. 12th 2023</div>
  </div>
</div>


---

# Updates


<v-click>

###### New Project: &ldquo;Meta-Learning for Model-Based Reinforcement Learning&rdquo;

* Challenge: adapt efficiently to tasks with varying dynamics.
* Goal: deploy on a real robotic system.
* In collaboration with <a href="https://scholar.google.co.uk/citations?user=EfLpX8QAAAAJ&hl=en">Jonas Rothfuss</a>, <a href="https://las.inf.ethz.ch/people/bhavya-sukhija">Bhavya Sukhija</a>, and Arjun Bhardwaj.
* Extension: apply to safety-critical tasks.

</v-click>

<br>
<br>

<v-click>

###### Other
* Mainly writing on my doctoral plan.
* Understanding more closely the application. 

</v-click>


---
layout: image-right
image: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6844237/bin/RSRR-6-9-g0001.jpg
---

# Today's Topic: Overview of Robotic Surgery Methods.
<br>


<div class="opacity-50 my-25">And discussion towards concretizing the problem we aim to solve.</div>

<a href="https://www.dovepress.com/robotic-assisted-spine-surgery-history-efficacy-cost-and-future-trends-peer-reviewed-fulltext-article-RSRR" class="abs-br my-5 mx-5 text-white-sm text-right">SpineAssist Robotic Platform.<br>Image: D’Souza et. al (2019) <br>Dove Medical Press Limited</a>


---

# Taxonomy of Robotic Guided Spine Surgery


<div class="absolute w-full mt-5">
<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6844237/" target="_blank">
```mermaid
graph TB
    can(Computer-Assisted Navigation) --> trad("Traditional (freehand)")
    can --> shared(Robotic, shared-control)
    shared --> open-loop("Only preoperative (open-loop)")
    open-loop --> spine-assist(Mazor SpineAssist)
    shared --> closed-loop("Pre & intraoperative (closed-loop)")
    closed-loop --> mazor(Mazor Renaissance & X)
    closed-loop --> rosa(Rosa Spine)
    closed-loop --> globus(Excelsius)
```
</a>
</div>


---

# Taxonomy of Robotic Guided Spine Surgery

<div class="absolute w-full mt-5">
<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6844237/" target="_blank">
```mermaid
graph TB
    can(Computer-Assisted Navigation) --> trad("Traditional (freehand)")
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

<!--
* Using Computer Assisted Navigation to localize the operation tools' position and the patients body.
-->

---

# Taxonomy of Robotic Guided Spine Surgery

<div class="absolute w-full mt-5">
<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6844237/" target="_blank">
```mermaid
graph TB
    can(Computer-Assisted Navigation) --> trad("Traditional (freehand)")
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


---

# Taxonomy of Robotic Guided Spine Surgery

<div class="absolute w-full mt-5">
<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6844237/" target="_blank">
```mermaid
graph TB
    can(Computer-Assisted Navigation) --> trad("Traditional (freehand)")
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


---

# Taxonomy of Robotic Guided Spine Surgery

<div class="absolute w-full mt-5">
<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6844237/" target="_blank">
```mermaid
graph TB
    can(Computer-Assisted Navigation) --> trad("Traditional (freehand)")
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


---
layout: two-cols
---

# Case Study
Mazor Robotics SpineAssist [^1]

<v-clicks>

- Take preoperative CT images.
- At the beginning of the procedure: two fluoroscopy (x-ray) images are taken: Anterior-Posterior (front-to-back) and oblique (45 degrees).
- The flouroscopy images are then registered against the preoperative CT images.
- This allows "open-loop" navigation---planning is done preoperatively manually by the surgeon.
- The intraoperative execution is <em>in the physician's hands</em>.

</v-clicks>

[^1]: [SpineAssist](https://pubmed.ncbi.nlm.nih.gov/25146652/)

::right::

<CaptionedImage v-click="2" image="https://www.researchgate.net/profile/Won-Koh/publication/229075792/figure/fig2/AS:216468387045384@1428621493173/AP-and-the-alternative-oblique-views-under-fluoroscopy-AP-view-A-and-the-alternative.png" link="https://www.researchgate.net/figure/AP-and-the-alternative-oblique-views-under-fluoroscopy-AP-view-A-and-the-alternative_fig2_229075792">
<p class="text-sm text-justify">AP and the alternative oblique views under fluoroscopy. AP view <b>(A)</b> and the alternative oblique view <b>(B)</b> under fluoroscopy. Image: <a href="https://www.researchgate.net/publication/229075792_An_Alternative_Approach_to_Needle_Placement_in_Cervicothoracic_Epidural_Injections">Park et. al (2012)</a></p>
</CaptionedImage>


---

# Case Study
Mazor Robotics SpineAssist [^1]

<div class="flex">

<div>

- The physician follows the preoperative plan.
- No online closed-loop guidance by the system.
</div>

<div class="max-w-xl relative left-10 -top-5">
  <CaptionedImage image="spine-assist.png" link="https://youtu.be/zWBVf5SQkxE"><p class="text-sm text-justify">SpineAssist during operation. Yellow overlay indicates the preoperative plan. Blue overlay indicates the registered tool.</p></CaptionedImage>
</div>

</div>

[^1]: [SpineAssist](https://pubmed.ncbi.nlm.nih.gov/25146652/)


---
layout: image-right
image: https://source.unsplash.com/_qzGiNQDVC8/1920*2880
---

# Questions

<v-clicks>

- Do we have a specific system that we want to build upon?
- What would be a realistic observation space? Intraoperative fluoroscopy + preoperative CT?
- What would be a realistic action space? Joint positions? End-effector position & orientation?
- Helping the surgeon follow the preoperative plan? Online planning? Only offline (manual) planning?

</v-clicks>
