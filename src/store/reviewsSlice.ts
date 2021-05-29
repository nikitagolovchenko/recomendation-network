import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { fetchProducts } from '../services/fetchProducts';
import { addReviewsApi, fetchReviews } from '../services/reviewsApi';

interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: string;
}

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: '',
};

export const getReviews = createAsyncThunk('reviews/getReviews', async () => {
  const response = await fetchReviews();
  return response;
});

export const addReview = createAsyncThunk(
  'reviews/addReview',
  async (review: Review) => {
    const docId: string = await addReviewsApi(review);
    return { ...review, id: docId };
  }
);

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getReviews.pending, state => {
        state.loading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.error = '';
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(addReview.pending, state => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.unshift(action.payload);
        state.error = '';
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const {} = reviewsSlice.actions;

export const selectReviews = (state: RootState) => state.reviews;

export default reviewsSlice.reducer;
