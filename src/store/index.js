import { configureStore } from "@reduxjs/toolkit";
import productDetailsReducer from "./slices/productDetailsSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import reviewsReducer from "./slices/reviewsSlice";

export const store = configureStore({
  reducer: {
    productDetails: productDetailsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    reviews: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
