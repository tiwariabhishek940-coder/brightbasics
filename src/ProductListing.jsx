import { useState, useMemo } from "react";
import { useApp } from "./App";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,500&family=Nunito:wght@400;600;700;800;900&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --teal: #00A99D;
  --teal-dark: #008F84;
  --teal-light: #E0F7F6;
  --orange: #FF6B1A;
  --orange-dark: #E05510;
  --orange-light: #FFF0E6;
  --yellow: #FFD23F;
  --pink: #FF6B9D;
  --green: #6DC43E;
  --navy: #1A3A3A;
  --white: #FFFFFF;
  --off-white: #F0FAFA;
  --border: #B2E0DD;
  --text: #1A3A3A;
  --text-mid: #2D6B65;
  --text-muted: #7ABAB6;
  --shadow-sm: 0 2px 10px rgba(0,169,157,0.08);
  --shadow-md: 0 8px 28px rgba(0,169,157,0.13);
}

body { font-family: 'Nunito', sans-serif; background: var(--off-white); color: var(--text); }

/* ── NAV ── */
.nav { position: sticky; top: 0; z-index: 100; background: white; border-bottom: 3px solid var(--teal); box-shadow: 0 2px 16px rgba(0,169,157,0.10); }
.nav-inner { display: flex; align-items: center; gap: 20px; padding: 0 24px; height: 68px; max-width: 1400px; margin: 0 auto; }
.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; cursor: pointer; }
.logo img { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
.logo-text { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 700; }
.logo-bright { color: var(--orange); }
.logo-basics { color: var(--teal); }
.search-bar { flex: 1; max-width: 480px; display: flex; align-items: center; background: var(--off-white); border: 2px solid var(--border); border-radius: 100px; padding: 0 18px; transition: border-color 0.2s; }
.search-bar:focus-within { border-color: var(--teal); background: white; }
.search-bar input { flex: 1; background: none; border: none; outline: none; font-family: 'Nunito', sans-serif; font-size: 14px; color: var(--text); padding: 10px 0; font-weight: 600; }
.search-bar input::placeholder { color: var(--text-muted); }
.nav-right { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.nav-link { color: var(--text-mid); font-size: 14px; font-weight: 700; padding: 8px 14px; border-radius: 100px; cursor: pointer; border: none; background: none; font-family: 'Nunito', sans-serif; transition: background 0.2s, color 0.2s; }
.nav-link:hover { background: var(--teal-light); color: var(--teal); }
.icon-btn { width: 40px; height: 40px; border-radius: 50%; background: var(--off-white); border: 1.5px solid var(--border); color: var(--text); font-size: 17px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; position: relative; }
.icon-btn:hover { background: var(--teal-light); border-color: var(--teal); }
.cart-badge { position: absolute; top: -4px; right: -4px; background: var(--orange); color: white; font-size: 9px; font-weight: 900; width: 17px; height: 17px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; }

/* ── BREADCRUMB ── */
.breadcrumb { background: white; border-bottom: 1px solid var(--border); padding: 12px 24px; }
.breadcrumb-inner { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: var(--text-muted); }
.bc-link { color: var(--teal); cursor: pointer; }
.bc-link:hover { text-decoration: underline; }
.bc-sep { color: var(--border); }
.bc-cur { color: var(--text); }

/* ── AGE STRIP ── */
.age-strip { background: var(--teal); padding: 10px 24px; overflow-x: auto; border-bottom: 2px solid var(--teal-dark); }
.age-strip-inner { display: flex; align-items: center; gap: 10px; max-width: 1400px; margin: 0 auto; }
.age-label { font-size: 11px; font-weight: 900; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.1em; white-space: nowrap; flex-shrink: 0; }
.age-pill { display: flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 100px; font-size: 13px; font-weight: 800; cursor: pointer; border: 2.5px solid transparent; white-space: nowrap; flex-shrink: 0; transition: transform 0.15s, box-shadow 0.15s; font-family: 'Nunito', sans-serif; }
.age-pill:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
.age-pill.active { border-color: white !important; box-shadow: 0 0 0 3px rgba(255,255,255,0.2); }

/* ── MAIN LAYOUT ── */
.plp-wrap { max-width: 1400px; margin: 0 auto; padding: 28px 24px; display: grid; grid-template-columns: 260px 1fr; gap: 24px; align-items: start; }

/* ── SIDEBAR ── */
.sidebar { background: white; border-radius: 20px; border: 1.5px solid var(--border); overflow: hidden; position: sticky; top: 96px; box-shadow: var(--shadow-sm); }
.sidebar-header { background: var(--navy); padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; }
.sidebar-title { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: white; }
.clear-btn { font-size: 12px; font-weight: 800; color: var(--yellow); background: none; border: none; cursor: pointer; font-family: 'Nunito', sans-serif; }
.clear-btn:hover { text-decoration: underline; }

.filter-section { padding: 18px 20px; border-bottom: 1px solid var(--border); }
.filter-title { font-size: 12px; font-weight: 900; color: var(--text); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }

.filter-option { display: flex; align-items: center; gap: 10px; padding: 6px 0; cursor: pointer; }
.filter-option input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--teal); cursor: pointer; }
.filter-option label { font-size: 14px; font-weight: 700; color: var(--text-mid); cursor: pointer; flex: 1; }
.filter-option .count { font-size: 11px; font-weight: 800; color: var(--text-muted); background: var(--off-white); padding: 2px 7px; border-radius: 100px; }

