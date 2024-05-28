import FurnitureService from "@/services/admin/FurnitureService";
import { IFurniture } from "@/types/IFurniture";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  allFurniture: IFurniture[];
  oneFurniture: IFurniture;
  isLoading: boolean;
  error: null | string;
};

const initialState: initialStateType = {
  allFurniture: [],
  oneFurniture: {} as IFurniture,
  isLoading: false,
  error: null,
};

const furnitureSlice = createSlice({
  name: "furniture",
  initialState,
  reducers: {
    setAllFurniture(state, action: { payload: IFurniture[]; type: string }) {
      state.allFurniture = action.payload;
    },
    setOneFurniture(state, action: { payload: IFurniture; type: string }) {
      state.oneFurniture = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get all furniture
    builder.addCase(getAllFurniture.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllFurniture.fulfilled, (state, action) => {
      if (action.payload) {
        state.allFurniture = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getAllFurniture.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Get one furniture
    builder.addCase(getOneFurniture.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOneFurniture.fulfilled, (state, action) => {
      if (action.payload) {
        state.oneFurniture = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getOneFurniture.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Delete furniture
    builder.addCase(deleteFurniture.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteFurniture.fulfilled, (state, action) => {
      if (action.payload) {
        const allFurniture = [...state.allFurniture];

        allFurniture.forEach(function (furniture, i) {
          if (furniture._id == action.payload?._id) {
            allFurniture.splice(i, 1);
          }
        });

        state.allFurniture = allFurniture;
      }
      state.isLoading = false;
    });
    builder.addCase(deleteFurniture.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const getAllFurniture = createAsyncThunk(
  "claims/getAllFurniture",
  async () => {
    try {
      const response = await FurnitureService.getAllFurniture();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
export const getOneFurniture = createAsyncThunk(
  "claims/getOneFurniture",
  async (id: string) => {
    try {
      const response = await FurnitureService.getOneFurniture(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
export const deleteFurniture = createAsyncThunk(
  "claims/deleteFurniture",
  async (id: string) => {
    try {
      const response = await FurnitureService.deleteFurniture(id);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const { setAllFurniture, setOneFurniture } = furnitureSlice.actions;

export const furnitureReducer = furnitureSlice.reducer;
