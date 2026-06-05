---
layout: "../layouts/Layout.astro"
title: ""
description: "Read about  on Bright Mariner."
---


    <!-- Google Fonts loaded asynchronously to prevent render-blocking -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" media="print" onload="this.media='all'">
    <noscript>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap">
    </noscript>

<style>
/* ─────────────────── TOKENS ─────────────────── */
:root {
  --n950:#020b18; --n900:#040e20; --n800:#071628;
  --n700:#0b2038; --n600:#0e2b4a; --n500:#12395f;
  --o600:#0d4d8a; --o500:#1564be; --o400:#1976d2;
  --o300:#2196f3; --o200:#64b5f6; --o100:#bbdefb;
  --teal:#0bbfa8; --gold:#e9b84a; --red:#e74c3c;
  --white:#ffffff;
  --t1:#ddeeff; --t2:#7ba3c4; --t3:#496a87; --t4:#2e4d65;
  --ff-display:'Cormorant Garamond',Georgia,serif;
  --ff-body:'DM Sans',system-ui,sans-serif;
  --ease-out:cubic-bezier(.16,1,.3,1);
}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
body{font-family:var(--ff-body);background:var(--n950);color:var(--t1);min-height:100vh;overflow-x:hidden}
a{text-decoration:none;color:inherit}
img{display:block;max-width:100%}

/* ─────────────────── NAV ─────────────────── */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:200;
  padding:1.1rem 2.5rem;
  display:flex;align-items:center;justify-content:space-between;
  transition:background .35s,backdrop-filter .35s,box-shadow .35s;
}
.nav.solid{
  background:rgba(4,14,32,.92);
  backdrop-filter:blur(20px);
  box-shadow:0 1px 0 rgba(255,255,255,.06);
}
.nav-logo{display:flex;align-items:center;gap:10px}
.nav-logo-text{font-family:var(--ff-display);font-size:1.3rem;font-weight:600;color:var(--white);letter-spacing:.03em}
.nav-links{display:flex;align-items:center;gap:2.2rem;list-style:none}
.nav-links a{color:var(--t2);font-size:.85rem;font-weight:400;letter-spacing:.02em;transition:color .2s}
.nav-links a:hover{color:var(--white)}
.nav-cta{
  background:var(--o400);color:var(--white)!important;
  padding:.5rem 1.3rem!important;border-radius:99px;
  font-weight:500!important;transition:background .2s,transform .15s!important;
}
.nav-cta:hover{background:var(--o300)!important;transform:translateY(-1px)!important}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px}
.hamburger span{display:block;width:22px;height:1.5px;background:var(--t2);border-radius:2px;transition:.3s}

/* ─────────────────── HERO ─────────────────── */
.hero{
  position:relative;min-height:100vh;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:8rem 2rem 6rem;text-align:center;overflow:hidden;
}
.hero-bg{
  position:absolute;inset:0;
  background:
    radial-gradient(ellipse 80% 55% at 50% 25%,rgba(21,100,190,.2) 0%,transparent 65%),
    radial-gradient(ellipse 40% 35% at 85% 75%,rgba(13,77,138,.14) 0%,transparent 55%),
    radial-gradient(ellipse 35% 30% at 15% 60%,rgba(11,191,168,.07) 0%,transparent 55%),
    var(--n950);
}
.hero-grid{
  position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);
  background-size:56px 56px;
  mask-image:radial-gradient(ellipse 75% 70% at 50% 50%,black 20%,transparent 75%);
  pointer-events:none;
}
/* Compass rose */
.hero-compass{
  position:absolute;right:-60px;bottom:-60px;
  width:480px;height:480px;opacity:.045;
  pointer-events:none;flex-shrink:0;
}
/* Atmospheric blobs */
.blob{position:absolute;border-radius:50%;pointer-events:none;filter:blur(60px)}
.blob-1{width:320px;height:320px;background:rgba(21,100,190,.1);left:-80px;top:20%}
.blob-2{width:220px;height:220px;background:rgba(11,191,168,.07);right:8%;top:35%}

.hero-inner{position:relative;z-index:2;max-width:760px;margin:0 auto}

.hero-badge{
  display:inline-flex;align-items:center;gap:7px;
  background:rgba(25,118,210,.12);border:1px solid rgba(33,150,243,.22);
  color:var(--o200);padding:.32rem .9rem;border-radius:99px;
  font-size:.72rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;
  margin-bottom:1.8rem;
  animation:fadeDown .7s var(--ease-out) both;
}
.badge-dot{
  width:6px;height:6px;border-radius:50%;background:var(--o300);
  animation:blink 2.2s ease-in-out infinite;
}
@keyframes blink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.75)}}

h1.hero-title{
  font-family:var(--ff-display);
  font-size:clamp(2.8rem,7vw,5.4rem);
  font-weight:600;line-height:1.04;letter-spacing:-.01em;
  color:var(--white);margin-bottom:1.3rem;
  animation:fadeDown .7s var(--ease-out) .08s both;
}
h1.hero-title em{font-style:italic;color:var(--o200)}

