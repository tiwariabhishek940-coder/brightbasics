import { useState } from "react";
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
  --green-light: #F0FAE8;
  --navy: #1A3A3A;
  --white: #FFFFFF;
  --off-white: #F0FAFA;
  --border: #B2E0DD;
  --text: #1A3A3A;
  --text-mid: #2D6B65;
  --text-muted: #7ABAB6;
  --red: #E53935;
  --red-light: #FFF0F0;
  --shadow-sm: 0 2px 10px rgba(0,169,157,0.08);
  --shadow-md: 0 8px 28px rgba(0,169,157,0.13);
}

body { font-family: 'Nunito', sans-serif; background: var(--off-white); color: var(--text); }

/* ── NAV ── */
.nav { background: white; border-bottom: 3px solid var(--teal); box-shadow: 0 2px 16px rgba(0,169,157,0.10); }
.nav-inner { display: flex; align-items: center; gap: 20px; padding: 0 24px; height: 68px; max-width: 1200px; margin: 0 auto; }
.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; cursor: pointer; }
.logo img { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
.logo-text { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 700; }
.logo-bright { color: var(--orange); }
.logo-basics { color: var(--teal); }
.nav-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: var(--text); margin-left: 8px; }
.nav-step-indicator { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.nav-step { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 800; color: var(--text-muted); }
.nav-step.active { color: var(--teal); }
.nav-step.done { color: var(--green); }
.step-circle { width: 26px; height: 26px; border-radius: 50%; border: 2px solid currentColor; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; }
.nav-step.active .step-circle { background: var(--teal); color: white; border-color: var(--teal); }
.nav-step.done .step-circle { background: var(--green); color: white; border-color: var(--green); }
.step-line { width: 32px; height: 2px; background: var(--border); }
.step-line.done { background: var(--green); }

/* ── BREADCRUMB ── */
.breadcrumb { background: white; border-bottom: 1px solid var(--border); padding: 11px 24px; }
.breadcrumb-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: var(--text-muted); }
.bc-link { color: var(--teal); cursor: pointer; }
.bc-link:hover { text-decoration: underline; }

/* ── LAYOUT ── */
.checkout-wrap { max-width: 1200px; margin: 0 auto; padding: 32px 24px; display: grid; grid-template-columns: 1fr 400px; gap: 28px; align-items: start; }

/* ── CARD ── */
.card { background: white; border-radius: 20px; border: 1.5px solid var(--border); box-shadow: var(--shadow-sm); overflow: hidden; margin-bottom: 20px; }
.card-header { padding: 18px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
.card-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: var(--text); }
.card-body { padding: 24px; }

/* ── CART ITEMS ── */
.cart-item { display: flex; align-items: center; gap: 16px; padding: 18px 0; border-bottom: 1px solid var(--border); }
.cart-item:last-child { border-bottom: none; }
.ci-img { width: 80px; height: 80px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 40px; flex-shrink: 0; }
.ci-info { flex: 1; }
.ci-name { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.ci-age { display: inline-block; font-size: 10px; font-weight: 900; padding: 2px 8px; border-radius: 100px; margin-bottom: 6px; }
.ci-desc { font-size: 12px; color: var(--text-muted); font-weight: 700; }
.ci-controls { display: flex; align-items: center; gap: 12px; }
.qty-btn { width: 30px; height: 30px; border-radius: 50%; border: 2px solid var(--border); background: white; font-size: 16px; font-weight: 900; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-mid); transition: border-color 0.2s, background 0.2s; }
.qty-btn:hover { border-color: var(--teal); background: var(--teal-light); color: var(--teal); }
.qty-val { font-size: 16px; font-weight: 900; color: var(--text); min-width: 24px; text-align: center; }
.ci-price { text-align: right; }
.ci-total { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: var(--orange); }
.ci-unit { font-size: 12px; color: var(--text-muted); font-weight: 700; margin-top: 2px; }
.ci-remove { color: var(--red); font-size: 12px; font-weight: 800; cursor: pointer; margin-top: 6px; }
.ci-remove:hover { text-decoration: underline; }

