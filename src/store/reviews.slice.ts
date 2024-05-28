import { ReviewService } from "@/services/admin/ReviewService";
import type { IReview } from "@/types/IReview";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  reviews: IReview[];
  review: IReview;
  isLoading: boolean;
  error: null | string;
};

const initialState: initialStateType = {
  reviews: [],
  review: {} as IReview,
  isLoading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: "kitchens",
  initialState,
  reducers: {
    setReviews(state, action: { payload: IReview[]; type: string }) {
      state.reviews = action.payload;
    },
    setReview(state, action: { payload: IReview; type: string }) {
      state.review = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get reviews
    builder.addCase(getReviews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      if (action.payload) {
        state.reviews = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getReviews.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Get review
    builder.addCase(getReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getReview.fulfilled, (state, action) => {
      if (action.payload) {
        state.review = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getReview.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Delete review
    builder.addCase(deleteReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      if (action.payload) {
        const reviews = [...state.reviews];

        reviews.forEach(function (review, i) {
          if (review._id == action.payload?._id) {
            reviews.splice(i, 1);
          }
        });

        state.reviews = reviews;
      }
      state.isLoading = false;
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const getReviews = createAsyncThunk("reviews/getReviews", async () => {
  try {
    const response = await ReviewService.getReviews();
    return response;
  } catch (error) {
    console.log(error);
  }
});
export const getReview = createAsyncThunk(
  "reviews/getReview",
  async (id: string) => {
    try {
      const response = await ReviewService.getReview(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id: string) => {
    try {
      const response = await ReviewService.deleteReview(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const { setReviews, setReview } = reviewsSlice.actions;

export const reviewReducer = reviewsSlice.reducer;