.price-inputs { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
.price-input { flex: 1; border: 2px solid var(--border); border-radius: 10px; padding: 8px 10px; font-family: 'Nunito', sans-serif; font-size: 13px; font-weight: 700; color: var(--text); outline: none; }
.price-input:focus { border-color: var(--teal); }
.price-sep { color: var(--text-muted); font-weight: 800; }

.rating-option { display: flex; align-items: center; gap: 8px; padding: 6px 0; cursor: pointer; }
.rating-stars { color: #FFBE00; font-size: 14px; }
.rating-label { font-size: 13px; font-weight: 700; color: var(--text-mid); }
.rating-option input { accent-color: var(--teal); }

.apply-btn { width: 100%; margin: 18px 20px 20px; width: calc(100% - 40px); background: var(--teal); color: white; border: none; border-radius: 100px; padding: 12px; font-size: 14px; font-weight: 900; font-family: 'Nunito', sans-serif; cursor: pointer; transition: background 0.2s; }
.apply-btn:hover { background: var(--teal-dark); }

/* ── MAIN CONTENT ── */
.plp-main {}

/* Top bar */
.plp-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
.plp-count { font-size: 15px; font-weight: 700; color: var(--text-mid); }
.plp-count span { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: var(--text); }

.plp-controls { display: flex; align-items: center; gap: 10px; }
.sort-select { border: 2px solid var(--border); border-radius: 100px; padding: 9px 16px; font-family: 'Nunito', sans-serif; font-size: 13px; font-weight: 800; color: var(--text); background: white; outline: none; cursor: pointer; }
.sort-select:focus { border-color: var(--teal); }
.view-btn { width: 38px; height: 38px; border-radius: 10px; border: 2px solid var(--border); background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; transition: border-color 0.2s, background 0.2s; }
.view-btn.active { border-color: var(--teal); background: var(--teal-light); }

/* Active filters row */
.active-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.active-filter { display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: var(--teal-light); border: 1.5px solid var(--teal); border-radius: 100px; font-size: 12px; font-weight: 800; color: var(--teal); }
.af-remove { cursor: pointer; font-size: 14px; color: var(--teal); font-weight: 900; line-height: 1; }
.af-remove:hover { color: var(--orange); }

/* Product grid */
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
.product-grid.list { grid-template-columns: 1fr; }

/* Product card */
.pcard { background: white; border-radius: 20px; border: 1.5px solid var(--border); overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
.pcard:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }

/* List view card */
.product-grid.list .pcard { display: flex; flex-direction: row; }
.product-grid.list .pcard-img { width: 180px; flex-shrink: 0; height: auto; min-height: 160px; }
.product-grid.list .pcard-body { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.product-grid.list .pcard-desc { display: block !important; }

.pcard-img { height: 190px; display: flex; align-items: center; justify-content: center; font-size: 80px; position: relative; }
.badge { position: absolute; top: 12px; left: 12px; font-size: 10px; font-weight: 900; padding: 4px 11px; border-radius: 100px; color: white; }
.badge.bestseller { background: var(--orange); }
.badge.new { background: var(--teal); }
.badge.sale { background: var(--pink); }
.badge.pick { background: var(--navy); }
.wish-btn { position: absolute; top: 10px; right: 10px; width: 32px; height: 32px; border-radius: 50%; background: white; border: 1.5px solid var(--border); font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); transition: transform 0.15s; }
.wish-btn:hover { transform: scale(1.15); }

.pcard-body { padding: 16px; }
.page-tag { display: inline-block; font-size: 11px; font-weight: 800; padding: 3px 9px; border-radius: 100px; margin-bottom: 8px; }
.pcard-name { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 4px; line-height: 1.3; }
.pcard-desc { font-size: 12px; color: var(--text-muted); margin-bottom: 10px; font-weight: 700; display: none; }
.pcard-stars { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--text-muted); margin-bottom: 12px; font-weight: 700; }
.pcard-stars span { color: #FFBE00; font-size: 13px; }
.pcard-foot { display: flex; align-items: center; justify-content: space-between; }
.pcard-price { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: var(--orange); }
.pcard-mrp { font-size: 12px; color: var(--text-muted); text-decoration: line-through; margin-left: 4px; }
.pcard-off { font-size: 11px; color: var(--green); font-weight: 900; margin-left: 4px; }
.add-btn { width: 38px; height: 38px; border-radius: 50%; background: var(--orange); color: white; border: none; font-size: 22px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(255,107,26,0.3); transition: transform 0.15s, background 0.2s; }
.add-btn:hover { background: var(--orange-dark); transform: scale(1.1); }

/* No results */
.no-results { text-align: center; padding: 80px 20px; }
.no-results-emoji { font-size: 64px; margin-bottom: 20px; }
.no-results-title { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
.no-results-sub { font-size: 15px; color: var(--text-muted); font-weight: 700; }

/* Load more */
.load-more-wrap { text-align: center; margin-top: 40px; }
.load-more-btn { background: white; color: var(--teal); border: 2px solid var(--teal); border-radius: 100px; padding: 14px 40px; font-size: 15px; font-weight: 900; font-family: 'Nunito', sans-serif; cursor: pointer; transition: background 0.2s, color 0.2s; }
.load-more-btn:hover { background: var(--teal); color: white; }

/* Cart toast */
.cart-toast { position: fixed; bottom: 28px; right: 28px; background: var(--navy); color: white; border-radius: 16px; padding: 16px 24px; font-size: 14px; font-weight: 800; box-shadow: 0 8px 32px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 12px; z-index: 999; animation: slideUp 0.3s ease; }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.toast-emoji { font-size: 20px; }
.toast-view { color: var(--yellow); font-weight: 900; cursor: pointer; margin-left: 8px; }
.toast-view:hover { text-decoration: underline; }
/* ── MOBILE RESPONSIVE ── */
@media (max-width: 768px) {

  /* NAV */
  .plp-nav-inner { padding:0 14px; height:58px; }
  .plp-logo { font-size:20px; }
  .plp-logo img { width:44px; height:44px; }
  .plp-search { display:none; }
  .plp-nav-links { display:none; }
  .plp-nav-icons { margin-left:auto; }

  /* BREADCRUMB & AGE BAR */
  .plp-breadcrumb { padding:8px 14px; font-size:12px; }
  .plp-age-bar { padding:10px 14px; gap:8px; }
  .plp-age-label { display:none; }
  .plp-age-pill { padding:6px 12px; font-size:11px; }

  /* MAIN LAYOUT - stack sidebar above products */
  .plp-wrap { grid-template-columns:1fr !important; padding:14px; gap:14px; }

  /* SIDEBAR */
  .sidebar { position:static !important; top:auto; }

  /* RESULTS BAR */
  .results-bar { flex-direction:column; align-items:flex-start; gap:10px; padding:10px 0; }
  .results-count { font-size:14px; }
  .sort-controls { width:100%; }
  .sort-select { width:100%; }

  /* PRODUCT GRID */
  .product-grid { grid-template-columns:repeat(2,1fr) !important; gap:12px; }
  .product-grid.list { grid-template-columns:1fr !important; }
  .pc-img { height:140px; font-size:56px; }
  .pc-name { font-size:13px; }
  .pc-price { font-size:17px; }
  .pc-body { padding:10px; }
  .pc-desc { display:none; }
}

@media (max-width: 400px) {
  .product-grid { grid-template-columns:1fr !important; }
}

`;

const ALL_PRODUCTS = [
  { id:1,  emoji:"🧩", name:"Montessori Wooden Stacker",     age:"1–3 yrs",  ageBg:"#FEE8F4", ageColor:"#C42A7E",  price:649,  mrp:899,  rating:4.8, reviews:124, desc:"Natural beechwood, BIS certified. Develops fine motor skills and colour recognition.",  badge:"pick",       cardBg:"#FFF5F0", category:"Puzzles",      ageMin:1, ageMax:3  },
  { id:2,  emoji:"🎨", name:"Jumbo Art Supply Kit",           age:"4–8 yrs",  ageBg:"#FFE8D6", ageColor:"#CC5500",  price:799,  mrp:1099, rating:4.7, reviews:89,  desc:"64-piece set with non-toxic water colours, pastels, and sketch pens.",                 badge:"bestseller", cardBg:"#FFFBEA", category:"Art & Craft",  ageMin:4, ageMax:8  },
  { id:3,  emoji:"🔭", name:"Junior Science Explorer",        age:"8–12 yrs", ageBg:"#E8F8DB", ageColor:"#3A7A00",  price:1199, mrp:1599, rating:4.9, reviews:56,  desc:"12 hands-on experiments with lab-grade tools. Includes instruction booklet.",          badge:"new",        cardBg:"#F0FFFE", category:"STEM Kits",   ageMin:8, ageMax:12 },
  { id:4,  emoji:"🧱", name:"STEM Architecture Blocks",       age:"5–10 yrs", ageBg:"#D6F5F3", ageColor:"#007A72",  price:899,  mrp:1199, rating:4.6, reviews:203, desc:"200-piece architectural block set. Builds spatial reasoning and creative thinking.",    badge:null,         cardBg:"#F0FFFD", category:"Building",    ageMin:5, ageMax:10 },
  { id:5,  emoji:"📚", name:"Indian Folk Tales Box Set",      age:"3–8 yrs",  ageBg:"#FEE8F4", ageColor:"#C42A7E",  price:549,  mrp:749,  rating:4.8, reviews:167, desc:"10 beautifully illustrated regional folk tales from across India.",                    badge:"sale",       cardBg:"#FFF5F8", category:"Books",       ageMin:3, ageMax:8  },
  { id:6,  emoji:"🎭", name:"Puppet Theatre Kit",             age:"4–9 yrs",  ageBg:"#FFFBEA", ageColor:"#7A5800",  price:1049, mrp:1399, rating:4.7, reviews:78,  desc:"8 hand puppets with a foldable wooden stage. Develops storytelling and creativity.",   badge:null,         cardBg:"#FFFDF0", category:"Pretend Play",ageMin:4, ageMax:9  },
  { id:7,  emoji:"🌱", name:"Kids Garden Grow Kit",           age:"6–12 yrs", ageBg:"#E8F8DB", ageColor:"#3A7A00",  price:599,  mrp:799,  rating:4.5, reviews:94,  desc:"Everything to grow 5 plants at home — seeds, soil, pots, and a full guide.",          badge:"new",        cardBg:"#F5FFF0", category:"Outdoors",    ageMin:6, ageMax:12 },
  { id:8,  emoji:"🎲", name:"Strategy Board Game Set",        age:"8–14 yrs", ageBg:"#FFE8D6", ageColor:"#CC5500",  price:1299, mrp:1699, rating:4.9, reviews:41,  desc:"3 classic strategy games in 1 box — chess, carrom, and ludo. Premium wooden pieces.", badge:null,         cardBg:"#FFFBEA", category:"Board Games",  ageMin:8, ageMax:14 },
  { id:9,  emoji:"🎵", name:"Mini Keyboard & Music Set",      age:"3–7 yrs",  ageBg:"#FEE8F4", ageColor:"#C42A7E",  price:749,  mrp:999,  rating:4.6, reviews:62,  desc:"20-key mini keyboard with 8 instrument sounds. Perfect for musical exploration.",      badge:null,         cardBg:"#FFF0F8", category:"Pretend Play",ageMin:3, ageMax:7  },
  { id:10, emoji:"🔬", name:"Microscope Starter Kit",         age:"10–14 yrs",ageBg:"#E8F8DB", ageColor:"#3A7A00",  price:1599, mrp:2099, rating:4.8, reviews:33,  desc:"40x–400x magnification. Comes with 5 pre-made slides and blank slide kit.",           badge:"new",        cardBg:"#F0FFFE", category:"STEM Kits",   ageMin:10,ageMax:14 },
  { id:11, emoji:"🪁", name:"Outdoor Activity Bundle",        age:"5–12 yrs", ageBg:"#E8F8DB", ageColor:"#3A7A00",  price:849,  mrp:1149, rating:4.5, reviews:88,  desc:"Frisbee, jump rope, and ring toss. 100% BIS certified. Great for outdoor play.",      badge:"bestseller", cardBg:"#F5FFF0", category:"Outdoors",    ageMin:5, ageMax:12 },
  { id:12, emoji:"🍳", name:"Junior Chef Cooking Set",        age:"4–10 yrs", ageBg:"#FFE8D6", ageColor:"#CC5500",  price:699,  mrp:949,  rating:4.7, reviews:115, desc:"Real child-safe utensils + simple recipe book with 10 Indian snack recipes.",          badge:"pick",       cardBg:"#FFFBEA", category:"Pretend Play",ageMin:4, ageMax:10 },
  { id:13, emoji:"🧪", name:"Slime & Chemistry Lab",          age:"7–12 yrs", ageBg:"#D6F5F3", ageColor:"#007A72",  price:499,  mrp:699,  rating:4.4, reviews:201, desc:"Make 6 types of slime safely. Non-toxic, mess-proof kit with gloves included.",        badge:"sale",       cardBg:"#F0FFFD", category:"STEM Kits",   ageMin:7, ageMax:12 },
  { id:14, emoji:"📐", name:"Young Architect Drawing Kit",    age:"8–14 yrs", ageBg:"#D6F5F3", ageColor:"#007A72",  price:649,  mrp:899,  rating:4.6, reviews:47,  desc:"Professional-grade drawing tools scaled for kids. Includes stencils, compass, ruler.", badge:null,         cardBg:"#F0FFFD", category:"Art & Craft",  ageMin:8, ageMax:14 },
  { id:15, emoji:"🚀", name:"Space Explorer Learning Kit",    age:"6–12 yrs", ageBg:"#E8F8DB", ageColor:"#3A7A00",  price:1099, mrp:1499, rating:4.9, reviews:58,  desc:"Solar system model, planet cards, star map, and telescope guide. Ignite curiosity.",  badge:"pick",       cardBg:"#F0FFFE", category:"STEM Kits",   ageMin:6, ageMax:12 },
  { id:16, emoji:"🎯", name:"Magnetic Dart Board Set",        age:"5–14 yrs", ageBg:"#FFE8D6", ageColor:"#CC5500",  price:549,  mrp:749,  rating:4.5, reviews:76,  desc:"Safe magnetic darts — no sharp tips. Includes scoreboard and 2 sets of darts.",        badge:null,         cardBg:"#FFFBEA", category:"Outdoors",    ageMin:5, ageMax:14 },
];

const CATEGORIES = ["All", "Art & Craft", "STEM Kits", "Building", "Books", "Pretend Play", "Outdoors", "Board Games", "Puzzles"];
const AGES = [
  { label:"0–2 yrs",   emoji:"🍼", bg:"#FEE8F4", color:"#C42A7E", min:0,  max:2  },
  { label:"2–5 yrs",   emoji:"🧸", bg:"#FFE8D6", color:"#CC5500", min:2,  max:5  },
  { label:"5–8 yrs",   emoji:"🎨", bg:"#D6F5F3", color:"#007A72", min:5,  max:8  },
  { label:"8–12 yrs",  emoji:"🔬", bg:"#E8F8DB", color:"#3A7A00", min:8,  max:12 },
  { label:"12–14 yrs", emoji:"🎭", bg:"#FFFBEA", color:"#7A5800", min:12, max:14 },
];

const off = (p, m) => Math.round((1 - p / m) * 100);

export default function ProductListing() {
  const { navigate, cartCount, addToCart } = useApp();
  const [search, setSearch]         = useState("");
  const [activeAge, setActiveAge]   = useState(null);
  const [category, setCategory]     = useState("All");
  const [minPrice, setMinPrice]     = useState("");
  const [maxPrice, setMaxPrice]     = useState("");
  const [minRating, setMinRating]   = useState(0);
  const [sortBy, setSortBy]         = useState("popular");
  const [viewMode, setViewMode]     = useState("grid");
  const [wish, setWish]             = useState([]);
  const [toast, setToast]           = useState(null);
  const [visible, setVisible]       = useState(8);

  const toggleWish = id => setWish(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const handleAddToCart = (p) => {
    addToCart(p);
    setToast(p.name);
    setTimeout(() => setToast(null), 2500);
  };

  const clearFilters = () => {
    setActiveAge(null); setCategory("All");
    setMinPrice(""); setMaxPrice(""); setMinRating(0);
    setSearch(""); setSortBy("popular");
  };

  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS];
    if (search)      list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
    if (activeAge)   list = list.filter(p => p.ageMin <= activeAge.max && p.ageMax >= activeAge.min);
    if (category !== "All") list = list.filter(p => p.category === category);
    if (minPrice)    list = list.filter(p => p.price >= Number(minPrice));
    if (maxPrice)    list = list.filter(p => p.price <= Number(maxPrice));
    if (minRating)   list = list.filter(p => p.rating >= minRating);

    if (sortBy === "price-low")  list.sort((a,b) => a.price - b.price);
    if (sortBy === "price-high") list.sort((a,b) => b.price - a.price);
    if (sortBy === "rating")     list.sort((a,b) => b.rating - a.rating);
    if (sortBy === "discount")   list.sort((a,b) => off(a.price,a.mrp) - off(b.price,b.mrp)).reverse();
    if (sortBy === "popular")    list.sort((a,b) => b.reviews - a.reviews);
    return list;
  }, [search, activeAge, category, minPrice, maxPrice, minRating, sortBy]);

  const shown = filtered.slice(0, visible);

  const activeFilters = [
    activeAge && { key:"age", label: activeAge.label, clear: () => setActiveAge(null) },
    category !== "All" && { key:"cat", label: category, clear: () => setCategory("All") },
    minRating && { key:"rating", label: `${minRating}★+`, clear: () => setMinRating(0) },
    (minPrice || maxPrice) && { key:"price", label:`₹${minPrice||0}–₹${maxPrice||"any"}`, clear:()=>{setMinPrice("");setMaxPrice("");} },
  ].filter(Boolean);

  return (
    <>
      <style>{STYLES}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="logo" onClick={() => navigate("home")}>
            <img src="/brightbasics-logo.png" alt="BrightBasics"/>
            <div className="logo-text"><span className="logo-bright">Bright</span><span className="logo-basics">Basics</span></div>
          </div>
          <div className="search-bar">
            <span style={{marginRight:8,fontSize:16}}>🔍</span>
            <input placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)}/>
            {search && <span style={{cursor:"pointer",fontSize:18,color:"var(--text-muted)"}} onClick={()=>setSearch("")}>×</span>}
          </div>
          <div className="nav-right">
            {["Products","DIY Projects","About Us"].map(l => <button key={l} className="nav-link">{l}</button>)}
            <button className="icon-btn">👤</button>
            <button className="icon-btn" style={{position:"relative"}} onClick={() => navigate("cart")}>
              🛒{cartCount>0&&<span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <span className="bc-link">Home</span>
          <span className="bc-sep">›</span>
          <span className="bc-cur">{category === "All" ? "All Products" : category}</span>
          {activeAge && <><span className="bc-sep">›</span><span className="bc-cur">{activeAge.label}</span></>}
        </div>
      </div>

      {/* AGE STRIP */}
      <div className="age-strip">
        <div className="age-strip-inner">
          <span className="age-label">Filter by age →</span>
          <button
            className={`age-pill${!activeAge?" active":""}`}
            style={{background:"rgba(255,255,255,0.18)",color:"white"}}
            onClick={() => setActiveAge(null)}
          >All Ages</button>
          {AGES.map(a => (
            <button key={a.label}
              className={`age-pill${activeAge?.label===a.label?" active":""}`}
              style={{background:a.bg, color:a.color}}
              onClick={() => setActiveAge(activeAge?.label===a.label ? null : a)}
            >{a.emoji} {a.label}</button>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="plp-wrap">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-title">Filters</div>
            <button className="clear-btn" onClick={clearFilters}>Clear all</button>
          </div>

          {/* Category */}
          <div className="filter-section">
            <div className="filter-title">Category</div>
            {CATEGORIES.map(c => (
              <div key={c} className="filter-option">
                <input type="checkbox" id={`cat-${c}`} checked={category===c} onChange={()=>setCategory(c)}/>
                <label htmlFor={`cat-${c}`}>{c}</label>
                <span className="count">{c==="All" ? ALL_PRODUCTS.length : ALL_PRODUCTS.filter(p=>p.category===c).length}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="filter-section">
            <div className="filter-title">Price Range</div>
            <div className="price-inputs">
              <input className="price-input" placeholder="Min ₹" value={minPrice} onChange={e=>setMinPrice(e.target.value)} type="number"/>
              <span className="price-sep">–</span>
              <input className="price-input" placeholder="Max ₹" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} type="number"/>
            </div>
          </div>

          {/* Rating */}
          <div className="filter-section">
            <div className="filter-title">Minimum Rating</div>
            {[4.5, 4.0, 3.5].map(r => (
              <div key={r} className="rating-option">
                <input type="radio" name="rating" checked={minRating===r} onChange={()=>setMinRating(r)}/>
                <span className="rating-stars">{"★".repeat(Math.floor(r))}{r%1?".5":""}</span>
                <span className="rating-label">{r}+ only</span>
              </div>
            ))}
            <div className="rating-option">
              <input type="radio" name="rating" checked={minRating===0} onChange={()=>setMinRating(0)}/>
              <span className="rating-label" style={{color:"var(--text-muted)"}}>All ratings</span>
            </div>
          </div>

          <button className="apply-btn">Apply Filters</button>
        </aside>

        {/* CONTENT */}
        <main className="plp-main">

          {/* Top bar */}
          <div className="plp-topbar">
            <div className="plp-count">
              <span>{filtered.length}</span> products found
            </div>
            <div className="plp-controls">
              <select className="sort-select" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Biggest Discount</option>
              </select>
              <button className={`view-btn${viewMode==="grid"?" active":""}`} onClick={()=>setViewMode("grid")}>⊞</button>
              <button className={`view-btn${viewMode==="list"?" active":""}`} onClick={()=>setViewMode("list")}>☰</button>
            </div>
          </div>

          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="active-filters">
              {activeFilters.map(f => (
                <div key={f.key} className="active-filter">
                  {f.label}
                  <span className="af-remove" onClick={f.clear}>×</span>
                </div>
              ))}
            </div>
          )}

          {/* Grid */}
          {shown.length > 0 ? (
            <>
              <div className={`product-grid${viewMode==="list"?" list":""}`}>
                {shown.map((p) => (
                  <div key={p.id} className="pcard">
                    <div className="pcard-img" style={{background:p.cardBg}}>
                      <span style={{fontSize:viewMode==="list"?60:80}}>{p.emoji}</span>
                      {p.badge && (
                        <span className={`badge ${p.badge}`}>
                          {p.badge==="pick"?"FOUNDER'S PICK":p.badge.toUpperCase()}
                        </span>
                      )}
                      <button className="wish-btn" onClick={()=>toggleWish(p.id)}>
                        {wish.includes(p.id)?"❤️":"🤍"}
                      </button>
                    </div>
                    <div className="pcard-body">
                      <span className="page-tag" style={{background:p.ageBg,color:p.ageColor}}>{p.age}</span>
                      <div className="pcard-name">{p.name}</div>
                      <div className="pcard-desc">{p.desc}</div>
                      <div className="pcard-stars">
                        <span>{"★".repeat(Math.floor(p.rating))}</span>
                        {p.rating} ({p.reviews} reviews)
                      </div>
                      <div className="pcard-foot">
                        <div>
                          <span className="pcard-price">₹{p.price.toLocaleString()}</span>
                          <span className="pcard-mrp">₹{p.mrp.toLocaleString()}</span>
                          <span className="pcard-off">{off(p.price,p.mrp)}% off</span>
                        </div>
                        <button className="add-btn" onClick={()=>handleAddToCart(p)}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {visible < filtered.length && (
                <div className="load-more-wrap">
                  <button className="load-more-btn" onClick={()=>setVisible(v=>v+8)}>
                    Load more products ({filtered.length - visible} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-results">
              <div className="no-results-emoji">🔍</div>
              <div className="no-results-title">No products found</div>
              <div className="no-results-sub">Try adjusting your filters or search term</div>
              <button className="load-more-btn" style={{marginTop:20}} onClick={clearFilters}>Clear all filters</button>
            </div>
          )}
        </main>
      </div>

      {/* Cart toast */}
      {toast && (
        <div className="cart-toast">
          <span className="toast-emoji">✅</span>
          <span>Added to cart!</span>
          <span className="toast-view">View Cart →</span>
        </div>
      )}
    </>
  );
}