/* ── COUPON ── */
.coupon-row { display: flex; gap: 10px; }
.coupon-input { flex: 1; border: 2px solid var(--border); border-radius: 12px; padding: 11px 16px; font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 700; color: var(--text); outline: none; text-transform: uppercase; letter-spacing: 0.05em; transition: border-color 0.2s; }
.coupon-input:focus { border-color: var(--teal); }
.coupon-btn { background: var(--navy); color: white; border: none; border-radius: 12px; padding: 11px 22px; font-size: 14px; font-weight: 900; font-family: 'Nunito', sans-serif; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
.coupon-btn:hover { background: var(--teal); }
.coupon-success { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: var(--green-light); border: 1.5px solid var(--green); border-radius: 10px; font-size: 13px; font-weight: 800; color: #2A6B00; margin-top: 10px; }
.coupon-error { color: var(--red); font-size: 13px; font-weight: 800; margin-top: 8px; }

/* ── DELIVERY FORM ── */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-field.full { grid-column: span 2; }
.form-label { font-size: 12px; font-weight: 900; color: var(--text); text-transform: uppercase; letter-spacing: 0.07em; }
.form-input, .form-select { border: 2px solid var(--border); border-radius: 12px; padding: 11px 14px; font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 700; color: var(--text); outline: none; background: #FDFFFE; transition: border-color 0.2s, box-shadow 0.2s; }
.form-input:focus, .form-select:focus { border-color: var(--teal); box-shadow: 0 0 0 4px rgba(0,169,157,0.10); }
.form-input.error { border-color: var(--red); }
.form-error { font-size: 11px; font-weight: 800; color: var(--red); margin-top: 2px; }

/* Delivery options */
.delivery-options { display: flex; flex-direction: column; gap: 10px; margin-top: 4px; }
.delivery-opt { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border: 2px solid var(--border); border-radius: 14px; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
.delivery-opt.selected { border-color: var(--teal); background: var(--teal-light); }
.delivery-opt input { accent-color: var(--teal); width: 16px; height: 16px; }
.do-info { flex: 1; }
.do-name { font-size: 14px; font-weight: 800; color: var(--text); }
.do-desc { font-size: 12px; color: var(--text-muted); font-weight: 700; margin-top: 2px; }
.do-price { font-size: 14px; font-weight: 900; color: var(--teal); }

/* Payment options */
.payment-options { display: flex; flex-direction: column; gap: 10px; }
.pay-opt { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border: 2px solid var(--border); border-radius: 14px; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
.pay-opt.selected { border-color: var(--orange); background: var(--orange-light); }
.pay-opt input { accent-color: var(--orange); width: 16px; height: 16px; }
.pay-icon { font-size: 24px; }
.pay-info { flex: 1; }
.pay-name { font-size: 14px; font-weight: 800; color: var(--text); }
.pay-desc { font-size: 12px; color: var(--text-muted); font-weight: 700; margin-top: 2px; }
.pay-badge { font-size: 10px; font-weight: 900; padding: 2px 8px; border-radius: 100px; background: var(--green-light); color: var(--green); }

/* ── ORDER SUMMARY ── */
.summary-card { background: white; border-radius: 20px; border: 1.5px solid var(--border); box-shadow: var(--shadow-sm); position: sticky; top: 24px; overflow: hidden; }
.summary-header { background: var(--navy); padding: 18px 22px; }
.summary-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: white; }
.summary-body { padding: 22px; }
.summary-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; font-size: 14px; font-weight: 700; color: var(--text-mid); }
.summary-row.total { border-top: 2px solid var(--border); margin-top: 8px; padding-top: 16px; }
.summary-row.total .sr-label { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: var(--text); }
.summary-row.total .sr-val { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: var(--orange); }
.sr-label { }
.sr-val { font-weight: 800; color: var(--text); }
.sr-val.discount { color: var(--green); }
.sr-val.free { color: var(--green); }

.summary-items { margin-bottom: 18px; }
.si-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--border); }
.si-row:last-child { border-bottom: none; }
.si-emoji { font-size: 28px; }
.si-name { flex: 1; font-size: 13px; font-weight: 700; color: var(--text); }
.si-qty { font-size: 12px; color: var(--text-muted); font-weight: 800; }
.si-price { font-size: 14px; font-weight: 800; color: var(--text); }

.pay-btn {
  width: 100%; background: var(--orange); color: white;
  border: none; border-radius: 100px; padding: 17px;
  font-size: 17px; font-weight: 900; font-family: 'Nunito', sans-serif;
  cursor: pointer; margin-top: 20px;
  box-shadow: 0 6px 20px rgba(255,107,26,0.35);
  transition: background 0.2s, transform 0.15s;
  display: flex; align-items: center; justify-content: center; gap: 10px;
}
.pay-btn:hover { background: var(--orange-dark); transform: translateY(-2px); }
.pay-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.secure-note { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; font-weight: 700; color: var(--text-muted); margin-top: 14px; }
.trust-badges { display: flex; justify-content: center; gap: 16px; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); }
.tb { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 800; color: var(--text-muted); }

