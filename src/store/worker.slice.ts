import { WorkerService } from "@/services/admin/WorkerService";
import type { IWorker } from "@/types/IWorker";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  workers: IWorker[];
  worker: IWorker;
  isLoading: boolean;
  error: null | string;
};

const initialState: initialStateType = {
  workers: [],
  worker: {} as IWorker,
  isLoading: false,
  error: null,
};

const workerSlice = createSlice({
  name: "kitchens",
  initialState,
  reducers: {
    setWorkers(state, action: { payload: IWorker[]; type: string }) {
      state.workers = action.payload;
    },
    setWorker(state, action: { payload: IWorker; type: string }) {
      state.worker = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get reviews
    builder.addCase(getWorkers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWorkers.fulfilled, (state, action) => {
      if (action.payload) {
        state.workers = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getWorkers.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Get review
    builder.addCase(getWorker.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWorker.fulfilled, (state, action) => {
      if (action.payload) {
        state.worker = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getWorker.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Delete review
    builder.addCase(deleteWorker.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteWorker.fulfilled, (state, action) => {
      if (action.payload) {
        const workers = [...state.workers];

        workers.forEach(function (worker, i) {
          if (worker._id == action.payload?._id) {
            workers.splice(i, 1);
          }
        });

        state.workers = workers;
      }
      state.isLoading = false;
    });
    builder.addCase(deleteWorker.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const getWorkers = createAsyncThunk("workers/getWorkers", async () => {
  try {
    const response = await WorkerService.getWorkers();
    return response;
  } catch (error) {
    console.log(error);
  }
});
export const getWorker = createAsyncThunk(
  "workers/getWorker",
  async (id: string) => {
    try {
      const response = await WorkerService.getWorker(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
export const deleteWorker = createAsyncThunk(
  "workers/deleteWorker",
  async (id: string) => {
    try {
      const response = await WorkerService.deleteWorker(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const { setWorkers, setWorker } = workerSlice.actions;

export const workerReducer = workerSlice.reducer;
