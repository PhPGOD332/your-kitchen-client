import AdminService from "@/services/admin/AdminService";
import AdminAuthService from "@/services/auth/AdminAuthService";
import type { IUser } from "@/types/IUser";
import { UserRoles } from "@/types/UserRoles";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

interface ILogin {
  email: string;
  password: string;
}

interface TInitialState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  users: IUser[];
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
  users: [],
  isAuth: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
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
    setUsers(state, action: { payload: IUser[]; type: string }) {
      state.users = action.payload;
    },
    addNewUser(state, action: { payload: IUser; type: string }) {
      state.users.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      }
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Registration
    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      }
      state.isLoading = false;
    });
    builder.addCase(registration.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Check auth
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      }
      state.isLoading = false;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      const error: any = action.payload;
      state.error = error;
      state.isLoading = false;
    });

    // Logout
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      const error: any = action.payload;
      state.error = error;
      state.isLoading = false;
    });

    // Get users
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      if (action.payload) {
        const myUser = action.payload.find(
          (user) => current(state.user)._id === user._id,
        );

        if (myUser) {
          const usersWithoutMe = action.payload.filter(
            (user) => user._id !== myUser._id,
          );
          state.users = [myUser, ...usersWithoutMe];
        } else {
          state.users = action.payload;
        }
      }
      state.isLoading = false;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      const error: any = action.payload;
      state.error = error;
      state.isLoading = false;
    });

    // Delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const newUsers = state.users.filter(
        (user) => user._id !== action.payload?._id,
      );
      state.users = newUsers;
      state.isLoading = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      const error: any = action.payload;
      state.error = error;
      state.isLoading = false;
    });
  },
});

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: ILogin) => {
    try {
      const response = await AdminAuthService.login(email, password);

      localStorage.setItem("token", response.data.accessToken);
      return response.data.user;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (user: IUser) => {
    try {
      if (user.role.value !== UserRoles.Admin) {
        console.log("У вас нет прав администратора");
        return;
      }

      const response = await AdminService.getUsers();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: string) => {
    try {
      const response = await AdminService.deleteUser(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const registration = createAsyncThunk(
  "user/registration",
  async ({ email, password }: ILogin) => {
    try {
      const response = await AdminAuthService.registration(email, password);

      localStorage.setItem("token", response.data.accessToken);

      return response.data.user;
    } catch (error) {
      console.log(error);
    }
  },
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await AdminAuthService.logout();

    localStorage.removeItem("token");

    return response;
  } catch (error) {
    console.log(error);
  }
});

export const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  setLoading(true);
  try {
    const response = await AdminAuthService.refresh();

    localStorage.setItem("token", response.data.accessToken);
    return response.data.user;
  } catch (error) {
    console.log(error);
  }
});

export const { setAuth, setUser, setLoading } = userSlice.actions;

export const userReducer = userSlice.reducer;