/* ── SUCCESS SCREEN ── */
.success-wrap { max-width: 600px; margin: 60px auto; padding: 0 24px; text-align: center; }
.success-icon { font-size: 80px; margin-bottom: 24px; animation: popIn 0.5s ease; }
@keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.success-title { font-family: 'Fraunces', serif; font-size: 36px; font-weight: 700; color: var(--text); margin-bottom: 10px; }
.success-sub { font-size: 16px; color: var(--text-muted); font-weight: 700; line-height: 1.6; margin-bottom: 32px; }
.order-id-box { background: var(--teal-light); border: 2px solid var(--teal); border-radius: 16px; padding: 20px 28px; margin-bottom: 28px; }
.oid-label { font-size: 12px; font-weight: 900; color: var(--teal); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
.oid-val { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 700; color: var(--navy); }
.tracking-steps { display: flex; justify-content: center; gap: 0; margin-bottom: 32px; }
.ts-step { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }
.ts-circle { width: 42px; height: 42px; border-radius: 50%; background: var(--teal); display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 12px rgba(0,169,157,0.3); }
.ts-circle.pending { background: var(--border); }
.ts-line { width: 100%; height: 3px; background: var(--teal); margin-top: -22px; margin-bottom: 22px; }
.ts-line.pending { background: var(--border); }
.ts-label { font-size: 11px; font-weight: 800; color: var(--text-muted); text-align: center; }
.ts-label.active { color: var(--teal); }
.success-btns { display: flex; gap: 12px; justify-content: center; }
.btn-primary { background: var(--orange); color: white; border: none; border-radius: 100px; padding: 14px 32px; font-size: 15px; font-weight: 900; font-family: 'Nunito', sans-serif; cursor: pointer; box-shadow: 0 4px 16px rgba(255,107,26,0.3); transition: background 0.2s; }
.btn-primary:hover { background: var(--orange-dark); }
.btn-outline { background: white; color: var(--teal); border: 2px solid var(--teal); border-radius: 100px; padding: 14px 32px; font-size: 15px; font-weight: 900; font-family: 'Nunito', sans-serif; cursor: pointer; transition: background 0.2s; }
.btn-outline:hover { background: var(--teal-light); }

/* ── LOADING OVERLAY ── */
.pay-overlay { position: fixed; inset: 0; background: rgba(26,58,58,0.7); display: flex; align-items: center; justify-content: center; z-index: 999; }
.pay-modal { background: white; border-radius: 24px; padding: 48px 40px; text-align: center; max-width: 380px; width: 90%; box-shadow: 0 24px 60px rgba(0,0,0,0.2); }
.pay-spinner { width: 56px; height: 56px; border: 5px solid var(--teal-light); border-top-color: var(--teal); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 20px; }
@keyframes spin { to { transform: rotate(360deg); } }
.pay-modal-title { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
.pay-modal-sub { font-size: 14px; color: var(--text-muted); font-weight: 700; }
.razorpay-badge { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 20px; font-size: 12px; font-weight: 800; color: var(--text-muted); }
`;

const INITIAL_CART = [
  { id:1, emoji:"🧩", name:"Montessori Wooden Stacker", age:"1–3 yrs", ageBg:"#FEE8F4", ageColor:"#C42A7E", cardBg:"#FFF5F0", price:649,  qty:1, desc:"Natural beechwood · BIS certified" },
  { id:2, emoji:"🎨", name:"Jumbo Art Supply Kit",       age:"4–8 yrs", ageBg:"#FFE8D6", ageColor:"#CC5500", cardBg:"#FFFBEA", price:799,  qty:2, desc:"64-piece set · Non-toxic colours"  },
  { id:3, emoji:"🔭", name:"Junior Science Explorer",    age:"8–12 yrs",ageBg:"#E8F8DB", ageColor:"#3A7A00", cardBg:"#F0FFFE", price:1199, qty:1, desc:"12 experiments · Lab-grade tools"  },
];

const COUPONS = { "BRIGHT10": 10, "BABY20": 20, "FIRST15": 15 };
const STATES = ["Andhra Pradesh","Assam","Bihar","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];

export default function CartCheckout() {
  const { navigate, cart: globalCart, addToCart } = useApp();
  const [step, setStep]           = useState("cart"); // cart | delivery | payment | success
  const [items, setItems]         = useState(INITIAL_CART);
  const [coupon, setCoupon]       = useState("");
  const [appliedCoupon, setApplied] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [delivery, setDelivery]   = useState("standard");
  const [payMethod, setPayMethod] = useState("upi");
  const [paying, setPaying]       = useState(false);
  const [orderId, setOrderId]     = useState("");

  const [form, setForm] = useState({
    name:"", phone:"", email:"",
    address:"", city:"", state:"", pincode:""
  });
  const [errors, setErrors] = useState({});

  const updateQty = (id, delta) => {
    setItems(prev => prev
      .map(i => i.id===id ? {...i, qty: Math.max(0, i.qty+delta)} : i)
      .filter(i => i.qty > 0)
    );
  };

  const subtotal    = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount    = appliedCoupon ? Math.round(subtotal * appliedCoupon / 100) : 0;
  const deliveryFee = subtotal - discount >= 599 ? 0 : (delivery === "express" ? 149 : 59);
  const total       = subtotal - discount + deliveryFee;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setApplied(COUPONS[code]);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try BRIGHT10, BABY20 or FIRST15");
      setApplied(null);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Full name is required";
    if (!form.phone.match(/^\d{10}$/)) e.phone = "Enter valid 10-digit number";
    if (!form.email.includes("@"))     e.email = "Enter valid email";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim())    e.city    = "City is required";
    if (!form.state)          e.state   = "Select a state";
    if (!form.pincode.match(/^\d{6}$/)) e.pincode = "Enter valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    if (!validate()) return;
    setPaying(true);

    // Simulate Razorpay flow
    setTimeout(() => {
      setPaying(false);
      const id = "BB" + Date.now().toString().slice(-8).toUpperCase();
      setOrderId(id);
      setStep("success");
    }, 2800);
  };

  const fv = (k) => (e) => setForm(f => ({...f, [k]: e.target.value}));

  if (step === "success") return (
    <>
      <style>{STYLES}</style>
      <nav className="nav">
        <div className="nav-inner">
          <div className="logo" onClick={() => navigate("home")}>
            <img src="/brightbasics-logo.png" alt="BrightBasics"/>
            <div className="logo-text"><span className="logo-bright">Bright</span><span className="logo-basics">Basics</span></div>
          </div>
        </div>
      </nav>
      <div className="success-wrap">
        <div className="success-icon">🎉</div>
        <div className="success-title">Order Placed!</div>
        <div className="success-sub">
          Your BrightBasics order is confirmed. We'll send tracking details to <strong>{form.email}</strong> via SMS and email.
        </div>
        <div className="order-id-box">
          <div className="oid-label">Order ID</div>
          <div className="oid-val">#{orderId}</div>
        </div>

        {/* Tracking steps */}
        <div style={{marginBottom:32}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:0,marginBottom:8}}>
            {["✅","📦","🚚","🏠"].map((e,i) => (
              <div key={i} style={{display:"flex",alignItems:"center"}}>
                <div style={{width:42,height:42,borderRadius:"50%",background:i===0?`var(--teal)`:`var(--border)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>
                  {e}
                </div>
                {i<3 && <div style={{width:56,height:3,background:i===0?`var(--teal)`:`var(--border)`}}/>}
              </div>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,fontWeight:800,color:"var(--text-muted)",padding:"0 4px"}}>
            {["Confirmed","Packed","Shipped","Delivered"].map((l,i)=>(
              <div key={l} style={{textAlign:"center",color:i===0?"var(--teal)":undefined,width:56}}>{l}</div>
            ))}
          </div>
        </div>

        <div style={{background:"var(--teal-light)",border:"1.5px solid var(--border)",borderRadius:16,padding:"18px 24px",marginBottom:32,textAlign:"left"}}>
          <div style={{fontSize:13,fontWeight:900,color:"var(--teal)",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:10}}>Delivery Details</div>
          <div style={{fontSize:14,fontWeight:700,color:"var(--text)",lineHeight:1.7}}>
            📍 {form.address}, {form.city}, {form.state} – {form.pincode}<br/>
            📱 {form.phone}<br/>
            🚚 {delivery === "express" ? "Express (1–2 days)" : "Standard (3–5 days)"} via Shiprocket
          </div>
        </div>

        <div className="success-btns">
          <button className="btn-primary">Track Order →</button>
          <button className="btn-outline" onClick={()=>{setStep("cart");setItems(INITIAL_CART);setOrderId("");}}>Continue Shopping</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{STYLES}</style>

      {paying && (
        <div className="pay-overlay">
          <div className="pay-modal">
            <div className="pay-spinner"/>
            <div className="pay-modal-title">Processing Payment…</div>
            <div className="pay-modal-sub">Please don't refresh or go back.<br/>Connecting to Razorpay securely.</div>
            <div className="razorpay-badge">🔒 Secured by Razorpay</div>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="logo" onClick={() => navigate("home")}>
            <img src="/brightbasics-logo.png" alt="BrightBasics"/>
            <div className="logo-text"><span className="logo-bright">Bright</span><span className="logo-basics">Basics</span></div>
          </div>
          <div className="nav-title">/ Checkout</div>
          <div className="nav-step-indicator">
            {[
              {key:"cart",      label:"Cart",     num:1},
              {key:"delivery",  label:"Delivery", num:2},
              {key:"payment",   label:"Payment",  num:3},
            ].map((s,i) => {
              const steps = ["cart","delivery","payment"];
              const cur   = steps.indexOf(step);
              const me    = steps.indexOf(s.key);
              const cls   = me < cur ? "done" : me === cur ? "active" : "";
              return (
                <div key={s.key} style={{display:"flex",alignItems:"center",gap:8}}>
                  {i > 0 && <div className={`step-line${me <= cur?" done":""}`}/>}
                  <div className={`nav-step ${cls}`}>
                    <div className="step-circle">{me < cur ? "✓" : s.num}</div>
                    <span>{s.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <span className="bc-link">Home</span> ›
          <span className="bc-link" style={{marginLeft:8}}>Products</span> ›
          <span style={{marginLeft:8,color:"var(--text)",fontWeight:800}}>
            {step==="cart"?"Cart":step==="delivery"?"Delivery":"Payment"}
          </span>
        </div>
      </div>

      <div className="checkout-wrap">
        <div>

          {/* ── STEP 1: CART ── */}
          {step === "cart" && (
            <>
              <div className="card">
                <div className="card-header">
                  <div className="card-title">🛒 My Cart ({items.reduce((s,i)=>s+i.qty,0)} items)</div>
                  <span style={{fontSize:13,fontWeight:800,color:"var(--text-muted)"}}>All BIS verified ✅</span>
                </div>
                <div className="card-body">
                  {items.length === 0 ? (
                    <div style={{textAlign:"center",padding:"40px 0"}}>
                      <div style={{fontSize:56,marginBottom:16}}>🛒</div>
                      <div style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:700,color:"var(--text)",marginBottom:8}}>Your cart is empty</div>
                      <div style={{fontSize:14,color:"var(--text-muted)",fontWeight:700}}>Add some products to get started!</div>
                    </div>
                  ) : items.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="ci-img" style={{background:item.cardBg}}>{item.emoji}</div>
                      <div className="ci-info">
                        <div className="ci-name">{item.name}</div>
                        <span className="ci-age" style={{background:item.ageBg,color:item.ageColor}}>{item.age}</span>
                        <div className="ci-desc">{item.desc}</div>
                        <div className="ci-controls" style={{marginTop:8}}>
                          <button className="qty-btn" onClick={()=>updateQty(item.id,-1)}>−</button>
                          <span className="qty-val">{item.qty}</span>
                          <button className="qty-btn" onClick={()=>updateQty(item.id,+1)}>+</button>
                        </div>
                      </div>
                      <div className="ci-price">
                        <div className="ci-total">₹{(item.price*item.qty).toLocaleString()}</div>
                        <div className="ci-unit">₹{item.price.toLocaleString()} each</div>
                        <div className="ci-remove" onClick={()=>updateQty(item.id,-item.qty)}>Remove</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon */}
              <div className="card">
                <div className="card-header"><div className="card-title">🎟️ Coupon Code</div></div>
                <div className="card-body">
                  {appliedCoupon ? (
                    <div className="coupon-success">
                      ✅ <span>Coupon <strong>{coupon.toUpperCase()}</strong> applied — {appliedCoupon}% off!</span>
                      <span style={{marginLeft:"auto",cursor:"pointer",color:"var(--red)",fontWeight:900}} onClick={()=>{setApplied(null);setCoupon("");}}>Remove</span>
                    </div>
                  ) : (
                    <>
                      <div className="coupon-row">
                        <input className="coupon-input" placeholder="Enter coupon code" value={coupon} onChange={e=>setCoupon(e.target.value)}/>
                        <button className="coupon-btn" onClick={applyCoupon}>Apply</button>
                      </div>
                      {couponError && <div className="coupon-error">⚠️ {couponError}</div>}
                      <div style={{fontSize:12,fontWeight:700,color:"var(--text-muted)",marginTop:10}}>Try: BRIGHT10 · BABY20 · FIRST15</div>
                    </>
                  )}
                </div>
              </div>

              <button className="pay-btn" onClick={()=>setStep("delivery")} disabled={items.length===0}>
                Continue to Delivery →
              </button>
            </>
          )}

          {/* ── STEP 2: DELIVERY ── */}
          {step === "delivery" && (
            <>
              <div className="card">
                <div className="card-header"><div className="card-title">📍 Delivery Address</div></div>
                <div className="card-body">
                  <div className="form-grid">
                    <div className="form-field">
                      <label className="form-label">Full Name *</label>
                      <input className={`form-input${errors.name?" error":""}`} placeholder="e.g. Priya Sharma" value={form.name} onChange={fv("name")}/>
                      {errors.name && <div className="form-error">{errors.name}</div>}
                    </div>
                    <div className="form-field">
                      <label className="form-label">Mobile Number *</label>
                      <input className={`form-input${errors.phone?" error":""}`} placeholder="10-digit number" value={form.phone} onChange={fv("phone")} maxLength={10}/>
                      {errors.phone && <div className="form-error">{errors.phone}</div>}
                    </div>
                    <div className="form-field full">
                      <label className="form-label">Email Address *</label>
                      <input className={`form-input${errors.email?" error":""}`} placeholder="you@example.com" value={form.email} onChange={fv("email")}/>
                      {errors.email && <div className="form-error">{errors.email}</div>}
                    </div>
                    <div className="form-field full">
                      <label className="form-label">Flat / House No. / Street *</label>
                      <input className={`form-input${errors.address?" error":""}`} placeholder="e.g. 42, MG Road, Near Lal Bagh" value={form.address} onChange={fv("address")}/>
                      {errors.address && <div className="form-error">{errors.address}</div>}
                    </div>
                    <div className="form-field">
                      <label className="form-label">City *</label>
                      <input className={`form-input${errors.city?" error":""}`} placeholder="e.g. Bhopal" value={form.city} onChange={fv("city")}/>
                      {errors.city && <div className="form-error">{errors.city}</div>}
                    </div>
                    <div className="form-field">
                      <label className="form-label">Pincode *</label>
                      <input className={`form-input${errors.pincode?" error":""}`} placeholder="6-digit pincode" value={form.pincode} onChange={fv("pincode")} maxLength={6}/>
                      {errors.pincode && <div className="form-error">{errors.pincode}</div>}
                    </div>
                    <div className="form-field full">
                      <label className="form-label">State *</label>
                      <select className={`form-select${errors.state?" error":""}`} value={form.state} onChange={fv("state")}>
                        <option value="">Select state</option>
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.state && <div className="form-error">{errors.state}</div>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header"><div className="card-title">🚚 Delivery Method</div></div>
                <div className="card-body">
                  <div className="delivery-options">
                    {[
                      {key:"standard", name:"Standard Delivery", desc:"3–5 business days via Shiprocket", price: subtotal-discount >= 599 ? "FREE" : "₹59"},
                      {key:"express",  name:"Express Delivery",  desc:"1–2 business days via Shiprocket Priority", price:"₹149"},
                    ].map(d => (
                      <div key={d.key} className={`delivery-opt${delivery===d.key?" selected":""}`} onClick={()=>setDelivery(d.key)}>
                        <input type="radio" name="delivery" checked={delivery===d.key} readOnly/>
                        <div className="do-info">
                          <div className="do-name">{d.name}</div>
                          <div className="do-desc">{d.desc}</div>
                        </div>
                        <div className="do-price" style={{color:d.price==="FREE"?"var(--green)":undefined}}>{d.price}</div>
                      </div>
                    ))}
                  </div>
                  {subtotal - discount < 599 && (
                    <div style={{marginTop:12,padding:"10px 14px",background:"var(--orange-light)",borderRadius:10,fontSize:13,fontWeight:800,color:"var(--orange)"}}>
                      💡 Add ₹{599-(subtotal-discount)} more for FREE standard delivery!
                    </div>
                  )}
                </div>
              </div>

              <div style={{display:"flex",gap:12}}>
                <button className="pay-btn" style={{background:"var(--off-white)",color:"var(--text-mid)",boxShadow:"none",border:"2px solid var(--border)"}} onClick={()=>setStep("cart")}>← Back</button>
                <button className="pay-btn" onClick={()=>{if(validate())setStep("payment");}}>Continue to Payment →</button>
              </div>
            </>
          )}

          {/* ── STEP 3: PAYMENT ── */}
          {step === "payment" && (
            <>
              <div className="card">
                <div className="card-header"><div className="card-title">💳 Payment Method</div></div>
                <div className="card-body">
                  <div className="payment-options">
                    {[
                      {key:"upi",   icon:"📱", name:"UPI",            desc:"PhonePe, GPay, Paytm, BHIM",         badge:"INSTANT"},
                      {key:"card",  icon:"💳", name:"Credit / Debit Card", desc:"Visa, Mastercard, RuPay",        badge:"SECURE"},
                      {key:"netbanking", icon:"🏦", name:"Net Banking",  desc:"All major Indian banks supported",  badge:null},
                      {key:"cod",   icon:"💵", name:"Cash on Delivery", desc:"Pay when your order arrives",       badge:"POPULAR"},
                      {key:"emi",   icon:"📅", name:"EMI",             desc:"No-cost EMI on orders above ₹3,000",badge:"0% EMI"},
                    ].map(p => (
                      <div key={p.key} className={`pay-opt${payMethod===p.key?" selected":""}`} onClick={()=>setPayMethod(p.key)}>
                        <input type="radio" name="payment" checked={payMethod===p.key} readOnly/>
                        <span className="pay-icon">{p.icon}</span>
                        <div className="pay-info">
                          <div className="pay-name">{p.name} {p.badge && <span className="pay-badge">{p.badge}</span>}</div>
                          <div className="pay-desc">{p.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* UPI input */}
              {payMethod === "upi" && (
                <div className="card">
                  <div className="card-header"><div className="card-title">Enter UPI ID</div></div>
                  <div className="card-body">
                    <input className="form-input" placeholder="yourname@paytm / @gpay / @ybl" style={{width:"100%"}}/>
                    <div style={{marginTop:12,display:"flex",gap:10}}>
                      {["📱 PhonePe","💚 GPay","💙 Paytm"].map(u => (
                        <div key={u} style={{flex:1,padding:"8px",background:"var(--off-white)",border:"1.5px solid var(--border)",borderRadius:10,textAlign:"center",fontSize:12,fontWeight:800,color:"var(--text-mid)",cursor:"pointer"}}>{u}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div style={{display:"flex",gap:12}}>
                <button className="pay-btn" style={{background:"var(--off-white)",color:"var(--text-mid)",boxShadow:"none",border:"2px solid var(--border)",flex:"0 0 auto",padding:"17px 24px"}} onClick={()=>setStep("delivery")}>← Back</button>
                <button className="pay-btn" onClick={handlePay} style={{flex:1}}>
                  🔒 Pay ₹{total.toLocaleString()} Securely
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── ORDER SUMMARY ── */}
        <div className="summary-card">
          <div className="summary-header">
            <div className="summary-title">Order Summary</div>
          </div>
          <div className="summary-body">
            <div className="summary-items">
              {items.map(i => (
                <div key={i.id} className="si-row">
                  <div className="si-emoji">{i.emoji}</div>
                  <div className="si-name">{i.name}</div>
                  <div className="si-qty">×{i.qty}</div>
                  <div className="si-price">₹{(i.price*i.qty).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span className="sr-label">Subtotal ({items.reduce((s,i)=>s+i.qty,0)} items)</span>
              <span className="sr-val">₹{subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row">
                <span className="sr-label">Coupon Discount ({appliedCoupon}%)</span>
                <span className="sr-val discount">−₹{discount.toLocaleString()}</span>
              </div>
            )}
            <div className="summary-row">
              <span className="sr-label">Delivery</span>
              <span className={`sr-val${deliveryFee===0?" free":""}`}>
                {deliveryFee === 0 ? "FREE 🎉" : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="summary-row total">
              <span className="sr-label">Total</span>
              <span className="sr-val">₹{total.toLocaleString()}</span>
            </div>

            {step === "payment" && (
              <button className="pay-btn" onClick={handlePay}>
                🔒 Pay ₹{total.toLocaleString()}
              </button>
            )}

            <div className="secure-note">🔒 100% secure payments via Razorpay</div>

            <div className="trust-badges">
              <div className="tb">✅ BIS Verified</div>
              <div className="tb">↩️ 7-day Returns</div>
              <div className="tb">📦 24hr Dispatch</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
