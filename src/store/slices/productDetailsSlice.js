import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProduct } from "../../services/apiProducts";

// Async thunk for fetching product details
export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchProductDetails",
  async (productId) => {
    try {
      const product = await getProduct(productId);
      return product;
    } catch (error) {
      // Fallback to mock data if API fails
      return getMockProductDetails(productId);
    }
  }
);

// Mock product details for demonstration
const getMockProductDetails = (productId) => {
  const mockProducts = {
    1: {
      _id: "1",
      name: "Premium Wireless Headphones",
      brand: "AudioTech Pro",
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      rating: 4.7,
      reviewCount: 1247,
      stock: 15,
      description:
        "Experience crystal-clear sound with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and premium comfort.",
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Bluetooth 5.0",
        "Premium comfort design",
        "Built-in microphone",
        "Touch controls",
      ],
      specifications: {
        "Battery Life": "30 hours",
        Connectivity: "Bluetooth 5.0",
        Weight: "250g",
        "Driver Size": "40mm",
        "Frequency Response": "20Hz-20kHz",
        Impedance: "32Ω",
      },
      images: [
        "headPhones-images-1.jpg",
        "headPhones-images-2.jpg",
        "headPhones-images-3.jpg",
        "headPhones-images-4.jpg",
      ],
      variants: {
        color: [
          {
            name: "Black",
            value: "black",
            stock: 8,
            image: "headPhones-images-1.jpg",
          },
          {
            name: "White",
            value: "white",
            stock: 5,
            image: "headPhones-images-2.jpg",
          },
          {
            name: "Blue",
            value: "blue",
            stock: 2,
            image: "headPhones-images-3.jpg",
          },
        ],
      },
      category: "Electronics",
      tags: ["wireless", "headphones", "audio", "bluetooth"],
      shipping: {
        free: true,
        estimatedDays: "2-3 business days",
        returnPolicy: "30-day easy returns",
      },
    },
    2: {
      _id: "2",
      name: "Smart Fitness Watch",
      brand: "FitTech",
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.5,
      reviewCount: 892,
      stock: 8,
      description:
        "Track your fitness goals with our advanced smart watch. Monitor heart rate, sleep, and activity levels with precision.",
      features: [
        "Heart rate monitoring",
        "Sleep tracking",
        "GPS navigation",
        "Water resistant",
        "7-day battery life",
        "Smart notifications",
      ],
      specifications: {
        Display: '1.4" AMOLED',
        "Battery Life": "7 days",
        "Water Resistance": "5ATM",
        Weight: "45g",
        Compatibility: "iOS/Android",
        Sensors: "Heart rate, GPS, Accelerometer",
      },
      images: [
        "wrist-watche-1.webp",
        "wrist-watche-2.jpg",
        "wrist-watche-3.jpg",
        "wrist-watche-4.jpg",
      ],
      variants: {
        color: [
          {
            name: "Black",
            value: "black",
            stock: 5,
            image: "wrist-watche-1.webp",
          },
          {
            name: "Silver",
            value: "silver",
            stock: 3,
            image: "wrist-watche-2.jpg",
          },
        ],
        size: [
          { name: "Small", value: "s", stock: 4 },
          { name: "Medium", value: "m", stock: 3 },
          { name: "Large", value: "l", stock: 1 },
        ],
      },
      category: "Electronics",
      tags: ["fitness", "smartwatch", "health", "tracking"],
      shipping: {
        free: true,
        estimatedDays: "1-2 business days",
        returnPolicy: "30-day easy returns",
      },
    },
  };

  return mockProducts[productId] || mockProducts["1"];
};

const initialState = {
  product: null,
  selectedImage: 0,
  selectedVariants: {},
  quantity: 1,
  isLoading: false,
  error: null,
  relatedProducts: [],
  recentlyViewed: [],
};

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    setSelectedVariant: (state, action) => {
      const { type, value } = action.payload;
      state.selectedVariants[type] = value;
    },
    setQuantity: (state, action) => {
      const newQuantity = Math.max(1, Math.min(action.payload, 99));
      state.quantity = newQuantity;
    },
    incrementQuantity: (state) => {
      state.quantity = Math.min(state.quantity + 1, 99);
    },
    decrementQuantity: (state) => {
      state.quantity = Math.max(state.quantity - 1, 1);
    },
    addToRecentlyViewed: (state, action) => {
      const productId = action.payload;
      if (!state.recentlyViewed.includes(productId)) {
        state.recentlyViewed.unshift(productId);
        if (state.recentlyViewed.length > 10) {
          state.recentlyViewed.pop();
        }
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.selectedImage = 0;
        state.selectedVariants = {};
        state.quantity = 1;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedImage,
  setSelectedVariant,
  setQuantity,
  incrementQuantity,
  decrementQuantity,
  addToRecentlyViewed,
  clearError,
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
