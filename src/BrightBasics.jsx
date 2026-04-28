import { useState } from "react";
import { useApp } from "./App";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,500&family=Nunito:wght@400;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --teal: #00A99D; --teal-dark: #008F84; --teal-light: #E0F7F6;
  --orange: #FF6B1A; --orange-light: #FFF0E6; --orange-dark: #E05510;
  --yellow: #FFD23F; --yellow-light: #FFFBEA;
  --pink: #FF6B9D; --green: #6DC43E; --navy: #1A3A3A;
  --white: #FFFFFF; --off-white: #F0FAFA;
  --border: #B2E0DD; --text: #1A3A3A;
  --text-mid: #2D6B65; --text-muted: #7ABAB6;
  --shadow-sm: 0 2px 10px rgba(0,169,157,0.08);
  --shadow-md: 0 8px 28px rgba(0,169,157,0.13);
  --shadow-lg: 0 16px 48px rgba(0,169,157,0.15);
}
body { font-family:'Nunito',sans-serif; background:var(--white); color:var(--text); overflow-x:hidden; }
.wrap { max-width:100%; margin:0 auto; padding:0 24px; box-sizing:border-box; }

.nav { position:sticky; top:0; z-index:100; background:white; border-bottom:3px solid var(--teal); box-shadow:0 2px 16px rgba(0,169,157,0.10); }
.nav-inner { display:flex; align-items:center; gap:20px; padding:0 24px; height:68px; max-width:1200px; margin:0 auto; }
.logo { display:flex; align-items:center; gap:10px; font-family:'Fraunces',serif; font-size:26px; font-weight:700; color:var(--teal); text-decoration:none; flex-shrink:0; cursor:pointer; }
.logo img { width:58px; height:58px; border-radius:50%; object-fit:cover; }
.logo-bright { color:var(--orange); }
.logo-basics { color:var(--teal); }
.search-bar { flex:1; display:flex; align-items:center; background:var(--off-white); border:2px solid var(--border); border-radius:100px; padding:0 18px; max-width:440px; transition:border-color 0.2s; }
.search-bar:focus-within { border-color:var(--teal); background:white; }
.search-bar input { flex:1; background:none; border:none; outline:none; font-family:'Nunito',sans-serif; font-size:14px; color:var(--text); padding:10px 0; }
.search-bar input::placeholder { color:var(--text-muted); }
.nav-links { display:flex; gap:2px; margin-left:auto; }
.nav-link { color:var(--text-mid); font-size:14px; font-weight:700; padding:8px 14px; border-radius:100px; cursor:pointer; border:none; background:none; font-family:'Nunito',sans-serif; transition:background 0.2s,color 0.2s; }
.nav-link:hover { background:var(--teal-light); color:var(--teal); }
.nav-icons { display:flex; gap:8px; }
.icon-btn { width:40px; height:40px; border-radius:50%; background:var(--off-white); border:1.5px solid var(--border); color:var(--text); font-size:17px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s; position:relative; }
.icon-btn:hover { background:var(--teal-light); border-color:var(--teal); }
.cart-badge { position:absolute; top:-4px; right:-4px; background:var(--orange); color:white; font-size:9px; font-weight:800; width:17px; height:17px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid white; }

.age-bar { background:var(--teal-light); border-bottom:2px solid var(--teal); overflow-x:auto; }
.age-bar-inner { display:flex; align-items:center; gap:10px; padding:12px 24px; max-width:1200px; margin:0 auto; }
.age-label { font-size:12px; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.08em; white-space:nowrap; flex-shrink:0; }
.age-pill { display:flex; align-items:center; gap:6px; padding:8px 18px; border-radius:100px; font-size:13px; font-weight:800; cursor:pointer; border:2.5px solid transparent; white-space:nowrap; flex-shrink:0; transition:transform 0.15s,box-shadow 0.15s; font-family:'Nunito',sans-serif; }
.age-pill:hover { transform:translateY(-2px); box-shadow:var(--shadow-sm); }
.age-pill.active { border-color:var(--orange)!important; box-shadow:0 0 0 3px rgba(255,107,26,0.15); }

.hero { background:linear-gradient(135deg,#00A99D 0%,#00BFB3 40%,#008F84 100%); padding:60px 24px; position:relative; overflow:hidden; width:100%; box-sizing:border-box; }
.hero::before { content:''; position:absolute; top:-120px; right:-120px; width:480px; height:480px; border-radius:50%; background:rgba(255,255,255,0.06); pointer-events:none; }
.hero::after { content:''; position:absolute; bottom:-80px; left:-60px; width:320px; height:320px; border-radius:50%; background:rgba(0,0,0,0.06); pointer-events:none; }
.hero-inner { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1.1fr 0.9fr; align-items:center; gap:60px; position:relative; z-index:1; }
.hero-eyebrow { display:inline-flex; align-items:center; gap:6px; background:var(--yellow); color:#5A4000; border-radius:100px; padding:7px 18px; font-size:12px; font-weight:800; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:20px; }
.hero h1 { font-family:'Fraunces',serif; font-size:clamp(38px,4.5vw,60px); font-weight:700; line-height:1.08; color:white; margin-bottom:18px; }
.hero h1 .hi { color:var(--yellow); font-style:italic; }
.hero-sub { font-size:17px; color:rgba(255,255,255,0.88); line-height:1.65; margin-bottom:32px; max-width:460px; font-weight:600; }
.hero-ctas { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:40px; }
.btn-primary { background:var(--orange); color:white; border:none; border-radius:100px; padding:15px 32px; font-size:16px; font-weight:800; font-family:'Nunito',sans-serif; cursor:pointer; box-shadow:0 4px 16px rgba(255,107,26,0.35); transition:background 0.2s,transform 0.15s; }
.btn-primary:hover { background:var(--orange-dark); transform:translateY(-2px); }
.btn-secondary { background:rgba(255,255,255,0.15); color:white; border:2px solid rgba(255,255,255,0.5); border-radius:100px; padding:15px 32px; font-size:16px; font-weight:800; font-family:'Nunito',sans-serif; cursor:pointer; transition:background 0.2s,border-color 0.2s; }
.btn-secondary:hover { background:rgba(255,255,255,0.25); border-color:white; }
.hero-stats { display:flex; gap:32px; }
.stat-val { font-family:'Fraunces',serif; font-size:30px; font-weight:700; color:var(--yellow); }
.stat-lbl { font-size:12px; color:rgba(255,255,255,0.65); font-weight:700; margin-top:2px; }
.hero-cards { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.hcard { background:white; border-radius:20px; padding:18px; box-shadow:var(--shadow-md); border:1.5px solid rgba(255,255,255,0.3); cursor:pointer; transition:transform 0.2s,box-shadow 0.2s; }
.hcard:hover { transform:translateY(-3px); box-shadow:var(--shadow-lg); }
.hcard.wide { grid-column:span 2; display:flex; align-items:center; gap:18px; }
.hcard-emoji { font-size:52px; line-height:1; flex-shrink:0; }
.hcard-sm-emoji { font-size:40px; line-height:1; margin-bottom:10px; }
.hcard-name { font-family:'Fraunces',serif; font-size:15px; font-weight:700; color:var(--text); margin-bottom:4px; }
.hcard-price { font-size:18px; font-weight:800; color:var(--orange); }
.hcard-age { display:inline-block; font-size:10px; font-weight:800; padding:3px 9px; border-radius:100px; margin-bottom:8px; }
.hcard-note { font-size:11px; color:#888; margin-top:4px; }
.hcard-stars { color:var(--yellow); font-size:12px; margin-bottom:2px; }

.trust-bar { background:var(--navy); padding:13px 24px; }
.trust-inner { max-width:1200px; margin:0 auto; display:flex; justify-content:center; align-items:center; gap:36px; flex-wrap:wrap; }
.trust-item { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:800; color:white; }

.section { padding:60px 24px; max-width:100%; overflow:hidden; }
.section.alt { background:var(--off-white); }
.section-head { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:28px; }
.section-title { font-family:'Fraunces',serif; font-size:34px; font-weight:700; color:var(--text); line-height:1.15; }
.section-title .accent { color:var(--orange); }
.section-title .accent-t { color:var(--teal); }
.section-sub { font-size:15px; color:var(--text-muted); margin-top:6px; }
.see-all { font-size:14px; font-weight:800; color:var(--teal); background:var(--teal-light); border:2px solid var(--teal); border-radius:100px; padding:9px 20px; cursor:pointer; font-family:'Nunito',sans-serif; transition:background 0.2s,color 0.2s; }
.see-all:hover { background:var(--teal); color:white; }

.product-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:20px; }
.product-card { background:white; border-radius:20px; border:1.5px solid var(--border); overflow:hidden; box-shadow:var(--shadow-sm); transition:transform 0.2s,box-shadow 0.2s; cursor:pointer; }
.product-card:hover { transform:translateY(-5px); box-shadow:var(--shadow-md); }
.product-img { height:185px; display:flex; align-items:center; justify-content:center; font-size:76px; position:relative; }
.badge { position:absolute; top:12px; left:12px; font-size:10px; font-weight:800; padding:4px 10px; border-radius:100px; color:white; }
.badge.bestseller { background:var(--orange); }
.badge.new { background:var(--teal); }
.badge.sale { background:var(--pink); }
.wish-btn { position:absolute; top:10px; right:10px; width:32px; height:32px; border-radius:50%; background:white; border:1.5px solid var(--border); font-size:15px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:var(--shadow-sm); transition:transform 0.15s; }
.wish-btn:hover { transform:scale(1.15); }
.product-body { padding:16px; }
.product-age-tag { display:inline-block; font-size:11px; font-weight:800; padding:3px 9px; border-radius:100px; margin-bottom:8px; }
.product-name { font-family:'Fraunces',serif; font-size:16px; font-weight:700; color:var(--text); margin-bottom:4px; line-height:1.3; }
.product-desc { font-size:12px; color:var(--text-muted); margin-bottom:10px; }
.product-reviews { display:flex; align-items:center; gap:5px; font-size:11px; color:var(--text-muted); margin-bottom:12px; }
.product-stars { color:#FFBE00; font-size:12px; }
.product-footer { display:flex; align-items:center; justify-content:space-between; }
.product-price { font-family:'Fraunces',serif; font-size:21px; font-weight:700; color:var(--orange); }
.product-mrp { font-size:12px; color:var(--text-muted); text-decoration:line-through; margin-left:4px; }
.product-off { font-size:11px; color:var(--green); font-weight:800; margin-left:4px; }
.add-btn { width:36px; height:36px; border-radius:50%; background:var(--orange); color:white; border:none; font-size:22px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(255,107,26,0.3); transition:transform 0.15s,background 0.2s; }
.add-btn:hover { background:var(--orange-dark); transform:scale(1.1); }

.founder-strip { margin:0 24px 60px; background:white; border:2px solid var(--teal); border-radius:28px; padding:36px 44px; display:flex; align-items:center; gap:36px; box-shadow:0 0 0 6px var(--teal-light); }
.founder-avatar { width:76px; height:76px; border-radius:50%; background:var(--teal); flex-shrink:0; display:flex; align-items:center; justify-content:center; font-family:'Fraunces',serif; font-size:30px; font-weight:700; color:white; box-shadow:0 4px 16px rgba(0,169,157,0.3); }
.founder-label { font-size:12px; font-weight:800; color:var(--teal); text-transform:uppercase; letter-spacing:0.07em; margin-bottom:8px; }
.founder-quote { font-family:'Fraunces',serif; font-size:21px; font-weight:700; color:var(--text); line-height:1.4; margin-bottom:10px; }
.founder-quote em { font-style:italic; color:var(--orange); }
.founder-sig { font-size:13px; color:var(--text-muted); font-weight:700; }
.founder-picks { display:flex; gap:10px; flex-shrink:0; }
.founder-pick { width:68px; height:68px; border-radius:16px; background:var(--teal-light); border:2px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:30px; cursor:pointer; transition:background 0.2s,transform 0.15s; }
.founder-pick:hover { background:var(--teal); transform:scale(1.06); }

.cat-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); gap:14px; }
.cat-card { border-radius:20px; padding:22px 12px; text-align:center; border:1.5px solid var(--border); cursor:pointer; box-shadow:var(--shadow-sm); transition:transform 0.2s,box-shadow 0.2s,border-color 0.2s; }
.cat-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-md); border-color:var(--teal); }
.cat-icon { font-size:38px; margin-bottom:10px; }
.cat-name { font-family:'Fraunces',serif; font-size:14px; font-weight:700; color:var(--text); }
.cat-count { font-size:11px; color:var(--text-muted); font-weight:700; margin-top:3px; }

.diy-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.diy-card { border-radius:20px; overflow:hidden; border:1.5px solid var(--border); box-shadow:var(--shadow-sm); cursor:pointer; transition:transform 0.2s,box-shadow 0.2s; }
.diy-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-md); }
.diy-top { height:170px; display:flex; align-items:center; justify-content:center; font-size:70px; }
.diy-body { background:white; padding:18px; }
.diy-tag { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:7px; }
.diy-title { font-family:'Fraunces',serif; font-size:19px; font-weight:700; color:var(--text); margin-bottom:6px; }
.diy-meta { font-size:12px; color:var(--text-muted); font-weight:700; }
.diy-btn { margin-top:14px; width:100%; background:white; color:var(--teal); border:2px solid var(--teal); border-radius:100px; padding:10px; font-size:14px; font-weight:800; font-family:'Nunito',sans-serif; cursor:pointer; transition:background 0.2s,color 0.2s; }
.diy-btn:hover { background:var(--teal); color:white; }