.hero-sub{
  font-size:1.05rem;font-weight:300;color:var(--t2);
  line-height:1.75;max-width:510px;margin:0 auto 2.75rem;
  animation:fadeDown .7s var(--ease-out) .16s both;
}

/* Search bar */
.search-wrap{
  position:relative;max-width:580px;margin:0 auto .6rem;
  animation:fadeDown .7s var(--ease-out) .24s both;
}
.search-input{
  width:100%;padding:1.05rem 3.6rem 1.05rem 1.5rem;
  background:rgba(255,255,255,.07);
  border:1px solid rgba(255,255,255,.11);
  border-radius:14px;color:var(--white);
  font-family:var(--ff-body);font-size:.975rem;font-weight:400;
  outline:none;backdrop-filter:blur(12px);
  transition:border-color .2s,background .2s,box-shadow .25s;
}
.search-input::placeholder{color:var(--t3)}
.search-input:focus{
  border-color:rgba(33,150,243,.45);
  background:rgba(255,255,255,.1);
  box-shadow:0 0 0 5px rgba(33,150,243,.08);
}
.search-btn{
  position:absolute;right:.75rem;top:50%;transform:translateY(-50%);
  background:var(--o500);border:none;border-radius:8px;
  width:36px;height:36px;display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:background .2s,transform .15s;color:var(--white);
}
.search-btn:hover{background:var(--o300);transform:translateY(-50%) scale(1.05)}

.search-hint{
  font-size:.77rem;color:var(--t3);margin-bottom:0;
  animation:fadeDown .7s var(--ease-out) .3s both;
}
.search-hint kbd{
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);
  border-radius:4px;padding:1px 5px;font-size:.7rem;font-family:var(--ff-body);
}

/* Stats */
.hero-stats{
  display:flex;align-items:center;justify-content:center;gap:0;
  margin-top:3.2rem;
  animation:fadeDown .7s var(--ease-out) .38s both;
}
.stat{text-align:center;padding:0 2rem}
.stat-val{font-family:var(--ff-display);font-size:2.2rem;font-weight:700;color:var(--white);line-height:1}
.stat-lbl{font-size:.7rem;color:var(--t3);margin-top:5px;text-transform:uppercase;letter-spacing:.09em}
.stat-div{width:1px;height:38px;background:rgba(255,255,255,.09)}

/* Scroll cue */
.scroll-cue{
  position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:6px;
  color:var(--t3);font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;
  animation:fadeDown .7s var(--ease-out) .7s both;
  cursor:pointer;
}
.scroll-arrow{
  width:20px;height:20px;border-right:1px solid var(--t3);border-bottom:1px solid var(--t3);
  transform:rotate(45deg);margin-top:-2px;
  animation:bounce 2s ease-in-out infinite;
}
@keyframes bounce{0%,100%{transform:rotate(45deg) translateY(0)}50%{transform:rotate(45deg) translateY(5px)}}

/* Wave */
.hero-wave{position:absolute;bottom:-1px;left:0;right:0;pointer-events:none;line-height:0}

/* ─────────────────── SUBJECTS ─────────────────── */
.subjects{background:#07111f;padding:5.5rem 2rem}
.section-hd{text-align:center;max-width:580px;margin:0 auto 3rem}
.section-eyebrow{
  font-size:.7rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;
  color:var(--o200);margin-bottom:.75rem;
}
.section-title{
  font-family:var(--ff-display);
  font-size:clamp(1.8rem,4vw,2.8rem);font-weight:600;
  color:var(--white);line-height:1.12;margin-bottom:.75rem;
}
.section-sub{font-size:.95rem;color:var(--t2);line-height:1.75}

.filter-bar{
  display:flex;align-items:center;justify-content:space-between;
  max-width:1080px;margin:0 auto 1.25rem;gap:1rem;flex-wrap:wrap;
}
.filter-tags{display:flex;gap:6px;flex-wrap:wrap}
.filter-tag{
  font-size:.72rem;font-weight:500;padding:.28rem .85rem;border-radius:99px;
  border:1px solid rgba(255,255,255,.1);color:var(--t2);
  background:transparent;cursor:pointer;transition:all .2s;letter-spacing:.02em;
}
.filter-tag:hover,.filter-tag.active{
  background:rgba(25,118,210,.18);border-color:rgba(33,150,243,.35);
  color:var(--o200);
}
.result-count{font-size:.8rem;color:var(--t3);white-space:nowrap}

.cards-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(290px,1fr));
  gap:1.2rem;max-width:1080px;margin:0 auto;
}

/* Subject card */
.s-card{
  display:flex;flex-direction:column;gap:.8rem;
  background:rgba(255,255,255,.036);
  border:1px solid rgba(255,255,255,.07);
  border-radius:16px;padding:1.5rem;
  cursor:pointer;
  transition:transform .28s var(--ease-out),box-shadow .28s var(--ease-out),border-color .22s,background .22s;
  position:relative;overflow:hidden;color:inherit;
}
.s-card::after{
  content:'';position:absolute;inset:0;
  background:radial-gradient(circle at 80% 20%,var(--card-glow,rgba(33,150,243,.1)) 0%,transparent 60%);
  opacity:0;transition:opacity .3s;pointer-events:none;
}
.s-card:hover{
  transform:translateY(-5px);
  box-shadow:0 24px 48px rgba(0,0,0,.35),0 0 0 1px rgba(255,255,255,.1);
  background:rgba(255,255,255,.058);
  border-color:rgba(255,255,255,.12);
}
.s-card:hover::after{opacity:1}
.s-card.hidden{display:none!important}

