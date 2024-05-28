import { ClientAuthService } from "@/services/auth/ClientAuthService";
import type { IUser } from "@/types/IUser";
import { UserRoles } from "@/types/UserRoles";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ILogin {
  email: string;
  password: string;
}

interface TInitialState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  error: null | string;
}

const initialState: TInitialState = {
  user: {
    email: "",
    _id: "",
    isActivated: false,
    role: {
      value: UserRoles.User,
      label: "Пользователь",
    },
    activationLink: "",
  },
  isAuth: false,
  isLoading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth(state, action: { payload: boolean; type: string }) {
      state.isAuth = action.payload;
    },
    setUser(state, action: { payload: IUser; type: string }) {
      state.user = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(clientLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(clientLogin.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      }
      state.isLoading = false;
    });
    builder.addCase(clientLogin.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Check auth
    builder.addCase(clientCheckAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(clientCheckAuth.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      }
      state.isLoading = false;
    });
    builder.addCase(clientCheckAuth.rejected, (state, action) => {
      const error: any = action.payload;
      state.error = error;
      state.isLoading = false;
    });

    // Logout
    builder.addCase(clientLogout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(clientLogout.fulfilled, (state, action) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.isLoading = false;
    });
    builder.addCase(clientLogout.rejected, (state, action) => {
      const error: any = action.payload;
      state.error = error;
      state.isLoading = false;
    });
  },
});

export const clientLogin = createAsyncThunk(
  "client/login",
  async ({ email, password }: ILogin) => {
    try {
      const response = await ClientAuthService.login(email, password);

      localStorage.setItem("token", response.data.accessToken);
      return response.data.user;
    } catch (error) {
      console.log(error);
    }
  },
);

export const clientLogout = createAsyncThunk("client/logout", async () => {
  try {
    const response = await ClientAuthService.logout();

    localStorage.removeItem("token");

    return response;
  } catch (error) {
    console.log(error);
  }
});

export const clientCheckAuth = createAsyncThunk(
  "client/checkAuth",
  async () => {
    setLoading(true);
    try {
      const response = await ClientAuthService.refresh();

      localStorage.setItem("token", response.data.accessToken);
      return response.data.user;
    } catch (error) {
      console.log(error);
    }
  },
);

export const { setAuth, setUser, setLoading } = clientSlice.actions;

export const clientReducer = clientSlice.reducer;
