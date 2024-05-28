import KitchenService from "@/services/admin/KitchenService";
import { IKitchen } from "@/types/IKitchen";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  kitchens: IKitchen[];
  kitchen: IKitchen;
  isOpen: boolean;
  isLoading: boolean;
  error: null | string;
};

const initialState: initialStateType = {
  kitchens: [],
  kitchen: {} as IKitchen,
  isOpen: false,
  isLoading: false,
  error: null,
};

const kitchensSlice = createSlice({
  name: "kitchens",
  initialState,
  reducers: {
    setKitchens(state, action: { payload: IKitchen[]; type: string }) {
      state.kitchens = action.payload;
    },
    setKitchen(state, action: { payload: IKitchen; type: string }) {
      state.kitchen = action.payload;
    },
    setIsOpen(state, action: { payload: boolean; type: string }) {
      state.isOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get kitchens
    builder.addCase(getKitchens.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getKitchens.fulfilled, (state, action) => {
      if (action.payload) {
        state.kitchens = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getKitchens.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Get kitchen
    builder.addCase(getKitchen.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getKitchen.fulfilled, (state, action) => {
      if (action.payload) {
        state.kitchen = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getKitchen.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Delete kitchen
    builder.addCase(deleteKitchen.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteKitchen.fulfilled, (state, action) => {
      if (action.payload) {
        const kitchens = [...state.kitchens];

        kitchens.forEach(function (kitchen, i) {
          if (kitchen._id == action.payload?._id) {
            kitchens.splice(i, 1);
          }
        });

        state.kitchens = kitchens;
      }
      state.isLoading = false;
    });
    builder.addCase(deleteKitchen.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const getKitchens = createAsyncThunk("claims/getKitchens", async () => {
  try {
    const response = await KitchenService.getKitchens();
    return response;
  } catch (error) {
    console.log(error);
  }
});
export const getKitchen = createAsyncThunk(
  "claims/getKitchen",
  async (id: string) => {
    try {
      const response = await KitchenService.getKitchen(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
export const deleteKitchen = createAsyncThunk(
  "claims/deleteKitchen",
  async (id: string) => {
    try {
      const response = await KitchenService.deleteKitchen(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const { setKitchens, setKitchen, setIsOpen } = kitchensSlice.actions;

export const kitchensReducer = kitchensSlice.reducer;