/* Top color bar */
.s-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--accent,var(--o400));border-radius:16px 16px 0 0;
}

.card-row{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}
.card-ico{
  width:46px;height:46px;border-radius:11px;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
}
.card-tag{
  font-size:.65rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
  padding:.28rem .78rem;border-radius:99px;
  background:rgba(255,255,255,.07);color:var(--t2);
  border:1px solid rgba(255,255,255,.08);
  margin-top:2px;
}
.card-code{
  font-family:var(--ff-display);font-size:2.1rem;font-weight:700;
  color:var(--white);line-height:1;letter-spacing:.02em;
}
.card-name{font-size:.875rem;color:var(--t2);line-height:1.45;font-weight:400}
.card-footer{
  display:flex;align-items:center;justify-content:space-between;
  padding-top:.65rem;border-top:1px solid rgba(255,255,255,.06);margin-top:auto;
}
.card-meta{display:flex;gap:1rem}
.meta-item{
  display:flex;align-items:center;gap:4px;
  font-size:.77rem;color:var(--t3);
}
.meta-item strong{color:var(--t2);font-weight:500}
.card-arrow{
  display:flex;align-items:center;gap:4px;
  font-size:.78rem;font-weight:500;color:var(--o200);
  transition:gap .22s,color .22s;
}
.s-card:hover .card-arrow{gap:9px;color:var(--white)}

/* Empty state */
.empty{
  display:none;grid-column:1/-1;text-align:center;
  padding:3rem;color:var(--t3);font-size:.95rem;
}
.empty.show{display:block}

/* ─────────────────── HOW IT WORKS ─────────────────── */
.how{
  background:var(--n950);padding:6.5rem 2rem;
  position:relative;overflow:hidden;
}
.how-bg{
  position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(21,100,190,.07) 0%,transparent 70%);
  pointer-events:none;
}
.steps{
  display:grid;grid-template-columns:repeat(3,1fr);
  gap:2rem;max-width:920px;margin:0 auto;position:relative;z-index:1;
}
/* Connector line between steps */
.steps::before{
  content:'';position:absolute;
  top:52px;left:calc(100%/6);right:calc(100%/6);
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(33,150,243,.2) 15%,rgba(33,150,243,.2) 85%,transparent);
  pointer-events:none;
}
.step{text-align:center;padding:2rem 1.5rem 1.5rem}
.step-num{
  font-family:var(--ff-display);font-size:5rem;font-weight:700;
  color:rgba(255,255,255,.03);line-height:1;
  position:absolute;top:.25rem;left:50%;transform:translateX(-50%);
  user-select:none;pointer-events:none;letter-spacing:-.04em;
}
.step{position:relative}
.step-ico{
  width:68px;height:68px;border-radius:18px;
  background:rgba(21,100,190,.1);
  border:1px solid rgba(33,150,243,.18);
  display:flex;align-items:center;justify-content:center;
  margin:0 auto 1.4rem;position:relative;z-index:1;
  transition:background .25s,border-color .25s,transform .25s var(--ease-out);
}
.step:hover .step-ico{
  background:rgba(21,100,190,.2);border-color:rgba(33,150,243,.35);
  transform:translateY(-3px);
}
.step-title{
  font-family:var(--ff-display);font-size:1.3rem;font-weight:600;
  color:var(--white);margin-bottom:.6rem;
}
.step-desc{font-size:.875rem;color:var(--t2);line-height:1.75}

/* ─────────────────── FOOTER ─────────────────── */
footer{
  background:var(--n900);
  border-top:1px solid rgba(255,255,255,.06);
  padding:4rem 2.5rem 2rem;
}
.footer-grid{
  display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;
  gap:2.5rem;max-width:1100px;margin:0 auto 3rem;
}
.footer-logo{display:flex;align-items:center;gap:8px;margin-bottom:.8rem}
.footer-logo-text{font-family:var(--ff-display);font-size:1.2rem;font-weight:600;color:var(--white)}
.footer-tagline{font-size:.83rem;color:var(--t3);line-height:1.65;max-width:240px;margin-bottom:1.4rem}
.socials{display:flex;gap:8px}
.social{
  width:34px;height:34px;border-radius:8px;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);
  display:flex;align-items:center;justify-content:center;
  color:var(--t2);font-size:.78rem;font-weight:600;
  transition:background .2s,color .2s,border-color .2s;
}
.social:hover{background:rgba(33,150,243,.15);color:var(--o200);border-color:rgba(33,150,243,.3)}

.fc-label{
  font-size:.7rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
  color:var(--t3);margin-bottom:1.1rem;
}
.fc-links{list-style:none;display:flex;flex-direction:column;gap:.6rem}
.fc-links a{color:var(--t2);font-size:.875rem;transition:color .2s;display:block}
.fc-links a:hover{color:var(--white)}

