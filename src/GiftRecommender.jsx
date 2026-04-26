import { useState } from "react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,500&family=Nunito:wght@400;600;700;800;900&display=swap');

.gr-wrap {
  font-family: 'Nunito', sans-serif;
  background: linear-gradient(135deg, #00A99D 0%, #00BFB3 50%, #008F84 100%);
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.gr-container {
  width: 100%;
  max-width: 780px;
}

/* Header */
.gr-header {
  text-align: center;
  margin-bottom: 36px;
}
.gr-logo-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}
.gr-logo-img {
  width: 52px; height: 52px;
  border-radius: 50%; object-fit: cover;
  border: 3px solid #FFD23F;
}
.gr-logo-text {
  font-family: 'Fraunces', serif;
  font-size: 24px; font-weight: 700;
}
.gr-logo-bright { color: #FF6B1A; }
.gr-logo-basics { color: #FFD23F; }

.gr-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: #FFD23F; color: #5A4000;
  border-radius: 100px; padding: 6px 16px;
  font-size: 11px; font-weight: 900;
  letter-spacing: 0.08em; text-transform: uppercase;
  margin-bottom: 16px;
}
.gr-title {
  font-family: 'Fraunces', serif;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 700; color: white;
  line-height: 1.15; margin-bottom: 10px;
}
.gr-title em { font-style: italic; color: #FFD23F; }
.gr-sub {
  font-size: 16px; color: rgba(255,255,255,0.8);
  font-weight: 600; line-height: 1.6;
}

/* Form card */
.gr-card {
  background: white;
  border-radius: 24px;
  padding: 36px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  margin-bottom: 24px;
}

.gr-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.gr-field { display: flex; flex-direction: column; gap: 8px; }
.gr-field.full { grid-column: span 2; }
.gr-label {
  font-size: 13px; font-weight: 800;
  color: #1A3A3A; text-transform: uppercase;
  letter-spacing: 0.07em;
}
.gr-input, .gr-select, .gr-textarea {
  border: 2px solid #B2E0DD;
  border-radius: 12px; padding: 12px 16px;
  font-family: 'Nunito', sans-serif;
  font-size: 15px; color: #1A3A3A;
  outline: none; background: #F5FFFE;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-weight: 600;
}
.gr-input:focus, .gr-select:focus, .gr-textarea:focus {
  border-color: #00A99D;
  box-shadow: 0 0 0 4px rgba(0,169,157,0.12);
  background: white;
}
.gr-select { cursor: pointer; }
.gr-textarea { resize: none; height: 90px; }

/* Interests pills */
.gr-interests-label {
  font-size: 13px; font-weight: 800;
  color: #1A3A3A; text-transform: uppercase;
  letter-spacing: 0.07em; margin-bottom: 10px;
  grid-column: span 2;
}
.gr-pills {
  display: flex; flex-wrap: wrap; gap: 8px;
  grid-column: span 2;
}
.gr-pill {
  padding: 8px 16px; border-radius: 100px;
  font-size: 13px; font-weight: 800;
  cursor: pointer; border: 2px solid #B2E0DD;
  background: #F5FFFE; color: #2D6B65;
  transition: all 0.18s; font-family: 'Nunito', sans-serif;
}
.gr-pill:hover { border-color: #00A99D; background: #E0F7F6; }
.gr-pill.selected {
  background: #00A99D; color: white;
  border-color: #00A99D;
}

/* Budget */
.gr-budget-row {
  display: flex; gap: 10px;
  grid-column: span 2;
}
.gr-budget-btn {
  flex: 1; padding: 10px;
  border-radius: 12px; border: 2px solid #B2E0DD;
  background: #F5FFFE; color: #2D6B65;
  font-size: 13px; font-weight: 800;
  cursor: pointer; font-family: 'Nunito', sans-serif;
  transition: all 0.18s;
}
.gr-budget-btn:hover { border-color: #FF6B1A; color: #FF6B1A; background: #FFF0E6; }
.gr-budget-btn.selected {
  background: #FF6B1A; color: white;
  border-color: #FF6B1A;
}

/* CTA button */
.gr-btn {
  width: 100%;
  background: #FF6B1A; color: white;
  border: none; border-radius: 100px;
  padding: 17px 32px; font-size: 17px; font-weight: 900;
  font-family: 'Nunito', sans-serif; cursor: pointer;
  box-shadow: 0 6px 20px rgba(255,107,26,0.35);
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 10px;
}
.gr-btn:hover:not(:disabled) {
  background: #E05510;
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(255,107,26,0.4);
}
.gr-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

/* Loading */
.gr-loading {
  text-align: center; padding: 40px 20px;
}
.gr-spinner {
  width: 52px; height: 52px;
  border: 4px solid #E0F7F6;
  border-top-color: #00A99D;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 20px;
}
@keyframes spin { to { transform: rotate(360deg); } }
.gr-loading-text {
  font-family: 'Fraunces', serif;
  font-size: 20px; font-weight: 700;
  color: #1A3A3A; margin-bottom: 6px;
}
.gr-loading-sub { font-size: 14px; color: #7ABAB6; font-weight: 700; }

/* Results */
.gr-results-header {
  text-align: center; margin-bottom: 28px;
}
.gr-results-title {
  font-family: 'Fraunces', serif;
  font-size: 26px; font-weight: 700; color: #1A3A3A;
  margin-bottom: 6px;
}
.gr-results-sub { font-size: 14px; color: #7ABAB6; font-weight: 700; }

.gr-recs { display: flex; flex-direction: column; gap: 16px; margin-bottom: 28px; }

.gr-rec {
  border: 2px solid #B2E0DD;
  border-radius: 18px; padding: 20px;
  background: #FDFFFE;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
}
.gr-rec:hover {
  border-color: #00A99D;
  box-shadow: 0 6px 24px rgba(0,169,157,0.12);
  transform: translateY(-2px);
}
.gr-rec-top {
  display: flex; align-items: flex-start;
  gap: 16px; margin-bottom: 12px;
}
.gr-rec-emoji {
  font-size: 44px; line-height: 1; flex-shrink: 0;
  width: 64px; height: 64px;
  background: #E0F7F6; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
}
.gr-rec-info { flex: 1; }
.gr-rec-name {
  font-family: 'Fraunces', serif;
  font-size: 18px; font-weight: 700; color: #1A3A3A;
  margin-bottom: 4px; line-height: 1.25;
}
.gr-rec-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 6px; }
.gr-rec-tag {
  font-size: 10px; font-weight: 900;
  padding: 3px 9px; border-radius: 100px;
  text-transform: uppercase; letter-spacing: 0.06em;
}
.gr-rec-price {
  font-family: 'Fraunces', serif;
  font-size: 20px; font-weight: 700; color: #FF6B1A;
}
.gr-rec-why {
  font-size: 14px; color: #2D6B65;
  line-height: 1.65; font-weight: 600;
  border-top: 1px solid #E0F7F6;
  padding-top: 12px;
}
.gr-rec-why strong { color: #1A3A3A; }

.gr-rec-footer {
  display: flex; justify-content: space-between;
  align-items: center; margin-top: 14px;
}
.gr-add-btn {
  background: #FF6B1A; color: white;
  border: none; border-radius: 100px;
  padding: 10px 22px; font-size: 14px; font-weight: 900;
  font-family: 'Nunito', sans-serif; cursor: pointer;
  box-shadow: 0 4px 12px rgba(255,107,26,0.3);
  transition: background 0.2s, transform 0.15s;
}
.gr-add-btn:hover { background: #E05510; transform: translateY(-1px); }
.gr-wish-btn {
  width: 38px; height: 38px; border-radius: 50%;
  background: white; border: 2px solid #B2E0DD;
  font-size: 18px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.2s;
}
.gr-wish-btn:hover { transform: scale(1.15); }

/* Summary box */
.gr-summary {
  background: #E0F7F6; border-radius: 16px;
  padding: 20px 24px; margin-bottom: 24px;
  border: 1.5px solid #B2E0DD;
}
.gr-summary-title {
  font-size: 13px; font-weight: 900; color: #00A99D;
  text-transform: uppercase; letter-spacing: 0.08em;
  margin-bottom: 8px;
}
.gr-summary-text {
  font-size: 15px; color: #1A3A3A;
  font-weight: 600; line-height: 1.65;
  font-family: 'Fraunces', serif;
  font-style: italic;
}

/* Reset */
.gr-reset {
  width: 100%; background: transparent; color: white;
  border: 2px solid rgba(255,255,255,0.4);
  border-radius: 100px; padding: 13px;
  font-size: 15px; font-weight: 800;
  font-family: 'Nunito', sans-serif; cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.gr-reset:hover { background: rgba(255,255,255,0.15); border-color: white; }

/* Error */
.gr-error {
  background: #FFF0F0; border: 2px solid #FFB3B3;
  border-radius: 14px; padding: 20px;
  text-align: center; color: #C0392B;
  font-weight: 700; font-size: 15px;
  margin-bottom: 20px;
}

.gr-divider {
  height: 1px; background: #E0F7F6;
  margin: 24px 0;
}
`;

const INTERESTS = [
  { label: "🎨 Art & Drawing",    value: "art and drawing" },
  { label: "🔬 Science & STEM",   value: "science and STEM" },
  { label: "📚 Books & Stories",  value: "books and stories" },
  { label: "🧩 Puzzles & Logic",  value: "puzzles and logic" },
  { label: "🌱 Nature & Plants",  value: "nature and plants" },
  { label: "🎭 Pretend Play",     value: "pretend play and drama" },
  { label: "🏏 Sports & Outdoor", value: "sports and outdoor activities" },
  { label: "🎲 Board Games",      value: "board games and strategy" },
  { label: "🧱 Building & LEGO",  value: "building and construction" },
  { label: "🎵 Music & Dance",    value: "music and dance" },
  { label: "🍳 Cooking & Baking", value: "cooking and baking" },
  { label: "🚀 Space & Dinosaurs",value: "space and dinosaurs" },
];

const BUDGETS = [
  { label: "Under ₹500",    value: "under ₹500" },
  { label: "₹500–₹1,000",  value: "₹500 to ₹1,000" },
  { label: "₹1,000–₹2,000",value: "₹1,000 to ₹2,000" },
  { label: "Above ₹2,000", value: "above ₹2,000" },
];

const OCCASIONS = [
  "Birthday Gift", "Diwali Gift", "Just Because",
  "Learning & Education", "Christmas Gift", "Return to School"
];

const EMOJIS = ["🧩","🎨","🔭","🧱","📚","🎭","🌱","🎲","🔬","🎯","🪁","🎪"];

async function getRecommendations({ age, gender, interests, budget, occasion, note }) {
  const prompt = `You are a kids' product expert at BrightBasics, India's curated kids' store. A parent needs gift recommendations.

Child details:
- Age: ${age} years old
- Gender: ${gender}
- Interests: ${interests.join(", ")}
- Budget: ${budget}
- Occasion: ${occasion}
${note ? `- Special note: ${note}` : ""}

Give exactly 4 product recommendations that BrightBasics would sell. Each product must be realistic, available in India, safe, and age-appropriate.

Respond ONLY with a valid JSON object in this exact format, no markdown, no extra text:
{
  "summary": "A warm, personal 1-2 sentence note to the parent about why these picks are perfect (mention child's age and interests)",
  "products": [
    {
      "name": "Product name (specific and realistic)",
      "category": "Category (e.g. STEM Kit, Art Set, Board Game)",
      "price": "₹XXX",
      "ageRange": "X–Y yrs",
      "why": "2-3 sentences on exactly why this is perfect for this specific child — mention their interests and what skill it builds",
      "safetyNote": "One line on safety or BIS compliance",
      "tag": "BESTSELLER or NEW or FOUNDER'S PICK or EDUCATIONAL"
    }
  ]
}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) throw new Error("API error");
  const data = await response.json();
  const text = data.content.filter(b => b.type === "text").map(b => b.text).join("");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

const TAG_COLORS = {
  "BESTSELLER":     { bg: "#FF6B1A", text: "#FFFFFF" },
  "NEW":            { bg: "#00A99D", text: "#FFFFFF" },
  "FOUNDER'S PICK": { bg: "#FFD23F", text: "#5A4000" },
  "EDUCATIONAL":    { bg: "#6DC43E", text: "#FFFFFF" },
};

export default function GiftRecommender() {
  const [age, setAge]           = useState("");
  const [gender, setGender]     = useState("");
  const [interests, setInterests] = useState([]);
  const [budget, setBudget]     = useState("");
  const [occasion, setOccasion] = useState("");
  const [note, setNote]         = useState("");
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState("");
  const [wish, setWish]         = useState([]);
  const [cart, setCart]         = useState(0);

  const toggleInterest = v => setInterests(i => i.includes(v) ? i.filter(x=>x!==v) : [...i, v]);
  const toggleWish = i => setWish(w => w.includes(i) ? w.filter(x=>x!==i) : [...w,i]);

  const canSubmit = age && gender && interests.length > 0 && budget && occasion;

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await getRecommendations({ age, gender, interests, budget, occasion, note });
      setResult(data);
    } catch(e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null); setError("");
    setAge(""); setGender(""); setInterests([]);
    setBudget(""); setOccasion(""); setNote("");
    setWish([]);
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="gr-wrap">
        <div className="gr-container">

          {/* Header */}
          <div className="gr-header">
            <div className="gr-logo-row">
              <img className="gr-logo-img" src="/brightbasics-logo.png" alt="BrightBasics"/>
              <div className="gr-logo-text">
                <span className="gr-logo-bright">Bright</span><span className="gr-logo-basics">Basics</span>
              </div>
            </div>
            <div className="gr-badge">🎁 AI Gift Recommender</div>
            <div className="gr-title">
              Find the <em>perfect</em> gift<br/>for every child.
            </div>
            <p className="gr-sub">Tell us about the child — we'll pick the best products from our curated catalogue.</p>
          </div>

          {/* Form */}
          {!result && !loading && (
            <div className="gr-card">
              <div className="gr-form-grid">

                {/* Age */}
                <div className="gr-field">
                  <label className="gr-label">Child's Age</label>
                  <select className="gr-select" value={age} onChange={e=>setAge(e.target.value)}>
                    <option value="">Select age</option>
                    {Array.from({length:15},(_,i)=>i).map(n=>(
                      <option key={n} value={n}>{n === 0 ? "Under 1 yr" : `${n} year${n>1?"s":""} old`}</option>
                    ))}
                  </select>
                </div>

                {/* Gender */}
                <div className="gr-field">
                  <label className="gr-label">Child's Gender</label>
                  <select className="gr-select" value={gender} onChange={e=>setGender(e.target.value)}>
                    <option value="">Select</option>
                    <option value="girl">Girl</option>
                    <option value="boy">Boy</option>
                    <option value="any">Any / Prefer not to say</option>
                  </select>
                </div>

                {/* Occasion */}
                <div className="gr-field full">
                  <label className="gr-label">Occasion</label>
                  <select className="gr-select" value={occasion} onChange={e=>setOccasion(e.target.value)}>
                    <option value="">Select occasion</option>
                    {OCCASIONS.map(o=><option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                {/* Interests */}
                <div className="gr-field full">
                  <label className="gr-label">What does the child love? (pick all that apply)</label>
                  <div className="gr-pills">
                    {INTERESTS.map(i=>(
                      <button
                        key={i.value}
                        className={`gr-pill${interests.includes(i.value)?" selected":""}`}
                        onClick={()=>toggleInterest(i.value)}
                      >{i.label}</button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="gr-field full">
                  <label className="gr-label">Your Budget</label>
                  <div className="gr-budget-row">
                    {BUDGETS.map(b=>(
                      <button
                        key={b.value}
                        className={`gr-budget-btn${budget===b.value?" selected":""}`}
                        onClick={()=>setBudget(b.value)}
                      >{b.label}</button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div className="gr-field full">
                  <label className="gr-label">Anything else? (optional)</label>
                  <textarea
                    className="gr-textarea"
                    placeholder="e.g. She loves dinosaurs but already has a lot of dinosaur toys. He's allergic to certain materials…"
                    value={note}
                    onChange={e=>setNote(e.target.value)}
                  />
                </div>

              </div>

              {error && <div className="gr-error">⚠️ {error}</div>}

              <button
                className="gr-btn"
                onClick={handleSubmit}
                disabled={!canSubmit}
              >
                {canSubmit ? "✨ Find Perfect Gifts →" : "Fill in the details above to continue"}
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="gr-card">
              <div className="gr-loading">
                <div className="gr-spinner"/>
                <div className="gr-loading-text">Finding perfect gifts…</div>
                <div className="gr-loading-sub">Our AI is browsing the BrightBasics catalogue for {age} year olds who love {interests[0]}…</div>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="gr-card">
              <div className="gr-results-header">
                <div className="gr-results-title">🎁 Your personalised gift guide</div>
                <div className="gr-results-sub">
                  For a {age}-year-old who loves {interests.slice(0,2).join(" & ")} · {budget} · {occasion}
                </div>
              </div>

              {/* AI Summary */}
              <div className="gr-summary">
                <div className="gr-summary-title">✦ Founder's note</div>
                <div className="gr-summary-text">"{result.summary}"</div>
              </div>

              {/* Product cards */}
              <div className="gr-recs">
                {result.products.map((p, i) => {
                  const tagStyle = TAG_COLORS[p.tag] || { bg: "#00A99D", text: "#FFFFFF" };
                  return (
                    <div key={i} className="gr-rec">
                      <div className="gr-rec-top">
                        <div className="gr-rec-emoji">{EMOJIS[i % EMOJIS.length]}</div>
                        <div className="gr-rec-info">
                          <div className="gr-rec-name">{p.name}</div>
                          <div className="gr-rec-tags">
                            <span className="gr-rec-tag" style={{ background: tagStyle.bg, color: tagStyle.text }}>{p.tag}</span>
                            <span className="gr-rec-tag" style={{ background: "#E0F7F6", color: "#007A72" }}>{p.ageRange}</span>
                            <span className="gr-rec-tag" style={{ background: "#F5FFFE", color: "#2D6B65", border: "1.5px solid #B2E0DD" }}>{p.category}</span>
                          </div>
                          <div className="gr-rec-price">{p.price}</div>
                        </div>
                      </div>
                      <div className="gr-rec-why">
                        {p.why}
                        <br/><br/>
                        <strong>🛡️ Safety:</strong> {p.safetyNote}
                      </div>
                      <div className="gr-rec-footer">
                        <button className="gr-add-btn" onClick={()=>setCart(c=>c+1)}>
                          Add to Cart 🛒
                        </button>
                        <button className="gr-wish-btn" onClick={()=>toggleWish(i)}>
                          {wish.includes(i) ? "❤️" : "🤍"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {cart > 0 && (
                <div style={{
                  background: "#E0F7F6", border: "2px solid #00A99D",
                  borderRadius: 14, padding: "14px 20px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  marginBottom: 20
                }}>
                  <span style={{ fontWeight: 800, color: "#1A3A3A", fontSize: 15 }}>
                    🛒 {cart} item{cart > 1 ? "s" : ""} added to cart
                  </span>
                  <button style={{
                    background: "#00A99D", color: "white",
                    border: "none", borderRadius: 100, padding: "8px 20px",
                    fontWeight: 800, fontSize: 14,
                    fontFamily: "'Nunito',sans-serif", cursor: "pointer"
                  }}>View Cart →</button>
                </div>
              )}

              <div className="gr-divider"/>
              <button className="gr-btn" onClick={handleSubmit} style={{ marginBottom: 16 }}>
                🔄 Regenerate Recommendations
              </button>
            </div>
          )}

          {/* Reset button (always shown after first submit) */}
          {(result || error) && (
            <button className="gr-reset" onClick={reset}>
              ← Start over with a different child
            </button>
          )}

        </div>
      </div>
    </>
  );
}
