import ClaimService from "@/services/admin/ClaimService";
import type { IClaim } from "@/types/IClaim";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  claims: IClaim[];
  isLoading: boolean;
  error: null | string;
};

const initialState: initialStateType = {
  claims: [],
  isLoading: false,
  error: null,
};

const claimsSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {
    setClaims(state, action: { payload: IClaim[]; type: string }) {
      state.claims = action.payload;
    },

    deleteClaimFromState(state, action: { payload: IClaim; type: string }) {
      const newClaims = [...state.claims].filter(
        (claim) => claim._id !== action.payload._id,
      );

      state.claims = newClaims;
    },
  },
  extraReducers: (builder) => {
    // Get claims
    builder.addCase(getClaims.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getClaims.fulfilled, (state, action) => {
      if (action.payload) {
        state.claims = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getClaims.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const getClaims = createAsyncThunk("claims/getClaims", async () => {
  try {
    const claims = await ClaimService.getClaims();

    return claims.data;
  } catch (error) {
    console.log(error);
  }
});

export const { setClaims, deleteClaimFromState } = claimsSlice.actions;

export const claimsReducer = claimsSlice.reducer;