.footer-bottom{
  max-width:1100px;margin:0 auto;
  padding-top:1.75rem;border-top:1px solid rgba(255,255,255,.06);
  display:flex;align-items:center;justify-content:space-between;
  gap:1rem;flex-wrap:wrap;
}
.footer-copy{font-size:.78rem;color:var(--t3)}

/* ─────────────────── ANIMATIONS ─────────────────── */
@keyframes fadeDown{
  from{opacity:0;transform:translateY(-14px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes fadeUp{
  from{opacity:0;transform:translateY(22px)}
  to{opacity:1;transform:translateY(0)}
}

/* ─────────────────── RESPONSIVE ─────────────────── */
@media(max-width:900px){
  .nav-links{display:none}
  .hamburger{display:flex}
  .footer-grid{grid-template-columns:1fr 1fr;gap:2rem}
  .footer-brand{grid-column:1/-1}
}
@media(max-width:640px){
  .nav{padding:1rem 1.25rem}
  .hero{padding:7rem 1.25rem 5rem}
  h1.hero-title{font-size:2.5rem}
  .hero-stats{gap:0}
  .stat{padding:0 1.2rem}
  .stat-val{font-size:1.6rem}
  .subjects,.how{padding:3.5rem 1.25rem}
  .steps{grid-template-columns:1fr;gap:.75rem}
  .steps::before{display:none}
  .cards-grid{grid-template-columns:1fr}
  .footer-grid{grid-template-columns:1fr}
  .footer-bottom{flex-direction:column;align-items:flex-start}
  .hero-compass{width:260px;height:260px;right:-40px;bottom:-40px}
}
@media(max-width:400px){
  .hero-stats{flex-direction:column;gap:1rem}
  .stat-div{width:80px;height:1px}
}
</style>

<!-- ═══════════════════ NAV ═══════════════════ -->
<nav class="nav" id="nav">
  <a href="#" class="nav-logo">
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="13" stroke="rgba(33,150,243,.45)" stroke-width="1"/>
      <circle cx="15" cy="15" r="2.8" fill="#2196f3"/>
      <line x1="15" y1="2" x2="15" y2="9" stroke="#2196f3" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="15" y1="21" x2="15" y2="28" stroke="rgba(33,150,243,.35)" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="2" y1="15" x2="9" y2="15" stroke="rgba(33,150,243,.35)" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="21" y1="15" x2="28" y2="15" stroke="rgba(33,150,243,.35)" stroke-width="1.5" stroke-linecap="round"/>
      <polygon points="15,3.5 16.4,7.5 15,6.5 13.6,7.5" fill="#2196f3"/>
    </svg>
    <span class="nav-logo-text">BrightMariner</span>
  </a>

  <ul class="nav-links">
    <li><a href="#">DG Exit Exam</a></li>
    <li><a href="#">MEO Class IV</a></li>
    <li><a href="#">CII Calculator</a></li>
    <li><a href="#subjects" class="nav-cta">Start Practicing</a></li>
  </ul>

  <div class="hamburger" id="ham">
    <span></span><span></span><span></span>
  </div>
</nav>

<!-- ═══════════════════ HERO ═══════════════════ -->
<section class="hero" id="top">
  <div class="hero-bg"></div>
  <div class="hero-grid"></div>
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>

  <!-- Decorative compass rose -->
  <svg class="hero-compass" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="200" cy="200" r="185" stroke="white" stroke-width=".6"/>
    <circle cx="200" cy="200" r="155" stroke="white" stroke-width=".4"/>
    <circle cx="200" cy="200" r="105" stroke="white" stroke-width=".4"/>
    <circle cx="200" cy="200" r="55" stroke="white" stroke-width=".5"/>
    <circle cx="200" cy="200" r="10" fill="white" opacity=".6"/>
    <line x1="200" y1="15" x2="200" y2="385" stroke="white" stroke-width=".5"/>
    <line x1="15" y1="200" x2="385" y2="200" stroke="white" stroke-width=".5"/>
    <line x1="69" y1="69" x2="331" y2="331" stroke="white" stroke-width=".3"/>
    <line x1="331" y1="69" x2="69" y2="331" stroke="white" stroke-width=".3"/>
    <polygon points="200,18 203.5,32 200,28 196.5,32" fill="white"/>
    <polygon points="200,382 196.5,368 200,372 203.5,368" fill="white" opacity=".4"/>
    <polygon points="18,200 32,196.5 28,200 32,203.5" fill="white" opacity=".4"/>
    <polygon points="382,200 368,203.5 372,200 368,196.5" fill="white" opacity=".4"/>
    <text x="200" y="10" text-anchor="middle" fill="white" font-size="11" font-family="Georgia,serif" font-style="italic" opacity=".9">N</text>
    <text x="200" y="398" text-anchor="middle" fill="white" font-size="9" font-family="Georgia,serif" opacity=".4">S</text>
    <text x="392" y="204" text-anchor="middle" fill="white" font-size="9" font-family="Georgia,serif" opacity=".4">E</text>
    <text x="8" y="204" text-anchor="middle" fill="white" font-size="9" font-family="Georgia,serif" opacity=".4">W</text>
    <circle cx="200" cy="44" r="2" fill="white" opacity=".5"/>
    <circle cx="356" cy="200" r="2" fill="white" opacity=".25"/>
    <circle cx="200" cy="356" r="2" fill="white" opacity=".25"/>
    <circle cx="44" cy="200" r="2" fill="white" opacity=".25"/>
    <line x1="200" y1="48" x2="200" y2="58" stroke="white" stroke-width=".8" opacity=".5"/>
    <line x1="200" y1="342" x2="200" y2="352" stroke="white" stroke-width=".8" opacity=".25"/>
    <line x1="342" y1="200" x2="352" y2="200" stroke="white" stroke-width=".8" opacity=".25"/>
    <line x1="48" y1="200" x2="58" y2="200" stroke="white" stroke-width=".8" opacity=".25"/>
  </svg>

  <div class="hero-inner">
    <div class="hero-badge">
      <span class="badge-dot"></span>
      STCW Certified Exam Preparation
    </div>

    <h1 class="hero-title">
      Master Your<br><em>DG Exit Exam</em>
    </h1>

    <p class="hero-sub">
      Practice interactive MCQs for EFA, FPFF, MFA, PSSR, STSDSD and all STCW modules. Instant answer feedback, score tracking and detailed explanations.
    </p>

    <div class="search-wrap">
      <input
        type="text"
        class="search-input"
        id="hero-search"
        placeholder='Search — try "EFA", "fire" or "medical"…'
        autocomplete="off"
        spellcheck="false"
      >
      <button class="search-btn" id="search-btn" title="Search subjects" aria-label="Search">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="4.5" stroke="white" stroke-width="1.5"/>
          <line x1="10.2" y1="10.2" x2="14" y2="14" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    <p class="search-hint">7 subjects &nbsp;·&nbsp; 420+ questions &nbsp;·&nbsp; press <kbd>Enter</kbd> to jump to results</p>

    <div class="hero-stats">
      <div class="stat">
        <div class="stat-val" id="count-q">420+</div>
        <div class="stat-lbl">Questions</div>
      </div>
      <div class="stat-div"></div>
      <div class="stat">
        <div class="stat-val">7</div>
        <div class="stat-lbl">Subjects</div>
      </div>
      <div class="stat-div"></div>
      <div class="stat">
        <div class="stat-val">14</div>
        <div class="stat-lbl">Practice Sets</div>
      </div>
      <div class="stat-div"></div>
      <div class="stat">
        <div class="stat-val">Free</div>
        <div class="stat-lbl">Always</div>
      </div>
    </div>
  </div>

  <div class="scroll-cue" onclick="document.getElementById('subjects').scrollIntoView({behavior:'smooth'})">
    <span>Explore</span>
    <div class="scroll-arrow"></div>
  </div>

  <div class="hero-wave">
    <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="display:block;width:100%">
      <path d="M0 72V42C180 8 360 72 540 40C720 8 900 72 1080 40C1260 8 1380 58 1440 42V72H0Z" fill="#07111f"/>
    </svg>
  </div>
</section>

<!-- ═══════════════════ SUBJECTS ═══════════════════ -->
<section class="subjects" id="subjects">
  <div class="section-hd">
    <p class="section-eyebrow">Practice by Module</p>
    <h2 class="section-title">Choose Your Exam Subject</h2>
    <p class="section-sub">All DG Shipping exit exam modules covered. Pick a subject and start practicing immediately — no account needed.</p>
  </div>

  <div class="filter-bar" id="filter-bar">
    <div class="filter-tags">
      <button class="filter-tag active" data-filter="all">All</button>
      <button class="filter-tag" data-filter="STCW Basic">STCW Basic</button>
      <button class="filter-tag" data-filter="STCW Advanced">STCW Advanced</button>
      <button class="filter-tag" data-filter="STCW Refresher">STCW Refresher</button>
    </div>
    <span class="result-count" id="result-count">Showing all 7 subjects</span>
  </div>

  <div class="cards-grid" id="cards-grid">
    <div class="empty" id="empty-state">No subjects match your search. Try "EFA", "fire" or "medical".</div>
  </div>
</section>

<!-- ═══════════════════ HOW IT WORKS ═══════════════════ -->
<section class="how" id="how">
  <div class="how-bg"></div>
  <div class="section-hd">
    <p class="section-eyebrow">How It Works</p>
    <h2 class="section-title">Simple. Effective. Free.</h2>
    <p class="section-sub">Built for mariners preparing for DG Shipping exit exams. Practice at your own pace, on any device.</p>
  </div>

  <div class="steps">
    <div class="step">
      <div class="step-num">01</div>
      <div class="step-ico">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <rect x="3" y="5" width="20" height="16" rx="3" stroke="#2196f3" stroke-width="1.4"/>
          <line x1="3" y1="9.5" x2="23" y2="9.5" stroke="#2196f3" stroke-width="1.4"/>
          <rect x="6.5" y="13" width="5" height="4.5" rx="1" fill="rgba(33,150,243,.25)" stroke="#2196f3" stroke-width="1"/>
          <line x1="14" y1="14" x2="19.5" y2="14" stroke="#2196f3" stroke-width="1" stroke-linecap="round"/>
          <line x1="14" y1="16.5" x2="17.5" y2="16.5" stroke="rgba(33,150,243,.5)" stroke-width="1" stroke-linecap="round"/>
        </svg>
      </div>
      <h3 class="step-title">Choose a Module</h3>
      <p class="step-desc">Pick from EFA, FPFF, MFA, PSSR, STSDSD and more. Each subject has multiple sets with 30 questions each.</p>
    </div>

    <div class="step">
      <div class="step-num">02</div>
      <div class="step-ico">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="9.5" stroke="#2196f3" stroke-width="1.4"/>
          <path d="M9 13l3 3 5-6" stroke="#2196f3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3 class="step-title">Answer MCQs</h3>
      <p class="step-desc">Tap your answer for instant feedback. Correct answers show in green, wrong in red — learn actively as you go.</p>
    </div>

    <div class="step">
      <div class="step-num">03</div>
      <div class="step-ico">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <rect x="3" y="3" width="20" height="20" rx="3" stroke="#2196f3" stroke-width="1.4"/>
          <path d="M7 18L10 13.5L13 16L17 10L21 13" stroke="#2196f3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="13" cy="13" r="4" fill="rgba(33,150,243,.08)"/>
        </svg>
      </div>
      <h3 class="step-title">Review Your Score</h3>
      <p class="step-desc">See your score, review missed questions and repeat a set until you're confident enough for the real exam.</p>
    </div>
  </div>
</section>

<!-- ═══════════════════ FOOTER ═══════════════════ -->
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="#" class="footer-logo">
        <svg width="22" height="22" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="13" stroke="rgba(33,150,243,.45)" stroke-width="1"/>
          <circle cx="15" cy="15" r="2.8" fill="#2196f3"/>
          <line x1="15" y1="2" x2="15" y2="9" stroke="#2196f3" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="15" y1="21" x2="15" y2="28" stroke="rgba(33,150,243,.35)" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="2" y1="15" x2="9" y2="15" stroke="rgba(33,150,243,.35)" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="21" y1="15" x2="28" y2="15" stroke="rgba(33,150,243,.35)" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span class="footer-logo-text">BrightMariner</span>
      </a>
      <p class="footer-tagline">Free MCQ practice for DG Shipping exit exams. Helping mariners pass STCW certifications since 2021.</p>
      <div class="socials">
        <a href="#" class="social" title="Facebook">f</a>
        <a href="#" class="social" title="Instagram">in</a>
        <a href="#" class="social" title="Telegram">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21.5 2.5L2.5 9.5l7 2.5 2 7 3.5-4 5.5 4 1-16.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
        </a>
        <a href="#" class="social" title="WhatsApp">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.74.45 3.37 1.24 4.79L2 22l5.35-1.21A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" stroke-width="1.5"/><path d="M8 10.5c.5 2 2 3.5 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </a>
      </div>
    </div>

    <div>
      <p class="fc-label">DG Exit Exams</p>
      <ul class="fc-links">
        <li><a href="#">EFA — Elementary First Aid</a></li>
        <li><a href="#">FPFF — Fire Fighting</a></li>
        <li><a href="#">RFPFF — Refresher FPFF</a></li>
        <li><a href="#">MFA — Medical First Aid</a></li>
        <li><a href="#">PSSR — Personal Safety</a></li>
        <li><a href="#">STSDSD — Sea Survival</a></li>
        <li><a href="#">AFF — Adv. Fire Fighting</a></li>
      </ul>
    </div>

    <div>
      <p class="fc-label">Resources</p>
      <ul class="fc-links">
        <li><a href="#">MEO Class IV Exams</a></li>
        <li><a href="#">CII Calculator</a></li>
        <li><a href="#">Marine Engineering</a></li>
        <li><a href="#">Nautical Science</a></li>
        <li><a href="#">Exam Tips & Guides</a></li>
      </ul>
    </div>

    <div>
      <p class="fc-label">Company</p>
      <ul class="fc-links">
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Use</a></li>
      </ul>
    </div>
  </div>

  <div class="footer-bottom">
    <p class="footer-copy">© 2025 BrightMariner. All rights reserved. Made for mariners, by a mariner.</p>
    <p class="footer-copy">Marine Engineer · Fleet Management Ltd · MERI Mumbai</p>
  </div>
</footer>

<!-- ═══════════════════ SCRIPT ═══════════════════ -->
<script type="module">
/* ── Data ── */
const SUBJECTS = [
  {
    code:'EFA', name:'Elementary First Aid',
    sets:2, questions:63, category:'STCW Basic',
    accent:'#e05a4b', glow:'rgba(224,90,75,.12)',
    iconBg:'rgba(224,90,75,.1)',
    icon:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="9" y="3" width="4" height="16" rx="2" fill="#e05a4b"/><rect x="3" y="9" width="16" height="4" rx="2" fill="#e05a4b"/></svg>`,
    keywords:['first aid','efa','medical','basic','elementary'],
    href:'https://brightmariner.com/category/dg-exit-exam/stcw-basic-modular/efa/'
  },
  {
    code:'FPFF', name:'Fire Prevention & Fire Fighting',
    sets:2, questions:60, category:'STCW Basic',
    accent:'#e0822b', glow:'rgba(224,130,43,.12)',
    iconBg:'rgba(224,130,43,.1)',
    icon:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3c0 0 4 5 4 8.5c0 2-1 3.8-2.8 4.8C13.5 14 13 12 11 11c0 2.5-2.2 4-2.2 6.2C8.8 19.3 9.8 20 11 20s2.2-.7 2.2-2.8C13.2 15 15.5 13.5 16 11C17 7 14 4 11 3z" fill="#e0822b" opacity=".85"/><path d="M9 14c0 0-2 1.5-2 3c0 1.1.9 2 2 2s2-.9 2-2c0-1.8-2-3-2-3z" fill="rgba(224,130,43,.55)"/></svg>`,
    keywords:['fire','fpff','fire prevention','fighting','basic'],
    href:'https://brightmariner.com/category/dg-exit-exam/stcw-basic-modular/fpff/'
  },
  {
    code:'RFPFF', name:'Refresher Fire Prevention & Fighting',
    sets:3, questions:90, category:'STCW Refresher',
    accent:'#c9950a', glow:'rgba(201,149,10,.12)',
    iconBg:'rgba(201,149,10,.1)',
    icon:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3c0 0 4 5 4 8.5c0 2-1 3.8-2.8 4.8C13.5 14 13 12 11 11c0 2.5-2.2 4-2.2 6.2C8.8 19.3 9.8 20 11 20s2.2-.7 2.2-2.8C13.2 15 15.5 13.5 16 11C17 7 14 4 11 3z" fill="#c9950a" opacity=".8"/><path d="M4 8c1.5-2 3-3 3-3L6 9c1-1 2.5-2 3 0c.5 2-1 3-1 3c.5-2-1-2.5-2-1c-1 1.5-.5 3 1 4C5 14 3 12 4 8z" fill="rgba(201,149,10,.65)"/></svg>`,
    keywords:['refresher','rfpff','fire','fighting','refresh'],
    href:'https://brightmariner.com/category/dg-exit-exam/stcw-refresher/rfpff/'
  },
  {
    code:'MFA', name:'Medical First Aid',
    sets:2, questions:60, category:'STCW Advanced',
    accent:'#1aab74', glow:'rgba(26,171,116,.12)',
    iconBg:'rgba(26,171,116,.1)',
    icon:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 4C11 4 7 8 7 13c0 2.8 1.8 5 4 5s4-2.2 4-5c0-5-4-9-4-9z" stroke="#1aab74" stroke-width="1.5" fill="rgba(26,171,116,.15)"/><line x1="11" y1="10" x2="11" y2="16" stroke="#1aab74" stroke-width="1.6" stroke-linecap="round"/><line x1="8" y1="13" x2="14" y2="13" stroke="#1aab74" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    keywords:['medical','mfa','first aid','advanced'],
    href:'https://brightmariner.com/category/dg-exit-exam/stcw-advanced/mfa/'
  },
  {
    code:'PSSR', name:'Personal Safety & Social Responsibilities',
    sets:1, questions:30, category:'STCW Basic',
    accent:'#1e85d4', glow:'rgba(30,133,212,.12)',
    iconBg:'rgba(30,133,212,.1)',
    icon:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="3.2" stroke="#1e85d4" stroke-width="1.5"/><path d="M5 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#1e85d4" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    keywords:['pssr','personal safety','social','basic'],
    href:'https://brightmariner.com/category/dg-exit-exam/stcw-basic-modular/pssr-stcw-basic-modular/'
  },
  {
    code:'STSDSD', name:'Survival Craft & Sea Survival',
    sets:1, questions:30, category:'STCW Basic',
    accent:'#8a55d4', glow:'rgba(138,85,212,.12)',
    iconBg:'rgba(138,85,212,.1)',
    icon:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 14.5c0 0 2.5-2.5 7-2.5s7 2.5 7 2.5" stroke="#8a55d4" stroke-width="1.5" stroke-linecap="round"/><path d="M7 14.5l-1 4.5h10l-1-4.5" stroke="#8a55d4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="11" y1="4" x2="11" y2="12" stroke="#8a55d4" stroke-width="1.5" stroke-linecap="round"/><path d="M11 4l3.5 3.5" stroke="#8a55d4" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    keywords:['stsdsd','sea survival','survival craft','rescue','basic'],
    href:'https://brightmariner.com/category/dg-exit-exam/stcw-basic-modular/stsdsd-stcw-basic-modular/'
  },
  {
    code:'AFF', name:'Advanced Fire Fighting',
    sets:1, questions:30, category:'STCW Advanced',
    accent:'#0bbfa8', glow:'rgba(11,191,168,.12)',
    iconBg:'rgba(11,191,168,.1)',
    icon:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="13" r="5.5" stroke="#0bbfa8" stroke-width="1.5"/><circle cx="11" cy="13" r="2" fill="rgba(11,191,168,.25)" stroke="#0bbfa8" stroke-width="1"/><line x1="11" y1="4" x2="11" y2="7.5" stroke="#0bbfa8" stroke-width="1.5" stroke-linecap="round"/><line x1="3.5" y1="10.5" x2="7" y2="11" stroke="#0bbfa8" stroke-width="1" stroke-linecap="round" opacity=".6"/><line x1="18.5" y1="10.5" x2="15" y2="11" stroke="#0bbfa8" stroke-width="1" stroke-linecap="round" opacity=".6"/></svg>`,
    keywords:['aff','advanced','fire fighting','fire'],
    href:'https://brightmariner.com/category/dg-exit-exam/stcw-advanced/aff/'
  }
];

/* ── Render cards ── */
let activeFilter = 'all';
let searchQuery  = '';

function makeCard(s, delay) {
  const a = document.createElement('a');
  a.href = s.href;
  a.className = 's-card';
  a.style.cssText = `--accent:${s.accent};--card-glow:${s.glow};animation:fadeUp .5s var(--ease-out,cubic-bezier(.16,1,.3,1)) ${delay*0.07}s both`;
  a.setAttribute('data-category', s.category);
  a.setAttribute('data-keywords', JSON.stringify(s.keywords));
  a.innerHTML = `
    <div class="card-row">
      <div class="card-ico" style="background:${s.iconBg}">${s.icon}</div>
      <span class="card-tag">${s.category}</span>
    </div>
    <div class="card-code">${s.code}</div>
    <div class="card-name">${s.name}</div>
    <div class="card-footer">
      <div class="card-meta">
        <div class="meta-item">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" stroke-width="1"/><line x1="5.5" y1="3" x2="5.5" y2="6" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><circle cx="5.5" cy="7.8" r=".7" fill="currentColor"/></svg>
          <strong>${s.questions}</strong>&nbsp;questions
        </div>
        <div class="meta-item">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="1" y="2" width="9" height="7.5" rx="1.5" stroke="currentColor" stroke-width="1"/><line x1="1" y1="4.5" x2="10" y2="4.5" stroke="currentColor" stroke-width="1"/></svg>
          <strong>${s.sets}</strong>&nbsp;set${s.sets>1?'s':''}
        </div>
      </div>
      <span class="card-arrow">
        Practice now
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><line x1="2" y1="6.5" x2="11" y2="6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><polyline points="7.5,3 11,6.5 7.5,10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    </div>
  `;
  return a;
}

function render() {
  const grid  = document.getElementById('cards-grid');
  const empty = document.getElementById('empty-state');
  const count = document.getElementById('result-count');

  // Remove old cards
  grid.querySelectorAll('.s-card').forEach(c => c.remove());

  const q = searchQuery.toLowerCase().trim();
  const filtered = SUBJECTS.filter(s => {
    const catOk = activeFilter === 'all' || s.category === activeFilter;
    const qOk   = !q
      || s.code.toLowerCase().includes(q)
      || s.name.toLowerCase().includes(q)
      || s.keywords.some(k => k.includes(q));
    return catOk && qOk;
  });

  if (filtered.length === 0) {
    empty.classList.add('show');
    count.textContent = 'No subjects found';
  } else {
    empty.classList.remove('show');
    count.textContent = filtered.length === SUBJECTS.length
      ? `Showing all ${SUBJECTS.length} subjects`
      : `${filtered.length} subject${filtered.length > 1 ? 's' : ''} found`;
    filtered.forEach((s, i) => grid.insertBefore(makeCard(s, i), empty));
  }
}

render();

/* ── Search ── */
const heroSearch = document.getElementById('hero-search');
heroSearch.addEventListener('input', e => {
  searchQuery = e.target.value;
  render();
});
heroSearch.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    document.getElementById('subjects').scrollIntoView({ behavior:'smooth', block:'start' });
  }
});
document.getElementById('search-btn').addEventListener('click', () => {
  searchQuery = heroSearch.value;
  render();
  document.getElementById('subjects').scrollIntoView({ behavior:'smooth', block:'start' });
});

/* ── Filter tags ── */
document.getElementById('filter-bar').addEventListener('click', e => {
  const btn = e.target.closest('.filter-tag');
  if (!btn) return;
  document.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.dataset.filter;
  render();
});

/* ── Navbar scroll ── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('solid', window.scrollY > 50);
}, { passive: true });

/* ── Animate stats counter ── */
function animateCount(el, end, suffix='') {
  let start = 0;
  const step = end / 40;
  const id = setInterval(() => {
    start = Math.min(start + step, end);
    el.textContent = Math.round(start) + suffix;
    if (start >= end) clearInterval(id);
  }, 25);
}
const observer = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      animateCount(document.getElementById('count-q'), 420, '+');
      observer.disconnect();
    }
  });
}, { threshold: .3 });
observer.observe(document.getElementById('count-q'));
</script>
