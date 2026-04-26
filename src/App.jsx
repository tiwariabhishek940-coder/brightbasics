import { useState, createContext, useContext, useEffect } from "react";
import BrightBasics from "./BrightBasics";
import ProductListing from "./ProductListing";
import CartCheckout from "./CartCheckout";
import GiftRecommender from "./GiftRecommender";
import { auth as authAPI } from "./api";

export const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export default function App() {
  const [page, setPage]             = useState("home");
  const [cart, setCart]             = useState([]);
  const [wish, setWish]             = useState([]);
  const [user, setUser]             = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (authAPI.isLoggedIn()) {
        try { setUser(await authAPI.getMe()); }
        catch { authAPI.logout(); }
      }
      setAuthLoading(false);
    };
    loadUser();
  }, []);

  const navigate = (to) => { setPage(to); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const toggleWish = (id) => setWish(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  const login = (userData) => setUser(userData);
  const logout = () => { authAPI.logout(); setUser(null); };

  const ctx = {
    page, navigate,
    cart, cartCount, addToCart, removeFromCart, updateQty, clearCart,
    wish, toggleWish,
    user, login, logout, authLoading,
  };

  if (authLoading) return (
    <div style={{ height:"100vh", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Nunito,sans-serif", color:"#00A99D", fontSize:18, fontWeight:700 }}>
      🌟 Loading BrightBasics...
    </div>
  );

  return (
    <AppContext.Provider value={ctx}>
      {page === "home"     && <BrightBasics />}
      {page === "products" && <ProductListing />}
      {page === "cart"     && <CartCheckout />}
      {page === "gift"     && <GiftRecommender />}
    </AppContext.Provider>
  );
}
