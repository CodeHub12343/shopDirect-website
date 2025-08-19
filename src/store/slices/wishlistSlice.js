import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isOpen: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);

      if (!existingItem) {
        state.items.push(product);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    toggleWishlist: (state) => {
      state.isOpen = !state.isOpen;
    },
    openWishlist: (state) => {
      state.isOpen = true;
    },
    closeWishlist: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlist,
  openWishlist,
  closeWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
