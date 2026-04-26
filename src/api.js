// ── BrightBasics API Service ──────────────────────────────────
// Connects React frontend to the live backend on Render

const BASE_URL = import.meta.env.VITE_API_URL || "https://brightbasics-backend.onrender.com";

// ── Helper ────────────────────────────────────────────────────
const getToken = () => localStorage.getItem("bb_token");

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };
  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
};

// ── AUTH ──────────────────────────────────────────────────────
export const auth = {
  sendOTP: (phone) =>
    request("/api/auth/send-otp", { method: "POST", body: { phone } }),

  verifyOTP: async (phone, otp) => {
    const data = await request("/api/auth/verify-otp", {
      method: "POST",
      body: { phone, otp },
    });
    if (data.token) localStorage.setItem("bb_token", data.token);
    return data;
  },

  updateProfile: (name, email) =>
    request("/api/auth/profile", { method: "PUT", body: { name, email } }),

  getMe: () => request("/api/auth/me"),

  logout: () => localStorage.removeItem("bb_token"),

  isLoggedIn: () => !!getToken(),
};

// ── PRODUCTS ─────────────────────────────────────────────────
export const products = {
  list: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return request(`/api/products?${params}`);
  },

  get: (slug) => request(`/api/products/${slug}`),

  categories: () => request("/api/products/categories/all"),

  addReview: (productId, data) =>
    request(`/api/products/${productId}/review`, { method: "POST", body: data }),
};

// ── ORDERS ───────────────────────────────────────────────────
export const orders = {
  create: (data) =>
    request("/api/orders/create", { method: "POST", body: data }),

  verifyPayment: (data) =>
    request("/api/orders/verify-payment", { method: "POST", body: data }),

  list: () => request("/api/orders"),

  get: (orderNumber) => request(`/api/orders/${orderNumber}`),

  track: (awb) => request(`/api/orders/track/${awb}`),

  saveAddress: (data) =>
    request("/api/orders/addresses", { method: "POST", body: data }),

  getAddresses: () => request("/api/orders/addresses/all"),
};

// ── MISC ──────────────────────────────────────────────────────
export const misc = {
  validateCoupon: (code, subtotal) =>
    request("/api/coupons/validate", { method: "POST", body: { code, subtotal } }),

  getWishlist: () => request("/api/wishlist"),

  addToWishlist: (productId) =>
    request(`/api/wishlist/${productId}`, { method: "POST" }),

  removeFromWishlist: (productId) =>
    request(`/api/wishlist/${productId}`, { method: "DELETE" }),

  checkPincode: (pincode) => request(`/api/pincode/${pincode}`),

  waSubscribe: (phone, child_age) =>
    request("/api/wa-subscribe", { method: "POST", body: { phone, child_age } }),

  getBundles: () => request("/api/bundles"),
};

// ── RAZORPAY CHECKOUT ─────────────────────────────────────────
export const openRazorpay = ({ amount, razorpay_order_id, order_id, order_number, user, onSuccess, onError }) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: amount * 100,
    currency: "INR",
    name: "BrightBasics",
    description: `Order #${order_number}`,
    image: "/brightbasics-logo.png",
    order_id: razorpay_order_id,
    prefill: {
      name: user?.name || "",
      contact: user?.phone || "",
      email: user?.email || "",
    },
    theme: { color: "#FF6B1A" },
    handler: async (response) => {
      try {
        await orders.verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          order_id,
        });
        onSuccess(order_number);
      } catch (err) {
        onError(err.message);
      }
    },
    modal: { ondismiss: () => onError("Payment cancelled") },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

export default { auth, products, orders, misc, openRazorpay };