/* ── COMPLETE THE KIT ── */
.bundle-section { background:var(--off-white); padding:60px 24px; }
.bundle-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:24px; }
.bundle-card { background:white; border-radius:22px; border:1.5px solid var(--border); padding:24px; box-shadow:var(--shadow-sm); cursor:pointer; transition:transform 0.2s,box-shadow 0.2s; }
.bundle-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-md); }
.bundle-tag { display:inline-flex; align-items:center; gap:6px; background:var(--teal-light); color:var(--teal); font-size:11px; font-weight:900; padding:4px 12px; border-radius:100px; margin-bottom:14px; text-transform:uppercase; letter-spacing:0.06em; }
.bundle-name { font-family:'Fraunces',serif; font-size:20px; font-weight:700; color:var(--text); margin-bottom:6px; }
.bundle-desc { font-size:13px; color:var(--text-muted); font-weight:700; margin-bottom:16px; line-height:1.6; }
.bundle-items { display:flex; gap:10px; margin-bottom:18px; flex-wrap:wrap; }
.bundle-item { display:flex; align-items:center; gap:6px; background:var(--off-white); border:1.5px solid var(--border); border-radius:10px; padding:7px 12px; font-size:12px; font-weight:800; color:var(--text-mid); }
.bundle-item-emoji { font-size:18px; }
.bundle-footer { display:flex; align-items:center; justify-content:space-between; border-top:1px solid var(--border); padding-top:16px; }
.bundle-price { font-family:'Fraunces',serif; font-size:24px; font-weight:700; color:var(--orange); }
.bundle-mrp { font-size:13px; color:var(--text-muted); text-decoration:line-through; margin-left:6px; }
.bundle-save { display:block; font-size:12px; font-weight:900; color:var(--green); margin-top:2px; }
.bundle-btn { background:var(--teal); color:white; border:none; border-radius:100px; padding:12px 24px; font-size:14px; font-weight:900; font-family:'Nunito',sans-serif; cursor:pointer; box-shadow:0 4px 12px rgba(0,169,157,0.3); transition:background 0.2s,transform 0.15s; }
.bundle-btn:hover { background:var(--teal-dark); transform:translateY(-1px); }

