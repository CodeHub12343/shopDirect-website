import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  subtotal: 0,
  appliedCoupon: null,
  discountAmount: 0,
  shippingMethod: "standard",
  shippingCost: 0,
  taxAmount: 0,
  totalAmount: 0,
  isOpen: false,
  estimatedDelivery: null,
};

// Mock coupon codes for demonstration
const VALID_COUPONS = {
  SAVE10: { code: "SAVE10", discount: 10, type: "percentage", minAmount: 50 },
  SAVE20: { code: "SAVE20", discount: 20, type: "percentage", minAmount: 100 },
  FREESHIP: { code: "FREESHIP", discount: 0, type: "shipping", minAmount: 75 },
  FLAT15: { code: "FLAT15", discount: 15, type: "fixed", minAmount: 30 },
};

// Shipping methods
const SHIPPING_METHODS = {
  standard: {
    name: "Standard Shipping",
    cost: 5.99,
    days: "3-5 business days",
  },
  express: { name: "Express Shipping", cost: 12.99, days: "1-2 business days" },
  overnight: {
    name: "Overnight Shipping",
    cost: 24.99,
    days: "Next business day",
  },
};

const calculateTotals = (state) => {
  // Calculate subtotal
  state.subtotal = state.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Calculate discount
  if (state.appliedCoupon) {
    const coupon = VALID_COUPONS[state.appliedCoupon.code];
    if (coupon && state.subtotal >= coupon.minAmount) {
      if (coupon.type === "percentage") {
        state.discountAmount = (state.subtotal * coupon.discount) / 100;
      } else if (coupon.type === "fixed") {
        state.discountAmount = Math.min(coupon.discount, state.subtotal);
      } else if (coupon.type === "shipping") {
        state.discountAmount = 0; // Shipping discount handled separately
      }
    } else {
      state.appliedCoupon = null;
      state.discountAmount = 0;
    }
  } else {
    state.discountAmount = 0;
  }

  // Calculate shipping
  const shippingMethod = SHIPPING_METHODS[state.shippingMethod];
  let shippingCost = shippingMethod.cost;

  // Apply shipping discount if coupon is for free shipping
  if (
    state.appliedCoupon &&
    VALID_COUPONS[state.appliedCoupon.code]?.type === "shipping"
  ) {
    shippingCost = 0;
  }

  // Free shipping for orders over $100 (standard shipping)
  if (state.shippingMethod === "standard" && state.subtotal >= 100) {
    shippingCost = 0;
  }

  state.shippingCost = shippingCost;

  // Calculate tax (simplified - 8.5% tax rate)
  const taxableAmount = state.subtotal - state.discountAmount;
  state.taxAmount = taxableAmount * 0.085;

  // Calculate total
  state.totalAmount = taxableAmount + state.shippingCost + state.taxAmount;

  // Update total quantity
  state.totalQuantity = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate estimated delivery
  const shippingDays = shippingMethod.days;
  const today = new Date();
  const deliveryDate = new Date(today);

  if (state.shippingMethod === "standard") {
    deliveryDate.setDate(today.getDate() + 5);
  } else if (state.shippingMethod === "express") {
    deliveryDate.setDate(today.getDate() + 2);
  } else if (state.shippingMethod === "overnight") {
    deliveryDate.setDate(today.getDate() + 1);
  }

  state.estimatedDelivery = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, selectedVariants = {} } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.product._id === product._id &&
          JSON.stringify(item.selectedVariants) ===
            JSON.stringify(selectedVariants)
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          selectedVariants,
          id: `${product._id}-${Date.now()}`,
        });
      }

      calculateTotals(state);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === itemId);

      if (itemIndex >= 0) {
        state.items.splice(itemIndex, 1);
        calculateTotals(state);
      }
    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === itemId);

      if (item) {
        item.quantity = Math.max(1, Math.min(quantity, 99));
        calculateTotals(state);
      }
    },
    applyCoupon: (state, action) => {
      const couponCode = action.payload.toUpperCase();
      const coupon = VALID_COUPONS[couponCode];

      if (coupon && state.subtotal >= coupon.minAmount) {
        state.appliedCoupon = {
          code: couponCode,
          discount: coupon.discount,
          type: coupon.type,
        };
        calculateTotals(state);
        return {
          success: true,
          message: `Coupon applied! ${coupon.discount}${
            coupon.type === "percentage" ? "%" : "$"
          } off`,
        };
      } else {
        return { success: false, message: "Invalid or expired coupon code" };
      }
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      calculateTotals(state);
    },
    updateShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
      calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
      state.discountAmount = 0;
      state.shippingMethod = "standard";
      state.shippingCost = 0;
      state.taxAmount = 0;
      state.subtotal = 0;
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.estimatedDelivery = null;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    moveToWishlist: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === itemId);

      if (itemIndex >= 0) {
        state.items.splice(itemIndex, 1);
        calculateTotals(state);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  removeCoupon,
  updateShippingMethod,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  moveToWishlist,
} = cartSlice.actions;

export default cartSlice.reducer;
