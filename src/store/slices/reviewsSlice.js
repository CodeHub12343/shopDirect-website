import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReviews as apiGetReviews, createReview as apiCreateReview } from "../../services/apiReviews";

// Remove mock data and use live API

// Async thunk for fetching reviews
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (productId) => {
    const reviews = await apiGetReviews(productId);
    return reviews || [];
  }
);

// Async thunk for submitting a review
export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async ({ productId, title, rating, comment }) => {
    const created = await apiCreateReview(productId, {
      title,
      rating,
      review: comment,
    });
    return created;
  }
);

const initialState = {
  reviews: [],
  isLoading: false,
  error: null,
  filterRating: null,
  sortBy: "newest",
  showReviewForm: false,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setFilterRating: (state, action) => {
      state.filterRating = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    toggleReviewForm: (state) => {
      state.showReviewForm = !state.showReviewForm;
    },
    clearReviews: (state) => {
      state.reviews = [];
      state.filterRating = null;
      state.sortBy = "newest";
    },
    markReviewHelpful: (state, action) => {
      const reviewId = action.payload;
      const review = state.reviews.find((r) => (r._id || r.id) === reviewId);
      if (review) {
        review.helpful = (review.helpful || 0) + 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        if (action.payload) {
          state.reviews.unshift(action.payload);
        }
        state.showReviewForm = false;
      });
  },
});

export const {
  setFilterRating,
  setSortBy,
  toggleReviewForm,
  clearReviews,
  markReviewHelpful,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
