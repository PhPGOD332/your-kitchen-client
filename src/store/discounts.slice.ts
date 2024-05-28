import DiscountService from "@/services/admin/DiscountService";
import type { IDiscount } from "@/types/IDiscount";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  discounts: IDiscount[];
  discount: IDiscount;
  isLoading: boolean;
  error: null | string;
};

const initialState: initialStateType = {
  discounts: [],
  discount: {} as IDiscount,
  isLoading: false,
  error: null,
};

const discountsSlise = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    setDiscounts(state, action: { payload: IDiscount[]; type: string }) {
      state.discounts = action.payload;
    },
    setDiscount(state, action: { payload: IDiscount; type: string }) {
      state.discount = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get discounts
    builder.addCase(getDiscounts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDiscounts.fulfilled, (state, action) => {
      if (action.payload) {
        state.discounts = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getDiscounts.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Get discount
    builder.addCase(getDiscount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDiscount.fulfilled, (state, action) => {
      if (action.payload) {
        state.discount = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getDiscount.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Delete discount
    builder.addCase(deleteDiscount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteDiscount.fulfilled, (state, action) => {
      if (action.payload) {
        const result = [...state.discounts];

        result.forEach(function (discount, i) {
          if (discount._id == action.payload?._id) {
            result.splice(i, 1);
          }
        });

        state.discounts = result;
      }
      state.isLoading = false;
    });
    builder.addCase(deleteDiscount.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const getDiscounts = createAsyncThunk(
  "discounts/getDiscounts",
  async () => {
    try {
      const response = await DiscountService.getDiscounts();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
export const getDiscount = createAsyncThunk(
  "discounts/getDiscount",
  async (slug: string) => {
    try {
      const response = await DiscountService.getDiscount(slug);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
export const deleteDiscount = createAsyncThunk(
  "discounts/deleteDiscount",
  async (slug: string) => {
    try {
      const response = await DiscountService.deleteDiscount(slug);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const { setDiscounts, setDiscount } = discountsSlise.actions;

export const discountReducer = discountsSlise.reducer;
