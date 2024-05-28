import PhotoService from "@/services/admin/PhotoService";
import type { IPhoto } from "@/types/IPhoto";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  photos: IPhoto[];
  photo: IPhoto;
  isLoading: boolean;
  error: null | string;
};

const initialState: initialStateType = {
  photos: [],
  photo: {} as IPhoto,
  isLoading: false,
  error: null,
};

const photoSlice = createSlice({
  name: "kitchens",
  initialState,
  reducers: {
    setPhotos(state, action: { payload: IPhoto[]; type: string }) {
      state.photos = action.payload;
    },
    setPhoto(state, action: { payload: IPhoto; type: string }) {
      state.photo = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get photos
    builder.addCase(getPhotos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      if (action.payload) {
        state.photos = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getPhotos.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Get review
    builder.addCase(getPhoto.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPhoto.fulfilled, (state, action) => {
      if (action.payload) {
        state.photo = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getPhoto.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Delete review
    builder.addCase(deletePhoto.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePhoto.fulfilled, (state, action) => {
      if (action.payload) {
        const photos = [...state.photos];

        photos.forEach(function (photo, i) {
          if (photo._id == action.payload?._id) {
            photos.splice(i, 1);
          }
        });

        state.photos = photos;
      }
      state.isLoading = false;
    });
    builder.addCase(deletePhoto.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const getPhotos = createAsyncThunk("photos/getPhotos", async () => {
  try {
    const response = await PhotoService.getPhotos();
    return response;
  } catch (error) {
    console.log(error);
  }
});
export const getPhoto = createAsyncThunk(
  "photos/getPhoto",
  async (id: string) => {
    try {
      const response = await PhotoService.getPhoto(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
export const deletePhoto = createAsyncThunk(
  "photos/deletePhoto",
  async (id: string) => {
    try {
      const response = await PhotoService.deletePhoto(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const { setPhotos, setPhoto } = photoSlice.actions;

export const photoReducer = photoSlice.reducer;