/* ── BIS BADGE ── */
.bis-badge { display:inline-flex; align-items:center; gap:5px; background:#E8F8DB; color:#2A6B00; font-size:10px; font-weight:900; padding:3px 9px; border-radius:100px; border:1.5px solid #B8E090; }
.bis-strip { background:linear-gradient(90deg,#2A7A00,#3A9A00,#2A7A00); padding:10px 24px; }
.bis-strip-inner { max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:center; gap:40px; flex-wrap:wrap; }
.bis-strip-item { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:800; color:white; }

/* Gift finder banner */
.gift-banner { background:linear-gradient(135deg,var(--yellow) 0%,#FFC107 100%); margin:0 24px 60px; border-radius:24px; padding:36px 48px; display:flex; align-items:center; justify-content:space-between; gap:32px; border:2px solid var(--orange); box-shadow:var(--shadow-md); }
.gb-left { flex:1; }
.gb-tag { font-size:12px; font-weight:900; color:var(--orange); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:10px; }
.gb-title { font-family:'Fraunces',serif; font-size:28px; font-weight:700; color:var(--navy); line-height:1.2; margin-bottom:10px; }
.gb-sub { font-size:15px; color:#5A4000; font-weight:700; line-height:1.5; }
.gb-btn { background:var(--orange); color:white; border:none; border-radius:100px; padding:14px 30px; font-size:15px; font-weight:900; font-family:'Nunito',sans-serif; cursor:pointer; box-shadow:0 4px 16px rgba(255,107,26,0.35); transition:background 0.2s,transform 0.15s; white-space:nowrap; flex-shrink:0; }
.gb-btn:hover { background:var(--orange-dark); transform:translateY(-2px); }


/* ── NEW CATEGORIES SECTION ── */
.new-products-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:20px; }
.new-cat-label { display:flex; align-items:center; gap:10px; margin-bottom:28px; margin-top:48px; }
.new-cat-label-text { font-family:'Fraunces',serif; font-size:22px; font-weight:700; color:var(--text); }
.new-cat-label-line { flex:1; height:2px; background:var(--border); }
.new-cat-label-emoji { font-size:28px; }


/* ── SPECIAL NEEDS ── */
.special-section { background: linear-gradient(135deg, #1A1A2E 0%, #0D0D1F 100%); padding: 64px 24px; }
.special-header { text-align: center; margin-bottom: 40px; }
.special-eyebrow { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.1); border:1.5px solid rgba(255,255,255,0.2); border-radius:100px; padding:7px 18px; font-size:12px; font-weight:900; color:rgba(255,255,255,0.8); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:16px; }
.special-title { font-family:'Fraunces',serif; font-size:38px; font-weight:700; color:white; margin-bottom:10px; line-height:1.15; }
.special-title .acc { color:#C4B5FD; font-style:italic; }
.special-sub { font-size:15px; color:rgba(255,255,255,0.6); font-weight:700; max-width:560px; margin:0 auto; line-height:1.65; }
.special-cats { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:14px; margin-bottom:44px; }
.special-cat { border-radius:18px; padding:18px 14px; text-align:center; cursor:pointer; transition:transform 0.2s,box-shadow 0.2s; border:2px solid transparent; }
.special-cat:hover { transform:translateY(-4px); box-shadow:0 8px 24px rgba(0,0,0,0.3); }
.special-cat.active { border-color:white; box-shadow:0 0 0 3px rgba(255,255,255,0.15); }
.sc-emoji { font-size:32px; margin-bottom:8px; }
.sc-label { font-family:'Fraunces',serif; font-size:13px; font-weight:700; color:white; margin-bottom:3px; }
.sc-desc { font-size:10px; color:rgba(255,255,255,0.55); font-weight:700; line-height:1.4; }
.special-products { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:20px; }
.sp-card { background:white; border-radius:20px; overflow:hidden; border:1.5px solid rgba(255,255,255,0.15); box-shadow:0 4px 20px rgba(0,0,0,0.2); cursor:pointer; transition:transform 0.2s,box-shadow 0.2s; }
.sp-card:hover { transform:translateY(-5px); box-shadow:0 12px 36px rgba(0,0,0,0.3); }
.sp-img { height:170px; display:flex; align-items:center; justify-content:center; font-size:72px; position:relative; }
.sp-need-tag { position:absolute; top:10px; left:10px; font-size:10px; font-weight:900; padding:4px 10px; border-radius:100px; color:white; }
.sp-body { padding:16px; }
.sp-age { display:inline-block; font-size:11px; font-weight:900; padding:3px 9px; border-radius:100px; margin-bottom:8px; }
.sp-name { font-family:'Fraunces',serif; font-size:15px; font-weight:700; color:#1A1A1A; margin-bottom:4px; line-height:1.3; }
.sp-desc { font-size:12px; color:#7ABAB6; margin-bottom:10px; font-weight:700; }
.sp-stars { color:#FFBE00; font-size:12px; margin-bottom:10px; }
.sp-footer { display:flex; align-items:center; justify-content:space-between; }
.sp-price { font-family:'Fraunces',serif; font-size:20px; font-weight:700; color:#FF6B1A; }
.sp-mrp { font-size:12px; color:#aaa; text-decoration:line-through; margin-left:4px; }
.sp-add { width:36px; height:36px; border-radius:50%; background:#FF6B1A; color:white; border:none; font-size:22px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:transform 0.15s; }
.sp-add:hover { transform:scale(1.1); background:#E05510; }
.special-note { margin-top:36px; background:rgba(255,255,255,0.06); border:1.5px solid rgba(255,255,255,0.12); border-radius:16px; padding:20px 24px; text-align:center; }
.special-note-text { font-size:14px; color:rgba(255,255,255,0.65); font-weight:700; line-height:1.65; }
.special-note-text a { color:#C4B5FD; text-decoration:underline; cursor:pointer; }


/* ── SEASONAL SALE BANNER ── */
.sale-banner { position:relative; overflow:hidden; padding:18px 24px; }
.sale-banner-inner { max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; }
.sale-countdown { display:flex; align-items:center; gap:16px; }
.sale-tag { font-size:11px; font-weight:900; color:white; text-transform:uppercase; letter-spacing:0.1em; background:rgba(255,255,255,0.2); padding:4px 12px; border-radius:100px; }
.sale-title { font-family:'Fraunces',serif; font-size:22px; font-weight:700; color:white; }
.sale-timer { display:flex; gap:8px; align-items:center; }
.timer-block { background:rgba(255,255,255,0.15); border-radius:10px; padding:8px 12px; text-align:center; min-width:52px; }
.timer-val { font-family:'Fraunces',serif; font-size:22px; font-weight:700; color:white; display:block; line-height:1; }
.timer-lbl { font-size:9px; font-weight:900; color:rgba(255,255,255,0.7); text-transform:uppercase; letter-spacing:0.08em; }
.timer-sep { font-size:22px; font-weight:900; color:rgba(255,255,255,0.6); }
.sale-cta { background:white; border:none; border-radius:100px; padding:11px 26px; font-size:14px; font-weight:900; font-family:'Nunito',sans-serif; cursor:pointer; transition:transform 0.15s, box-shadow 0.2s; white-space:nowrap; flex-shrink:0; }
.sale-cta:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,0.2); }

/* ── WHATSAPP NUDGE ── */
.wa-nudge { background:white; border-radius:24px; border:2px solid #25D366; margin:0 24px 60px; padding:36px 48px; display:flex; align-items:center; gap:36px; box-shadow:0 8px 32px rgba(37,211,102,0.12); }
.wa-icon { width:72px; height:72px; border-radius:50%; background:#25D366; display:flex; align-items:center; justify-content:center; font-size:32px; flex-shrink:0; box-shadow:0 4px 16px rgba(37,211,102,0.35); }
.wa-content { flex:1; }
.wa-label { font-size:12px; font-weight:900; color:#25D366; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px; }
.wa-title { font-family:'Fraunces',serif; font-size:22px; font-weight:700; color:var(--navy); margin-bottom:6px; line-height:1.3; }
.wa-sub { font-size:14px; color:var(--text-muted); font-weight:700; line-height:1.6; }
.wa-form { display:flex; flex-direction:column; gap:10px; flex-shrink:0; min-width:280px; }
.wa-age-select { border:2px solid #B2E0DD; border-radius:12px; padding:11px 14px; font-family:'Nunito',sans-serif; font-size:14px; font-weight:700; color:var(--text); outline:none; background:#FDFFFE; }
.wa-age-select:focus { border-color:#25D366; }
.wa-btn { background:#25D366; color:white; border:none; border-radius:100px; padding:13px 24px; font-size:14px; font-weight:900; font-family:'Nunito',sans-serif; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:background 0.2s,transform 0.15s; }
.wa-btn:hover { background:#1EBE5A; transform:translateY(-1px); }
.wa-privacy { font-size:11px; color:var(--text-muted); font-weight:700; text-align:center; }

/* ── MOMMY GROUPS SOCIAL PROOF ── */
.mommy-section { background:var(--teal-light); padding:60px 24px; }
.mommy-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:20px; }
.mommy-card { background:white; border-radius:20px; padding:22px; border:1.5px solid var(--border); box-shadow:var(--shadow-sm); transition:transform 0.2s; }
.mommy-card:hover { transform:translateY(-3px); }
.mommy-top { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
.mommy-avatar { width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; font-weight:700; font-family:'Fraunces',serif; color:white; }
.mommy-name { font-size:14px; font-weight:800; color:var(--text); }
.mommy-handle { font-size:12px; color:var(--text-muted); font-weight:700; }
.mommy-platform { font-size:10px; font-weight:900; padding:2px 8px; border-radius:100px; margin-left:auto; }
.mommy-text { font-size:14px; color:var(--text-mid); line-height:1.7; font-weight:600; margin-bottom:14px; font-style:italic; }
.mommy-product { display:flex; align-items:center; gap:8px; background:var(--off-white); border-radius:10px; padding:8px 12px; }
.mommy-product-emoji { font-size:20px; }
.mommy-product-name { font-size:12px; font-weight:800; color:var(--text); }
.mommy-stars { color:#FFBE00; font-size:12px; margin-left:auto; }
.mommy-source { display:flex; align-items:center; gap:6px; margin-top:12px; font-size:11px; font-weight:800; color:var(--text-muted); }

/* ── REORDER REMINDER ── */
.reorder-section { background:white; padding:60px 24px; }
.reorder-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; }
.reorder-card { border:2px solid var(--border); border-radius:20px; padding:20px; display:flex; align-items:center; gap:16px; transition:border-color 0.2s,box-shadow 0.2s; cursor:pointer; }
.reorder-card:hover { border-color:var(--orange); box-shadow:var(--shadow-sm); }
.reorder-emoji { font-size:40px; flex-shrink:0; width:60px; height:60px; background:var(--off-white); border-radius:14px; display:flex; align-items:center; justify-content:center; }
.reorder-info { flex:1; }
.reorder-name { font-family:'Fraunces',serif; font-size:15px; font-weight:700; color:var(--text); margin-bottom:3px; }
.reorder-last { font-size:11px; color:var(--text-muted); font-weight:800; margin-bottom:8px; }
.reorder-bar-wrap { background:var(--off-white); border-radius:100px; height:6px; margin-bottom:6px; overflow:hidden; }
.reorder-bar { height:100%; border-radius:100px; background:linear-gradient(90deg,var(--green),var(--yellow),var(--orange)); }
.reorder-status { font-size:11px; font-weight:900; }
.reorder-btn { background:var(--orange); color:white; border:none; border-radius:100px; padding:8px 16px; font-size:12px; font-weight:900; font-family:'Nunito',sans-serif; cursor:pointer; white-space:nowrap; flex-shrink:0; transition:background 0.2s; }
.reorder-btn:hover { background:var(--orange-dark); }

/* ── AGE GUIDE ── */
.age-guide-section { background:var(--navy); padding:60px 24px; }
.age-guide-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:16px; }
.age-guide-card { background:rgba(255,255,255,0.06); border:1.5px solid rgba(255,255,255,0.1); border-radius:20px; padding:22px 18px; transition:background 0.2s,border-color 0.2s,transform 0.2s; cursor:pointer; }
.age-guide-card:hover { background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.25); transform:translateY(-3px); }
.agc-range { font-family:'Fraunces',serif; font-size:22px; font-weight:700; color:var(--yellow); margin-bottom:4px; }
.agc-emoji { font-size:32px; margin-bottom:10px; }
.agc-title { font-size:13px; font-weight:900; color:white; margin-bottom:10px; text-transform:uppercase; letter-spacing:0.06em; }
.agc-skills { display:flex; flex-direction:column; gap:5px; margin-bottom:14px; }
.agc-skill { font-size:12px; color:rgba(255,255,255,0.65); font-weight:700; display:flex; align-items:center; gap:6px; }
.agc-skill::before { content:'→'; color:var(--teal); font-weight:900; }
.agc-products { font-size:11px; font-weight:900; color:var(--teal); display:flex; align-items:center; gap:4px; margin-top:12px; }
.age-guide-title { font-family:'Fraunces',serif; font-size:34px; font-weight:700; color:white; }
.age-guide-title .accent { color:var(--yellow); }
.age-guide-sub { font-size:15px; color:rgba(255,255,255,0.6); margin-top:6px; font-weight:700; }

.footer { background:var(--navy); padding:52px 24px 24px; }
.footer-inner { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:40px; margin-bottom:40px; width:100%; box-sizing:border-box; }
.footer-logo { display:flex; align-items:center; gap:10px; margin-bottom:14px; }
.footer-logo img { width:44px; height:44px; border-radius:50%; object-fit:cover; border:2px solid var(--teal); }
.footer-logo-text { font-family:'Fraunces',serif; font-size:22px; font-weight:700; }
.f-bright { color:var(--orange); }
.f-basics { color:var(--yellow); }
.footer-desc { font-size:14px; color:rgba(255,255,255,0.5); line-height:1.7; margin-bottom:22px; font-weight:600; }
.footer-social { display:flex; gap:10px; }
.social-btn { width:38px; height:38px; border-radius:50%; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.7); font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s,color 0.2s; }
.social-btn:hover { background:var(--teal); color:white; border-color:var(--teal); }
.footer-col-title { font-size:11px; font-weight:800; color:var(--teal); text-transform:uppercase; letter-spacing:0.09em; margin-bottom:18px; }
.footer-link { display:block; font-size:14px; color:rgba(255,255,255,0.5); margin-bottom:11px; cursor:pointer; transition:color 0.2s; font-weight:600; }
.footer-link:hover { color:white; }
.footer-bottom { max-width:1200px; margin:0 auto; border-top:1px solid rgba(255,255,255,0.1); padding-top:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
.footer-copy { font-size:13px; color:rgba(255,255,255,0.35); font-weight:600; }
.footer-tags { display:flex; gap:8px; }
.footer-tag { font-size:11px; color:rgba(255,255,255,0.4); background:rgba(255,255,255,0.07); border-radius:100px; padding:4px 11px; font-weight:700; }


/* ── HAMBURGER MENU ── */
.hamburger-btn { display:none; width:40px; height:40px; border-radius:10px; background:var(--off-white); border:1.5px solid var(--border); font-size:20px; cursor:pointer; align-items:center; justify-content:center; flex-shrink:0; }

.mobile-drawer { position:fixed; top:0; left:0; height:100vh; width:280px; background:white; z-index:999; transform:translateX(-100%); transition:transform 0.3s ease; box-shadow:4px 0 24px rgba(0,0,0,0.15); display:flex; flex-direction:column; }
.mobile-drawer.open { transform:translateX(0); }
.drawer-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.4); z-index:998; opacity:0; pointer-events:none; transition:opacity 0.3s; }
.drawer-overlay.open { opacity:1; pointer-events:all; }

.drawer-header { background:var(--teal); padding:20px; display:flex; align-items:center; justify-content:space-between; }
.drawer-logo { font-family:'Fraunces',serif; font-size:22px; font-weight:700; color:white; }
.drawer-close { width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,0.2); border:none; color:white; font-size:20px; cursor:pointer; display:flex; align-items:center; justify-content:center; }

.drawer-search { padding:14px 16px; border-bottom:1px solid var(--border); }
.drawer-search input { width:100%; border:2px solid var(--border); border-radius:100px; padding:10px 16px; font-family:'Nunito',sans-serif; font-size:14px; font-weight:600; outline:none; color:var(--text); }
.drawer-search input:focus { border-color:var(--teal); }

.drawer-nav { flex:1; overflow-y:auto; padding:8px 0; }
.drawer-nav-item { display:flex; align-items:center; gap:14px; padding:14px 20px; font-size:15px; font-weight:800; color:var(--text); cursor:pointer; border-radius:0; transition:background 0.15s; }
.drawer-nav-item:hover { background:var(--teal-light); color:var(--teal); }
.drawer-nav-item .dni-icon { font-size:22px; width:32px; text-align:center; }
.drawer-nav-divider { height:1px; background:var(--border); margin:8px 16px; }

.drawer-footer { padding:16px; background:var(--off-white); }
.drawer-wa-btn { width:100%; background:#25D366; color:white; border:none; border-radius:100px; padding:14px; font-size:15px; font-weight:900; font-family:'Nunito',sans-serif; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; }

/* ── MOBILE RESPONSIVE ───────────────────────────────────── */
@media (max-width: 768px) {

  /* NAV */
  .nav-inner { padding:0 14px; height:58px; gap:10px; }
  .logo { font-size:20px; }
  .logo img { width:44px; height:44px; }
  .search-bar { display:none; }
  .nav-links { display:none; }
  .nav-icons { margin-left:auto; }
  .icon-btn { width:36px; height:36px; font-size:15px; }
  .hamburger-btn { display:flex !important; }

  /* AGE BAR */
  .age-bar-inner { padding:10px 14px; gap:8px; }
  .age-label { display:none; }
  .age-pill { padding:7px 14px; font-size:12px; }

  /* HERO */
  .hero { padding:36px 20px 40px; width:100%; box-sizing:border-box; }
  .hero-inner { grid-template-columns:1fr; gap:28px; width:100%; max-width:100%; }
  .hero h1 { font-size:32px; width:100%; }
  .hero-sub { font-size:15px; margin-bottom:24px; width:100%; max-width:100%; }
  .hero-eyebrow { width:auto; }
  .hero-ctas { gap:10px; width:100%; justify-content:flex-start; }
  .btn-primary { flex:1; text-align:center; padding:13px 16px; font-size:15px; }
  .btn-secondary { flex:1; text-align:center; padding:13px 16px; font-size:15px; }
  .hero-stats { gap:24px; width:100%; justify-content:center; }
  .stat-val { font-size:24px; }
  .hero-cards { display:none !important; }
  .hcard { padding:14px; }
  .hcard.wide { flex-direction:column; align-items:flex-start; gap:10px; }
  .hcard-emoji { font-size:36px; }
  .hcard-name { font-size:13px; }
  .hcard-price { font-size:15px; }

  /* BIS STRIP */
  .bis-strip { overflow:hidden; }
  .bis-strip-inner { gap:10px; flex-direction:column; align-items:center; text-align:center; }
  .bis-strip-item { font-size:12px; }

  /* SALE BANNER */
  .sale-banner { padding:16px; }
  .sale-banner-inner { flex-direction:column; align-items:center; gap:12px; text-align:center; }
  .sale-countdown { flex-direction:column; align-items:center; gap:8px; width:100%; }
  .sale-title { font-size:16px; text-align:center; }
  .sale-tag { font-size:10px; }
  .sale-timer { justify-content:center; }
  .timer-val { font-size:18px; }
  .sale-cta { width:100%; text-align:center; padding:12px; }

  /* TRUST BAR */
  .trust-bar { overflow:hidden; }
  .trust-inner { gap:10px; padding:8px 16px; justify-content:center; flex-wrap:wrap; overflow:hidden; }
  .trust-item { font-size:11px; white-space:nowrap; flex-shrink:0; }

  /* SECTIONS */
  .section { padding:40px 16px; }
  .section-head { flex-direction:column; align-items:flex-start; gap:14px; margin-bottom:20px; }
  .section-title { font-size:26px; }
  .wrap { padding:0 16px; }

  /* PRODUCT GRID */
  .product-grid { grid-template-columns:repeat(2,1fr); gap:12px; }
  .product-img { height:150px; font-size:60px; }
  .product-name { font-size:14px; }
  .product-price { font-size:18px; }
  .product-body { padding:12px; }

  /* FOUNDER STRIP */
  .founder-strip { flex-direction:column; margin:0 16px 40px; padding:24px; gap:20px; text-align:center; }
  .founder-picks { justify-content:center; }
  .founder-quote { font-size:17px; }

  /* WHATSAPP NUDGE */
  .wa-nudge { flex-direction:column; margin:0 16px 40px; padding:24px; gap:20px; }
  .wa-form { min-width:unset; width:100%; }
  .wa-title { font-size:18px; }

  /* BUNDLES */
  .bundle-section { padding:40px 16px; }
  .bundle-grid { grid-template-columns:1fr; gap:16px; }
  .bundle-name { font-size:18px; }
  .bundle-items { gap:8px; }

  /* MOMMY REVIEWS */
  .mommy-section { padding:40px 16px; }
  .mommy-grid { grid-template-columns:1fr; gap:14px; }

  /* GIFT BANNER */
  .gift-banner { flex-direction:column; margin:0 16px 40px; padding:24px; gap:20px; }
  .gb-title { font-size:22px; }
  .gb-btn { width:100%; text-align:center; }

  /* CATEGORIES */
  .cat-grid { grid-template-columns:repeat(3,1fr); gap:10px; }
  .cat-icon { font-size:28px; }
  .cat-name { font-size:12px; }
  .cat-count { font-size:10px; }

  /* DIY */
  .diy-grid { grid-template-columns:1fr; gap:14px; }

  /* REORDER */
  .reorder-section { padding:40px 16px; }
  .reorder-grid { grid-template-columns:1fr; gap:12px; }

  /* SPECIAL NEEDS */
  .special-section { padding:40px 16px; }
  .special-title { font-size:28px; }
  .special-cats { grid-template-columns:repeat(2,1fr); gap:10px; }
  .special-products { grid-template-columns:repeat(2,1fr); gap:12px; }
  .sp-img { height:140px; font-size:58px; }
  .sp-name { font-size:13px; }

  /* AGE GUIDE */
  .age-guide-section { padding:40px 16px; }
  .age-guide-grid { grid-template-columns:repeat(2,1fr); gap:10px; }
  .age-guide-title { font-size:26px; }
  .agc-range { font-size:18px; }

  /* FOOTER */
  .footer { padding:36px 16px 20px; overflow:hidden; }
  .footer-inner { grid-template-columns:1fr; gap:28px; }
  .footer-bottom { flex-direction:column; align-items:flex-start; gap:10px; }
}

@media (max-width: 400px) {
  .product-grid { grid-template-columns:1fr; }
  .special-products { grid-template-columns:1fr; }
  .cat-grid { grid-template-columns:repeat(2,1fr); }
  .hero-cards { grid-template-columns:1fr; }
  .hcard.wide { display:flex; }
}

`;

const AGES = [
  { label:"0–2 yrs",   emoji:"🍼", bg:"#FEE8F4", color:"#C42A7E" },
  { label:"2–5 yrs",   emoji:"🧸", bg:"#FFE8D6", color:"#CC5500" },
  { label:"5–8 yrs",   emoji:"🎨", bg:"#D6F5F3", color:"#007A72" },
  { label:"8–12 yrs",  emoji:"🔬", bg:"#E8F8DB", color:"#3A7A00" },
  { label:"12–14 yrs", emoji:"🎭", bg:"#FFFBEA", color:"#7A5800" },
];

const PRODUCTS = [
  { id:1, emoji:"🧩", name:"Montessori Wooden Stacker", age:"1–3 yrs",  ageBg:"#FEE8F4", ageColor:"#C42A7E", price:649,  mrp:899,  rating:4.8, reviews:124, desc:"Natural beechwood, BIS certified",  badge:null,         cardBg:"#FFF5F0" },
  { id:2, emoji:"🎨", name:"Jumbo Art Supply Kit",       age:"4–8 yrs",  ageBg:"#FFE8D6", ageColor:"#CC5500", price:799,  mrp:1099, rating:4.7, reviews:89,  desc:"64-piece set, non-toxic colours",  badge:"bestseller", cardBg:"#FFFBEA" },
  { id:3, emoji:"🔭", name:"Junior Science Explorer",    age:"8–12 yrs", ageBg:"#E8F8DB", ageColor:"#3A7A00", price:1199, mrp:1599, rating:4.9, reviews:56,  desc:"12 experiments, lab-grade tools",  badge:"new",        cardBg:"#F0FFFE" },
  { id:4, emoji:"🧱", name:"STEM Architecture Blocks",   age:"5–10 yrs", ageBg:"#D6F5F3", ageColor:"#007A72", price:899,  mrp:1199, rating:4.6, reviews:203, desc:"200 pieces, architectural design", badge:null,         cardBg:"#F0FFFD" },
  { id:5, emoji:"📚", name:"Indian Folk Tales Box Set",  age:"3–8 yrs",  ageBg:"#FEE8F4", ageColor:"#C42A7E", price:549,  mrp:749,  rating:4.8, reviews:167, desc:"10 illustrated regional stories",  badge:"sale",       cardBg:"#FFF5F8" },
  { id:6, emoji:"🎭", name:"Puppet Theatre Kit",         age:"4–9 yrs",  ageBg:"#FFFBEA", ageColor:"#7A5800", price:1049, mrp:1399, rating:4.7, reviews:78,  desc:"8 puppets + folding stage",        badge:null,         cardBg:"#FFFDF0" },
  { id:7, emoji:"🌱", name:"Kids Garden Grow Kit",       age:"6–12 yrs", ageBg:"#E8F8DB", ageColor:"#3A7A00", price:599,  mrp:799,  rating:4.5, reviews:94,  desc:"Seeds, soil + instruction guide",  badge:"new",        cardBg:"#F5FFF0" },
  { id:8, emoji:"🎲", name:"Strategy Board Game Set",    age:"8–14 yrs", ageBg:"#FFE8D6", ageColor:"#CC5500", price:1299, mrp:1699, rating:4.9, reviews:41,  desc:"3 classic strategy games in 1",    badge:null,         cardBg:"#FFFBEA" },
];


const BUNDLES = [
  {
    id:201, tag:"🎨 Complete the Kit", name:"Young Artist Bundle",
    desc:"Everything a budding artist needs — from first brush strokes to advanced techniques. Personally curated by our founder.",
    items:[{e:"🎨",n:"Art Supply Kit"},{e:"🖌️",n:"Brush Set"},{e:"📐",n:"Sketch Book"},{e:"🎭",n:"Apron"}],
    price:1399, mrp:1996, saves:"Save ₹597 (30% off)"
  },
  {
    id:202, tag:"🔬 Complete the Kit", name:"Little Scientist Bundle",
    desc:"A full science lab at home — experiments, tools, and reading material to fuel curiosity from day one.",
    items:[{e:"🔭",n:"Science Explorer"},{e:"🔬",n:"Microscope Kit"},{e:"📚",n:"Science Book"},{e:"🥽",n:"Safety Goggles"}],
    price:1899, mrp:2797, saves:"Save ₹898 (32% off)"
  },
  {
    id:203, tag:"🧩 Complete the Kit", name:"Brain Builder Bundle",
    desc:"Logic, strategy, and spatial thinking — three toys that grow with your child through ages 4 to 10.",
    items:[{e:"🧩",n:"Wooden Stacker"},{e:"🧱",n:"STEM Blocks"},{e:"🎲",n:"Strategy Game"},{e:"🃏",n:"Flash Cards"}],
    price:1699, mrp:2447, saves:"Save ₹748 (31% off)"
  },
];


const NEW_PRODUCTS = [
  { id:9,  emoji:"🃏", name:"ABC & 123 Flash Card Set",       age:"2–6 yrs",  ageBg:"#FFE8D6", ageColor:"#CC5500", price:349,  mrp:499,  rating:4.8, reviews:312, desc:"200 laminated cards · Hindi + English", badge:"bestseller", cardBg:"#FFF5E6" },
  { id:10, emoji:"🔤", name:"Phonics Learning Card Bundle",   age:"3–7 yrs",  ageBg:"#FEE8F4", ageColor:"#C42A7E", price:449,  mrp:649,  rating:4.7, reviews:189, desc:"Sight words · CVC words · Blends",     badge:"new",        cardBg:"#FFF5F8" },
  { id:11, emoji:"🗺️", name:"India GK Flash Cards",           age:"5–12 yrs", ageBg:"#E8F8DB", ageColor:"#3A7A00", price:299,  mrp:449,  rating:4.6, reviews:94,  desc:"States · capitals · monuments · maps", badge:null,         cardBg:"#F5FFF0" },
  { id:12, emoji:"✏️", name:"Ergonomic Pencil Grip Set",      age:"3–8 yrs",  ageBg:"#D6F5F3", ageColor:"#007A72", price:249,  mrp:399,  rating:4.7, reviews:203, desc:"6 grips · corrects writing posture",   badge:"bestseller", cardBg:"#E0F7F6" },
  { id:13, emoji:"🎒", name:"Posture-Correct School Kit",     age:"5–12 yrs", ageBg:"#E8F8DB", ageColor:"#3A7A00", price:899,  mrp:1199, rating:4.5, reviews:67,  desc:"Ergonomic bag · ruler · pencil case",  badge:null,         cardBg:"#F5FFF0" },
  { id:14, emoji:"📏", name:"Triangular Crayon & Pencil Set", age:"2–7 yrs",  ageBg:"#FEE8F4", ageColor:"#C42A7E", price:399,  mrp:549,  rating:4.8, reviews:156, desc:"12 colours · anti-roll triangular grip", badge:"new",       cardBg:"#FFF5F8" },
  { id:15, emoji:"🤲", name:"Sensory Fidget Toy Bundle",      age:"0–5 yrs",  ageBg:"#F5EEFF", ageColor:"#6E3FCC", price:599,  mrp:849,  rating:4.9, reviews:278, desc:"5 textures · BIS safe · calming toys", badge:"bestseller", cardBg:"#F5EEFF" },
  { id:16, emoji:"🌈", name:"Soft Sensory Activity Board",    age:"0–3 yrs",  ageBg:"#F5EEFF", ageColor:"#6E3FCC", price:799,  mrp:1099, rating:4.8, reviews:134, desc:"8 activities · velcro · zip · mirror",  badge:"new",        cardBg:"#F5EEFF" },
  { id:17, emoji:"🫧", name:"Sensory Squishy & Texture Kit",  age:"1–4 yrs",  ageBg:"#F5EEFF", ageColor:"#6E3FCC", price:449,  mrp:649,  rating:4.7, reviews:98,  desc:"Non-toxic · washable · 6-piece set",   badge:null,         cardBg:"#F5EEFF" },
];


const MOMMY_REVIEWS = [
  { name:"Priya S.",    handle:"Mumbai Moms Club",  platform:"WhatsApp", platformBg:"#25D366", avatar:"P", avatarBg:"#00A99D", text:'"Finally a store I can trust! Ordered the Montessori Stacker for my 2yr old and the quality is SO much better than Amazon. The BIS tag gave me peace of mind immediately."', product:"🧩 Montessori Wooden Stacker", stars:"★★★★★" },
  { name:"Deepa R.",   handle:"@deepa.momlife",     platform:"Instagram", platformBg:"#E1306C", avatar:"D", avatarBg:"#FF6B9D", text:'"Recommended this to my entire mommy group! The Art Kit kept my 6yr old busy for hours. Zero mess (mostly 😂) and the colours are so vibrant. Worth every rupee."', product:"🎨 Jumbo Art Supply Kit",       stars:"★★★★★" },
  { name:"Kavitha M.", handle:"Special Kids India", platform:"Facebook",  platformBg:"#1877F2", avatar:"K", avatarBg:"#6E3FCC", text:'"The weighted lap pad changed everything for my son with ASD. He is calmer during homework time. So grateful BrightBasics carries therapist-recommended products!"', product:"🌀 Weighted Sensory Lap Pad",   stars:"★★★★★" },
  { name:"Anita K.",   handle:"Bhopal Parents Group",platform:"WhatsApp", platformBg:"#25D366", avatar:"A", avatarBg:"#FF6B1A", text:'"The Science Explorer kit is genius. My 9yr old did all 12 experiments in one weekend and is now obsessed with science. Teacher noticed the difference in class!"', product:"🔭 Junior Science Explorer",    stars:"★★★★★" },
  { name:"Suma T.",    handle:"@suma.motherhood",   platform:"Instagram", platformBg:"#E1306C", avatar:"S", avatarBg:"#3A7A00", text:`"The ergonomic pencil grips fixed my daughter's writing grip in 2 weeks. Her handwriting improved so much. School teacher actually asked me what changed!"`, product:"✏️ Ergonomic Pencil Grip Set", stars:"★★★★★" },
  { name:"Meera P.",   handle:"Chennai Moms Network",platform:"WhatsApp", platformBg:"#25D366", avatar:"M", avatarBg:"#C42A7E", text:'"Bought the Dyslexia reading cards on recommendation. My son went from hating reading to asking for more cards every day. The high contrast font makes a huge difference."', product:"📖 Dyslexia-Friendly Reading Cards",stars:"★★★★★" },
];

const REORDER_ITEMS = [
  { id:1, emoji:"🎨", name:"Jumbo Art Supply Kit",      last:"Ordered 58 days ago", fill:20, status:"Running low — reorder soon!", statusColor:"#FF6B1A" },
  { id:2, emoji:"✏️", name:"Ergonomic Pencil Grip Set", last:"Ordered 30 days ago", fill:55, status:"About halfway through",        statusColor:"#FFD23F" },
  { id:3, emoji:"🃏", name:"ABC Flash Card Set",         last:"Ordered 90 days ago", fill:5,  status:"Almost empty — reorder now!",  statusColor:"#E53935" },
  { id:4, emoji:"🧪", name:"Slime & Chemistry Lab",      last:"Ordered 15 days ago", fill:80, status:"Plenty left — check back soon", statusColor:"#6DC43E" },
];

const AGE_GUIDE = [
  { range:"0–1 yr",  emoji:"👶", title:"Newborn & Infant",   skills:["Sensory exploration","Grip & touch","Sound & light response","Tummy time & motor"],  products:4,  bg:"#FEE8F4", color:"#C42A7E" },
  { range:"1–2 yrs", emoji:"🍼", title:"Early Walker",       skills:["Cause & effect","Stacking & sorting","Push & pull toys","Simple puzzles"],             products:7,  bg:"#F5EEFF", color:"#6E3FCC" },
  { range:"2–4 yrs", emoji:"🧸", title:"Toddler",            skills:["Pretend play","Colour recognition","Fine motor skills","Basic language cards"],         products:12, bg:"#FFE8D6", color:"#CC5500" },
  { range:"4–6 yrs", emoji:"🎨", title:"Preschooler",        skills:["Drawing & colouring","Letter recognition","Simple board games","Creative building"],    products:18, bg:"#D6F5F3", color:"#007A72" },
  { range:"6–8 yrs", emoji:"🔬", title:"Early School",       skills:["Reading & phonics","STEM basics","Strategy games","Sports & outdoor"],                  products:22, bg:"#E8F8DB", color:"#3A7A00" },
  { range:"8–12 yrs",emoji:"🚀", title:"Middle Childhood",   skills:["Advanced STEM","Creative writing","Complex puzzles","Team games"],                      products:19, bg:"#E0F7F6", color:"#007A72" },
  { range:"12–14 yrs",emoji:"🎭",title:"Pre-Teen",           skills:["Critical thinking","Science experiments","Strategy & logic","Creative expression"],     products:11, bg:"#FFFBEA", color:"#7A5800" },
];


const SPECIAL_PRODUCTS = [
  // ASD
  { id:20, emoji:"🌀", name:"Weighted Sensory Lap Pad",        need:"ASD", age:"3–12 yrs", ageBg:"#F0E6FF", ageColor:"#5B21B6", price:899,  mrp:1299, rating:4.9, reviews:187, desc:"Deep pressure therapy · calming · washable cover",     badge:"bestseller", cardBg:"#F5F0FF" },
  { id:21, emoji:"🎧", name:"Noise Cancelling Earmuffs",        need:"ASD", age:"2–10 yrs", ageBg:"#F0E6FF", ageColor:"#5B21B6", price:699,  mrp:999,  rating:4.8, reviews:134, desc:"Reduces sensory overload · BIS certified · foldable",  badge:null,         cardBg:"#F5F0FF" },
  { id:22, emoji:"🃏", name:"Emotion Flash Cards (ASD)",        need:"ASD", age:"3–8 yrs",  ageBg:"#F0E6FF", ageColor:"#5B21B6", price:399,  mrp:599,  rating:4.7, reviews:98,  desc:"48 visual emotion cues · AAC compatible · laminated",  badge:"new",        cardBg:"#F5F0FF" },
  // ADHD
  { id:23, emoji:"🌀", name:"Fidget Cube Focus Toy",            need:"ADHD", age:"5–14 yrs", ageBg:"#FFF0E6", ageColor:"#C04A00", price:349,  mrp:549,  rating:4.8, reviews:312, desc:"6 sensory sides · silent mode · improves focus",       badge:"bestseller", cardBg:"#FFF5E0" },
  { id:24, emoji:"⏱️", name:"Visual Timer for Kids",            need:"ADHD", age:"4–12 yrs", ageBg:"#FFF0E6", ageColor:"#C04A00", price:549,  mrp:799,  rating:4.7, reviews:156, desc:"Colour-coded time · reduces transition anxiety",       badge:null,         cardBg:"#FFF5E0" },
  { id:25, emoji:"🧘", name:"Wiggle Seat Cushion",              need:"ADHD", age:"4–14 yrs", ageBg:"#FFF0E6", ageColor:"#C04A00", price:649,  mrp:899,  rating:4.6, reviews:89,  desc:"Balance disc · improves classroom attention",          badge:"new",        cardBg:"#FFF5E0" },
  // Down Syndrome
  { id:26, emoji:"🧸", name:"Soft Grip Fine Motor Toy Set",     need:"Down Syndrome", age:"1–6 yrs", ageBg:"#E6FFF0", ageColor:"#0A6B3A", price:749,  mrp:1099, rating:4.8, reviews:76, desc:"Large grip handles · develops hand strength",         badge:null,         cardBg:"#F0FFF5" },
  { id:27, emoji:"🎵", name:"Musical Cause & Effect Toy",       need:"Down Syndrome", age:"0–4 yrs", ageBg:"#E6FFF0", ageColor:"#0A6B3A", price:699,  mrp:999,  rating:4.9, reviews:63, desc:"Big buttons · bright lights · builds cognition",      badge:"bestseller", cardBg:"#F0FFF5" },
  // Cerebral Palsy
  { id:28, emoji:"🖐️", name:"Adapted Paintbrush & Art Kit",    need:"Cerebral Palsy", age:"3–12 yrs", ageBg:"#E6F0FF", ageColor:"#1A3A9A", price:599, mrp:849, rating:4.7, reviews:54, desc:"Thick grip · wrist support strap · non-toxic",        badge:"new",        cardBg:"#F0F5FF" },
  { id:29, emoji:"🧩", name:"Large Knob Wooden Puzzle",          need:"Cerebral Palsy", age:"2–6 yrs", ageBg:"#E6F0FF", ageColor:"#1A3A9A", price:499, mrp:749, rating:4.8, reviews:91, desc:"Easy-grasp knobs · natural wood · BIS certified",    badge:null,         cardBg:"#F0F5FF" },
  // Visual Impairment
  { id:30, emoji:"🌟", name:"Braille Alphabet Learning Kit",    need:"Visual Impairment", age:"4–12 yrs", ageBg:"#FFFBE6", ageColor:"#7A5800", price:899, mrp:1299, rating:4.9, reviews:42, desc:"Tactile dots · raised print · Hindi + English",     badge:"new",        cardBg:"#FFFDE0" },
  { id:31, emoji:"🔔", name:"Sound & Touch Activity Board",     need:"Visual Impairment", age:"0–5 yrs",  ageBg:"#FFFBE6", ageColor:"#7A5800", price:799, mrp:1149, rating:4.8, reviews:58, desc:"8 textures · 6 sounds · builds sensory mapping",    badge:null,         cardBg:"#FFFDE0" },
  // Hearing Impairment
  { id:32, emoji:"🖐️", name:"Sign Language Flash Cards",       need:"Hearing Impairment", age:"2–10 yrs", ageBg:"#FFE6F0", ageColor:"#8A005A", price:449, mrp:649, rating:4.8, reviews:87, desc:"ISL illustrated cards · 100 everyday signs",        badge:"bestseller", cardBg:"#FFF0F8" },
  { id:33, emoji:"🌈", name:"Visual Communication Board",       need:"Hearing Impairment", age:"2–8 yrs",  ageBg:"#FFE6F0", ageColor:"#8A005A", price:599, mrp:849, rating:4.7, reviews:65, desc:"AAC picture symbols · daily routine support",       badge:"new",        cardBg:"#FFF0F8" },
  // Speech Delays
  { id:34, emoji:"💬", name:"Story Sequencing Picture Cards",   need:"Speech Delays", age:"2–7 yrs", ageBg:"#E6F5FF", ageColor:"#0A4A8A", price:399, mrp:599, rating:4.7, reviews:112, desc:"48 cards · builds narrative · SLP recommended",     badge:"bestseller", cardBg:"#F0F8FF" },
  { id:35, emoji:"🗣️", name:"Mirror & Mouth Movement Kit",     need:"Speech Delays", age:"2–6 yrs", ageBg:"#E6F5FF", ageColor:"#0A4A8A", price:499, mrp:749, rating:4.8, reviews:78,  desc:"Oral motor tools · speech therapist designed",      badge:null,         cardBg:"#F0F8FF" },
  // Dyslexia
  { id:36, emoji:"📖", name:"Dyslexia-Friendly Reading Cards",  need:"Dyslexia", age:"4–12 yrs", ageBg:"#FFF0E6", ageColor:"#8A3A00", price:499, mrp:749, rating:4.9, reviews:134, desc:"High contrast · OpenDyslexic font · colour overlays", badge:"bestseller", cardBg:"#FFF5E6" },
  { id:37, emoji:"🔡", name:"3D Multisensory Letter Set",        need:"Dyslexia", age:"4–10 yrs", ageBg:"#FFF0E6", ageColor:"#8A3A00", price:699, mrp:999, rating:4.8, reviews:96,  desc:"Touch + see + trace · 26 foam letters + numbers",  badge:"new",        cardBg:"#FFF5E6" },
];

const SPECIAL_NEEDS_CATS = [
  { key:"ASD",               emoji:"🌀", label:"Autism (ASD)",       color:"#5B21B6", bg:"#F5F0FF", desc:"Calming · sensory · visual aids" },
  { key:"ADHD",              emoji:"⚡", label:"ADHD & Focus",       color:"#C04A00", bg:"#FFF5E0", desc:"Fidget · focus · movement tools" },
  { key:"Down Syndrome",     emoji:"🧸", label:"Down Syndrome",      color:"#0A6B3A", bg:"#F0FFF5", desc:"Motor skills · cause & effect"  },
  { key:"Cerebral Palsy",    emoji:"🖐️", label:"Cerebral Palsy",    color:"#1A3A9A", bg:"#F0F5FF", desc:"Adapted art · large knob toys"  },
  { key:"Visual Impairment", emoji:"🌟", label:"Visual Impairment",  color:"#7A5800", bg:"#FFFDE0", desc:"Tactile · braille · sound toys" },
  { key:"Hearing Impairment",emoji:"🖐️", label:"Hearing Impairment",color:"#8A005A", bg:"#FFF0F8", desc:"Sign language · AAC cards"      },
  { key:"Speech Delays",     emoji:"💬", label:"Speech Delays",      color:"#0A4A8A", bg:"#F0F8FF", desc:"Story cards · oral motor tools" },
  { key:"Dyslexia",          emoji:"📖", label:"Dyslexia",           color:"#8A3A00", bg:"#FFF5E6", desc:"High-contrast · multisensory"   },
];


const CATS = [
  { emoji:"🧩", name:"Puzzles",        count:28, bg:"#FFF5F0" },
  { emoji:"🎨", name:"Art & Craft",    count:34, bg:"#FFFBEA" },
  { emoji:"🔬", name:"STEM Kits",      count:19, bg:"#F0FFFE" },
  { emoji:"📚", name:"Books",          count:42, bg:"#FFF5F8" },
  { emoji:"🎭", name:"Pretend Play",   count:23, bg:"#FFFDF0" },
  { emoji:"🌱", name:"Outdoors",       count:16, bg:"#F5FFF0" },
  { emoji:"🧱", name:"Building",       count:31, bg:"#F0FFFD" },
  { emoji:"🎲", name:"Board Games",    count:27, bg:"#FFFBEA" },
  { emoji:"🃏", name:"Flash Cards",    count:18, bg:"#FFF0E6" },
  { emoji:"✏️", name:"Stationery",     count:24, bg:"#EEF4FF" },
  { emoji:"🤲", name:"Sensory Toys",   count:15, bg:"#F5EEFF" },
  { emoji:"📖", name:"Learning Cards", count:21, bg:"#FFFDE6" },
];

const DIY = [
  { emoji:"🏰", bg:"#FFE8D6", tag:"Architecture", tagColor:"#CC5500", title:"Build a Cardboard Castle",   age:"5–10 yrs", time:"2–3 hrs" },
  { emoji:"🌿", bg:"#E8F8DB", tag:"Nature",       tagColor:"#3A7A00", title:"Plant a Mini Herb Garden",   age:"4–12 yrs", time:"1 hr" },
  { emoji:"🧪", bg:"#D6F5F3", tag:"Science",      tagColor:"#007A72", title:"Volcano Science Experiment", age:"6–12 yrs", time:"45 mins" },
];

const off = (p, m) => Math.round((1 - p / m) * 100);

export default function BrightBasics() {
  const { navigate, cartCount, addToCart, wish, toggleWish } = useApp();
  const [activeAge, setActiveAge] = useState(null);
  const [localWish, setLocalWish] = useState([]);
  const [activeNeed, setActiveNeed] = useState('ASD');

  const handleWish = (id) => setLocalWish(w => w.includes(id) ? w.filter(x=>x!==id) : [...w,id]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = window.innerWidth <= 768;

  return (
    <>
      <style>{STYLES}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="logo" onClick={() => navigate("home")}>
            <img src="/brightbasics-logo.png" alt="BrightBasics"/>
            <span><span className="logo-bright">Bright</span><span className="logo-basics">Basics</span></span>
          </div>
          <div className="search-bar">
            <span style={{marginRight:8,fontSize:16}}>🔍</span>
            <input placeholder="Search toys, books, art kits…"/>
          </div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => navigate("products")}>Products</button>
            <button className="nav-link">DIY Projects</button>
            <button className="nav-link">About Us</button>
            <button className="nav-link">Community</button>
          </div>
          <button className="hamburger-btn" onClick={() => setDrawerOpen(true)}>☰</button>
          <div className="nav-icons">
            <button className="icon-btn">👤</button>
            <button className="icon-btn" style={{position:"relative"}} onClick={() => navigate("cart")}>
              🛒{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* AGE BAR */}
      <div className="age-bar">
        <div className="age-bar-inner">
          <span className="age-label">Shop by age →</span>
          <button className={`age-pill${!activeAge?" active":""}`} style={{background:"rgba(0,169,157,0.15)",color:"#00A99D"}} onClick={() => setActiveAge(null)}>All Ages</button>
          {AGES.map(a => (
            <button key={a.label} className={`age-pill${activeAge===a.label?" active":""}`} style={{background:a.bg,color:a.color}} onClick={() => setActiveAge(activeAge===a.label?null:a.label)}>
              {a.emoji} {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">✦ Every product personally verified</div>
            <h1>Products your kids will <span className="hi">absolutely</span> love.</h1>
            <p className="hero-sub">BrightBasics is India's curated kids' store — ages 0 to 14. We handpick every single product so you never have to guess.</p>
            <div className="hero-ctas">
              <button className="btn-primary" onClick={() => navigate("products")}>Shop Now →</button>
              <button className="btn-secondary" onClick={() => navigate("products")}>Browse by Age</button>
            </div>
            <div className="hero-stats">
              {[["50+","Curated SKUs"],["100%","BIS Verified"],["7-day","Easy Returns"]].map(([v,l]) => (
                <div key={l}><div className="stat-val">{v}</div><div className="stat-lbl">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-cards">
            <div className="hcard wide" onClick={() => navigate("products")}>
              <div className="hcard-emoji">🧩</div>
              <div>
                <span className="hcard-age" style={{background:"#FEE8F4",color:"#C42A7E"}}>1–3 yrs</span>
                <div className="hcard-name">Montessori Wooden Stacker</div>
                <div className="hcard-stars">★★★★★</div>
                <div className="hcard-price">₹649</div>
                <div className="hcard-note">✓ Founder's pick · BIS certified</div>
              </div>
            </div>
            <div className="hcard" style={{background:"#FFFBEA"}} onClick={() => navigate("products")}>
              <span className="hcard-age" style={{background:"#FFE8D6",color:"#CC5500"}}>4–8 yrs</span>
              <div className="hcard-sm-emoji">🎨</div>
              <div className="hcard-name">Art Supply Kit</div>
              <div className="hcard-price">₹799</div>
            </div>
            <div className="hcard" style={{background:"#E8F8DB"}} onClick={() => navigate("products")}>
              <span className="hcard-age" style={{background:"#D6F5F3",color:"#007A72"}}>8–12 yrs</span>
              <div className="hcard-sm-emoji">🔭</div>
              <div className="hcard-name">Science Explorer</div>
              <div className="hcard-price">₹1,199</div>
            </div>
          </div>
        </div>
      </section>


      {/* BIS STRIP */}
      <div className="bis-strip">
        <div className="bis-strip-inner">
          {[
            ["✅","Every toy is BIS IS 9873 certified"],
            ["🛡️","Mandatory safety checks before listing"],
            ["🔍","Founder personally inspects each batch"],
            ["📋","Compliance docs available on request"],
          ].map(([ic,tx]) => (
            <div key={tx} className="bis-strip-item"><span className="bis-strip-icon">{ic}</span>{tx}</div>
          ))}
        </div>
      </div>


      {/* SEASONAL SALE BANNER */}
      {(() => {
        const month = new Date().getMonth();
        const sales = [
          { month:5,  bg:"linear-gradient(135deg,#1A3A3A,#2D6B65)", cta:"#FFD23F", ctaText:"#1A3A3A", tag:"Back to School", title:"📚 School Season Sale — Up to 40% off", color:"#FFD23F" },
          { month:9,  bg:"linear-gradient(135deg,#7A3A00,#C04A00)", cta:"#FFD23F", ctaText:"#5A2A00", tag:"Diwali Special",  title:"🪔 Diwali Gift Sale — Kits from ₹499",  color:"#FFD23F" },
          { month:11, bg:"linear-gradient(135deg,#0D3B1A,#1A6B3A)", cta:"white",   ctaText:"#0D3B1A", tag:"Year End Sale",   title:"🎄 Year-End Clearance — Up to 35% off", color:"white"   },
        ];
        const active = sales.find(s => s.month === month) || { bg:"linear-gradient(135deg,#00A99D,#008F84)", cta:"white", ctaText:"#1A3A3A", tag:"Limited Time", title:"🌟 Special Offer — Free delivery on orders above ₹599", color:"white" };
        const end = new Date(); end.setDate(end.getDate() + (7 - end.getDay()));
        const diff = end - new Date();
        const days = Math.floor(diff/86400000), hrs = Math.floor((diff%86400000)/3600000), mins = Math.floor((diff%3600000)/60000);
        return (
          <div className="sale-banner" style={{background:active.bg}}>
            <div className="sale-banner-inner">
              <div className="sale-countdown">
                <span className="sale-tag">{active.tag}</span>
                <div className="sale-title" style={{color:active.color}}>{active.title}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap",justifyContent:"center",width:"100%"}}>
                <div className="sale-timer">
                  {[[days,"Days"],[hrs,"Hrs"],[mins,"Mins"]].map(([v,l],i) => (
                    <div key={l} style={{display:"flex",alignItems:"center",gap:8}}>
                      {i>0 && <span className="timer-sep" style={{color:active.color}}>:</span>}
                      <div className="timer-block">
                        <span className="timer-val" style={{color:active.color}}>{String(v).padStart(2,"0")}</span>
                        <span className="timer-lbl">{l}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="sale-cta" style={{color:active.ctaText}} onClick={() => navigate("products")}>Shop Sale →</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-inner">
          {[["🚚","Free delivery above ₹599"],["✅","BIS Verified"],["↩️","7-day returns"],["🔒","Secure UPI"],["📦","Ships in 24 hrs"]].map(([ic,tx]) => (
            <div key={tx} className="trust-item"><span style={{fontSize:16}}>{ic}</span>{tx}</div>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-title">Featured <span className="accent">Products</span></div>
              <div className="section-sub">Handpicked by our founder — no algorithm involved.</div>
            </div>
            <button className="see-all" onClick={() => navigate("products")}>See all products →</button>
          </div>
          <div className="product-grid">
            {PRODUCTS.map(p => (
              <div key={p.id} className="product-card">
                <div className="product-img" style={{background:p.cardBg}}>
                  <span style={{fontSize:76}}>{p.emoji}</span>
                  {p.badge && <span className={`badge ${p.badge}`}>{p.badge.toUpperCase()}</span>}
                  <button className="wish-btn" onClick={() => handleWish(p.id)}>{localWish.includes(p.id)?"❤️":"🤍"}</button>
                </div>
                <div className="product-body">
                  <span className="product-age-tag" style={{background:p.ageBg,color:p.ageColor}}>{p.age}</span>
                  <div className="product-name">{p.name}</div>
                  <div className="product-desc">{p.desc}</div>
                  <span className="bis-badge">✅ BIS Certified</span>
                  <div className="product-reviews">
                    <span className="product-stars">{"★".repeat(Math.floor(p.rating))}</span>
                    <span>{p.rating} ({p.reviews} reviews)</span>
                  </div>
                  <div className="product-footer">
                    <div>
                      <span className="product-price">₹{p.price.toLocaleString()}</span>
                      <span className="product-mrp">₹{p.mrp.toLocaleString()}</span>
                      <span className="product-off">{off(p.price,p.mrp)}% off</span>
                    </div>
                    <button className="add-btn" onClick={() => { addToCart(p); }}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FOUNDER STRIP */}
      <div className="founder-strip">
        <div className="founder-avatar">A</div>
        <div style={{flex:1}}>
          <div className="founder-label">✦ A note from our founder</div>
          <div className="founder-quote">"Every product on BrightBasics has been in <em>my hands</em> before it reaches yours. That's the only curation filter we trust."</div>
          <div className="founder-sig">— Abhishek, Founder · Bhopal</div>
        </div>
        <div className="founder-picks">
          {["🧩","🎨","🔭"].map(e => <div key={e} className="founder-pick" onClick={() => navigate("products")}>{e}</div>)}
        </div>
      </div>



      {/* WHATSAPP AGE NUDGE */}
      <div className="wa-nudge">
        <div className="wa-icon">📱</div>
        <div className="wa-content">
          <div className="wa-label">💬 WhatsApp Age Alerts</div>
          <div className="wa-title">Get personalised picks as your child grows.</div>
          <div className="wa-sub">Tell us your child's age — we'll WhatsApp you curated products every month that are perfect for their stage of development.</div>
        </div>
        <div className="wa-form">
          <select className="wa-age-select">
            <option value="">Child's current age</option>
            {Array.from({length:15},(_,i)=>i).map(n => <option key={n} value={n}>{n===0?"Under 1 yr":`${n} year${n>1?"s":""} old`}</option>)}
          </select>
          <input className="wa-age-select" placeholder="Your WhatsApp number" style={{fontWeight:700}}/>
          <button className="wa-btn">📲 Subscribe on WhatsApp</button>
          <div className="wa-privacy">🔒 No spam. Unsubscribe anytime.</div>
        </div>
      </div>

      {/* COMPLETE THE KIT BUNDLES */}
      <div className="bundle-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-title">🎯 Complete <span className="accent-t">the Kit</span></div>
              <div className="section-sub">Hand-curated bundles — bigger savings, better experience.</div>
            </div>
            <button className="see-all">All bundles →</button>
          </div>
          <div className="bundle-grid">
            {BUNDLES.map(b => (
              <div key={b.id} className="bundle-card">
                <div className="bundle-tag">{b.tag}</div>
                <div className="bundle-name">{b.name}</div>
                <div className="bundle-desc">{b.desc}</div>
                <div className="bundle-items">
                  {b.items.map(i => (
                    <div key={i.n} className="bundle-item">
                      <span className="bundle-item-emoji">{i.e}</span>
                      {i.n}
                    </div>
                  ))}
                </div>
                <div className="bundle-footer">
                  <div>
                    <span className="bundle-price">₹{b.price.toLocaleString()}</span>
                    <span className="bundle-mrp">₹{b.mrp.toLocaleString()}</span>
                    <span className="bundle-save">{b.saves}</span>
                  </div>
                  <button className="bundle-btn" onClick={() => addToCart({id:b.id, name:b.name, price:b.price, emoji:"🎯"})}>Add Bundle →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* FLASH CARDS & LEARNING CARDS */}
      <section className="section" style={{background:"#FFFDF5"}}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-title">🃏 Flash Cards & <span className="accent">Learning Cards</span></div>
              <div className="section-sub">High-repeat purchase · lightweight · perfect for ages 2–12.</div>
            </div>
            <button className="see-all" onClick={() => navigate("products")}>See all →</button>
          </div>
          <div className="product-grid">
            {NEW_PRODUCTS.filter(p => p.id <= 11).map(p => (
              <div key={p.id} className="product-card">
                <div className="product-img" style={{background:p.cardBg}}>
                  <span style={{fontSize:76}}>{p.emoji}</span>
                  {p.badge && <span className={`badge ${p.badge}`}>{p.badge.toUpperCase()}</span>}
                  <button className="wish-btn" onClick={() => handleWish(p.id)}>{localWish.includes(p.id)?"❤️":"🤍"}</button>
                </div>
                <div className="product-body">
                  <span className="product-age-tag" style={{background:p.ageBg,color:p.ageColor}}>{p.age}</span>
                  <div className="product-name">{p.name}</div>
                  <div className="product-desc">{p.desc}</div>
                  <span className="bis-badge" style={{marginBottom:10,display:"inline-flex"}}>✅ BIS Certified</span>
                  <div className="product-reviews">
                    <span className="product-stars">{"★".repeat(Math.floor(p.rating))}</span>
                    <span>{p.rating} ({p.reviews} reviews)</span>
                  </div>
                  <div className="product-footer">
                    <div>
                      <span className="product-price">₹{p.price.toLocaleString()}</span>
                      <span className="product-mrp">₹{p.mrp.toLocaleString()}</span>
                      <span className="product-off">{Math.round((1-p.price/p.mrp)*100)}% off</span>
                    </div>
                    <button className="add-btn" onClick={() => addToCart(p)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ERGONOMIC STATIONERY */}
      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-title">✏️ Ergonomic <span className="accent">Stationery</span></div>
              <div className="section-sub">Corrects posture & grip from day one — school season essentials.</div>
            </div>
            <button className="see-all" onClick={() => navigate("products")}>See all →</button>
          </div>
          <div style={{background:"#E0F7F6",borderRadius:16,padding:"14px 20px",marginBottom:24,display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:22}}>💡</span>
            <div>
              <div style={{fontSize:13,fontWeight:900,color:"var(--teal)"}}>Why ergonomic stationery matters</div>
              <div style={{fontSize:12,fontWeight:700,color:"var(--text-mid)"}}>Poor pencil grip in early years leads to writing fatigue and bad posture. Triangular & ergonomic tools fix this naturally.</div>
            </div>
          </div>
          <div className="product-grid">
            {NEW_PRODUCTS.filter(p => p.id >= 12 && p.id <= 14).map(p => (
              <div key={p.id} className="product-card">
                <div className="product-img" style={{background:p.cardBg}}>
                  <span style={{fontSize:76}}>{p.emoji}</span>
                  {p.badge && <span className={`badge ${p.badge}`}>{p.badge.toUpperCase()}</span>}
                  <button className="wish-btn" onClick={() => handleWish(p.id)}>{localWish.includes(p.id)?"❤️":"🤍"}</button>
                </div>
                <div className="product-body">
                  <span className="product-age-tag" style={{background:p.ageBg,color:p.ageColor}}>{p.age}</span>
                  <div className="product-name">{p.name}</div>
                  <div className="product-desc">{p.desc}</div>
                  <span className="bis-badge" style={{marginBottom:10,display:"inline-flex"}}>✅ BIS Certified</span>
                  <div className="product-reviews">
                    <span className="product-stars">{"★".repeat(Math.floor(p.rating))}</span>
                    <span>{p.rating} ({p.reviews} reviews)</span>
                  </div>
                  <div className="product-footer">
                    <div>
                      <span className="product-price">₹{p.price.toLocaleString()}</span>
                      <span className="product-mrp">₹{p.mrp.toLocaleString()}</span>
                      <span className="product-off">{Math.round((1-p.price/p.mrp)*100)}% off</span>
                    </div>
                    <button className="add-btn" onClick={() => addToCart(p)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SENSORY TOYS */}
      <section className="section" style={{background:"#F8F4FF"}}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-title">🤲 Sensory <span style={{color:"#6E3FCC"}}>Toys</span></div>
              <div className="section-sub">For 0–5 yrs · calming · developmental · parent-trusted.</div>
            </div>
            <button className="see-all" style={{color:"#6E3FCC",background:"#F0EAFF",borderColor:"#6E3FCC"}} onClick={() => navigate("products")}>See all →</button>
          </div>
          <div style={{background:"#EDE4FF",borderRadius:16,padding:"14px 20px",marginBottom:24,display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:22}}>🧠</span>
            <div>
              <div style={{fontSize:13,fontWeight:900,color:"#6E3FCC"}}>Why sensory toys matter for 0–5 yrs</div>
              <div style={{fontSize:12,fontWeight:700,color:"#5A3A8A"}}>Sensory play builds nerve connections in the brain, supports language development, and calms anxious or overstimulated children.</div>
            </div>
          </div>
          <div className="product-grid">
            {NEW_PRODUCTS.filter(p => p.id >= 15).map(p => (
              <div key={p.id} className="product-card">
                <div className="product-img" style={{background:p.cardBg}}>
                  <span style={{fontSize:76}}>{p.emoji}</span>
                  {p.badge && <span className={`badge ${p.badge}`}>{p.badge.toUpperCase()}</span>}
                  <button className="wish-btn" onClick={() => handleWish(p.id)}>{localWish.includes(p.id)?"❤️":"🤍"}</button>
                </div>
                <div className="product-body">
                  <span className="product-age-tag" style={{background:p.ageBg,color:p.ageColor}}>{p.age}</span>
                  <div className="product-name">{p.name}</div>
                  <div className="product-desc">{p.desc}</div>
                  <span className="bis-badge" style={{marginBottom:10,display:"inline-flex"}}>✅ BIS Certified</span>
                  <div className="product-reviews">
                    <span className="product-stars">{"★".repeat(Math.floor(p.rating))}</span>
                    <span>{p.rating} ({p.reviews} reviews)</span>
                  </div>
                  <div className="product-footer">
                    <div>
                      <span className="product-price">₹{p.price.toLocaleString()}</span>
                      <span className="product-mrp">₹{p.mrp.toLocaleString()}</span>
                      <span className="product-off">{Math.round((1-p.price/p.mrp)*100)}% off</span>
                    </div>
                    <button className="add-btn" onClick={() => addToCart(p)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* AS SEEN IN MOMMY GROUPS */}
      <section className="mommy-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-title">💬 As seen in <span className="accent-t">Mommy Groups</span></div>
              <div className="section-sub">Real parents, real WhatsApp groups, real reviews — no paid promotions.</div>
            </div>
          </div>
          <div className="mommy-grid">
            {MOMMY_REVIEWS.map((r,i) => (
              <div key={i} className="mommy-card">
                <div className="mommy-top">
                  <div className="mommy-avatar" style={{background:r.avatarBg}}>{r.avatar}</div>
                  <div>
                    <div className="mommy-name">{r.name}</div>
                    <div className="mommy-handle">{r.handle}</div>
                  </div>
                  <span className="mommy-platform" style={{background:r.platformBg,color:"white"}}>{r.platform}</span>
                </div>
                <div className="mommy-text">{r.text}</div>
                <div className="mommy-product">
                  <span className="mommy-product-emoji">{r.product.split(" ")[0]}</span>
                  <span className="mommy-product-name">{r.product.substring(r.product.indexOf(" ")+1)}</span>
                  <span className="mommy-stars">{r.stars}</span>
                </div>
                <div className="mommy-source">✓ Verified purchase · Shared with permission</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI GIFT FINDER BANNER */}
      <div className="gift-banner">
        <div className="gb-left">
          <div className="gb-tag">✨ AI-Powered Feature</div>
          <div className="gb-title">Not sure what to gift? Let our AI decide.</div>
          <div className="gb-sub">Tell us the child's age and interests — we'll pick the perfect products from our curated catalogue in seconds.</div>
        </div>
        <button className="gb-btn" onClick={() => navigate("gift")}>🎁 Try AI Gift Finder →</button>
      </div>

      {/* CATEGORIES */}
      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-title">Browse <span className="accent-t">Categories</span></div>
              <div className="section-sub">Every category curated — not just aggregated.</div>
            </div>
          </div>
          <div className="cat-grid">
            {CATS.map(c => (
              <div key={c.name} className="cat-card" style={{background:c.bg}} onClick={() => navigate("products")}>
                <div className="cat-icon">{c.emoji}</div>
                <div className="cat-name">{c.name}</div>
                <div className="cat-count">{c.count} products</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIY */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-title">Trending <span className="accent-t">DIY Projects</span></div>
              <div className="section-sub">Step-by-step guides with all products linked.</div>
            </div>
            <button className="see-all">All projects →</button>
          </div>
          <div className="diy-grid">
            {DIY.map(d => (
              <div key={d.title} className="diy-card">
                <div className="diy-top" style={{background:d.bg}}>{d.emoji}</div>
                <div className="diy-body">
                  <div className="diy-tag" style={{color:d.tagColor}}>★ {d.tag}</div>
                  <div className="diy-title">{d.title}</div>
                  <div className="diy-meta">👧 {d.age} · ⏱ {d.time}</div>
                  <button className="diy-btn">View Project →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* REORDER REMINDER */}
      <section className="reorder-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-title">🔄 Time to <span className="accent">Reorder?</span></div>
              <div className="section-sub">Consumable products run out. We'll remind you before they do.</div>
            </div>
          </div>
          <div className="reorder-grid">
            {REORDER_ITEMS.map(r => (
              <div key={r.id} className="reorder-card">
                <div className="reorder-emoji">{r.emoji}</div>
                <div className="reorder-info">
                  <div className="reorder-name">{r.name}</div>
                  <div className="reorder-last">🗓 {r.last}</div>
                  <div className="reorder-bar-wrap">
                    <div className="reorder-bar" style={{width:`${r.fill}%`}}/>
                  </div>
                  <div className="reorder-status" style={{color:r.statusColor}}>{r.status}</div>
                </div>
                <button className="reorder-btn" onClick={() => addToCart({id:r.id+100, name:r.name, price:799, emoji:r.emoji})}>Reorder</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL NEEDS SECTION */}
      <section className="special-section">
        <div className="wrap">
          <div className="special-header">
            <div className="special-eyebrow">💜 Curated for children with special needs</div>
            <div className="special-title">Products for <span className="acc">Special Children</span></div>
            <div className="special-sub">Carefully sourced tools recommended by therapists, educators, and parents — for children with unique learning needs.</div>
          </div>

          {/* Need filter tabs */}
          <div className="special-cats">
            {SPECIAL_NEEDS_CATS.map(c => (
              <div
                key={c.key}
                className={`special-cat${activeNeed===c.key?" active":""}`}
                style={{background: activeNeed===c.key ? c.bg+"33" : "rgba(255,255,255,0.06)", borderColor: activeNeed===c.key ? c.color : "transparent"}}
                onClick={() => setActiveNeed(c.key)}
              >
                <div className="sc-emoji">{c.emoji}</div>
                <div className="sc-label" style={{color: activeNeed===c.key ? c.color : "white"}}>{c.label}</div>
                <div className="sc-desc">{c.desc}</div>
              </div>
            ))}
          </div>

          {/* Products for selected need */}
          <div className="special-products">
            {SPECIAL_PRODUCTS.filter(p => p.need === activeNeed).map(p => {
              const cat = SPECIAL_NEEDS_CATS.find(c => c.key === p.need);
              return (
                <div key={p.id} className="sp-card">
                  <div className="sp-img" style={{background:p.cardBg}}>
                    <span>{p.emoji}</span>
                    {p.badge && <span className="sp-need-tag" style={{background: cat?.color || "#5B21B6"}}>{p.badge.toUpperCase()}</span>}
                  </div>
                  <div className="sp-body">
                    <span className="sp-age" style={{background:p.ageBg,color:p.ageColor}}>{p.age}</span>
                    <div className="sp-name">{p.name}</div>
                    <div className="sp-desc">{p.desc}</div>
                    <span className="bis-badge" style={{marginBottom:8,display:"inline-flex"}}>✅ BIS Certified</span>
                    <div className="sp-stars">{"★".repeat(Math.floor(p.rating))} <span style={{fontSize:11,color:"#888",fontWeight:700}}>{p.rating} ({p.reviews} reviews)</span></div>
                    <div className="sp-footer">
                      <div>
                        <span className="sp-price">₹{p.price.toLocaleString()}</span>
                        <span className="sp-mrp">₹{p.mrp.toLocaleString()}</span>
                      </div>
                      <button className="sp-add" onClick={() => addToCart(p)}>+</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="special-note">
            <div className="special-note-text">
              💜 All special needs products are sourced in consultation with occupational therapists and special educators.<br/>
              Need help choosing the right product? <span>Chat with our team on WhatsApp →</span>
            </div>
          </div>
        </div>
      </section>


      {/* SIZE / AGE GUIDE */}
      <section className="age-guide-section">
        <div className="wrap">
          <div className="section-head" style={{marginBottom:28}}>
            <div>
              <div className="age-guide-title">🗓️ Age & <span className="accent">Development Guide</span></div>
              <div className="age-guide-sub">What's right for your child's age? Click any stage to explore.</div>
            </div>
          </div>
          <div className="age-guide-grid">
            {AGE_GUIDE.map(a => (
              <div key={a.range} className="age-guide-card" onClick={() => navigate("products")}>
                <div className="agc-emoji">{a.emoji}</div>
                <div className="agc-range">{a.range}</div>
                <div className="agc-title">{a.title}</div>
                <div className="agc-skills">
                  {a.skills.map(s => <div key={s} className="agc-skill">{s}</div>)}
                </div>
                <div className="agc-products">🛍 {a.products} curated products →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner" style={{gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr 1fr", gap: isMobile ? "24px" : "40px"}}>
          <div>
            <div className="footer-logo">
              <img src="/brightbasics-logo.png" alt="BrightBasics"/>
              <div className="footer-logo-text"><span className="f-bright">Bright</span><span className="f-basics">Basics</span></div>
            </div>
            <div className="footer-desc">India's curated kids' store. Every product handpicked, backed by our 7-day return promise.</div>
            <div className="footer-social">
              {["f","in","▶","p"].map(s => <button key={s} className="social-btn">{s}</button>)}
            </div>
          </div>
          {[
            {title:"Company", links:["Our Story","Curation Promise","Press","Careers"]},
            {title:"Shop",    links:["All Products","DIY Projects","Gift Bundles","New Arrivals"]},
            {title:"Help",    links:["Track Order","Returns","FAQs","Contact Us"]},
          ].map(col => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              {col.links.map(l => <span key={l} className="footer-link">{l}</span>)}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 BrightBasics. All rights reserved. Made with ♥ in Bhopal.</span>
          <div className="footer-tags">
            {["BIS Certified","UPI Payments","Shiprocket"].map(t => <span key={t} className="footer-tag">{t}</span>)}
          </div>
        </div>
      </footer>
      {/* MOBILE DRAWER */}
      <div className={`drawer-overlay${drawerOpen?" open":""}`} onClick={() => setDrawerOpen(false)}/>
      <div className={`mobile-drawer${drawerOpen?" open":""}`}>
        <div className="drawer-header">
          <div className="drawer-logo"><span style={{color:"#FFD23F"}}>Bright</span>Basics</div>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)}>×</button>
        </div>
        <div className="drawer-search">
          <input placeholder="🔍 Search toys, books, kits…"/>
        </div>
        <div className="drawer-nav">
          {[
            {icon:"🏠", label:"Home",            action:() => { navigate("home"); setDrawerOpen(false); }},
            {icon:"🛍️", label:"All Products",    action:() => { navigate("products"); setDrawerOpen(false); }},
            {icon:"🎁", label:"AI Gift Finder",  action:() => { navigate("gift"); setDrawerOpen(false); }},
            {icon:"🧩", label:"DIY Projects",    action:() => setDrawerOpen(false)},
            {icon:"💜", label:"Special Needs",   action:() => setDrawerOpen(false)},
            {icon:"ℹ️",  label:"About Us",        action:() => setDrawerOpen(false)},
          ].map(item => (
            <div key={item.label} className="drawer-nav-item" onClick={item.action}>
              <span className="dni-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
          <div className="drawer-nav-divider"/>
          <div className="drawer-nav-item" onClick={() => { navigate("cart"); setDrawerOpen(false); }}>
            <span className="dni-icon">🛒</span>
            Cart {cartCount > 0 && <span style={{background:"var(--orange)",color:"white",borderRadius:"100px",padding:"2px 8px",fontSize:11,fontWeight:900,marginLeft:4}}>{cartCount}</span>}
          </div>
        </div>
        <div className="drawer-footer">
          <button className="drawer-wa-btn">📲 Order on WhatsApp</button>
        </div>
      </div>
    </>
  );
}