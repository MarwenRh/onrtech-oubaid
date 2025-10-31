import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices.js";
import { toast } from "react-toastify";
import { User } from "../../../types/types.js";

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  users: User[];
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  users: [], // ✅ Always empty array
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

// Logout User
export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    return await authService.logout();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

// get Login Status
export const getLoginStatus = createAsyncThunk(
  "auth/loginStatus",
  async (_, thunkApi) => {
    try {
      return await authService.getLoginStatus();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get User
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkApi) => {
  try {
    return await authService.getUser();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

// Update user
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData: any, thunkApi) => {
    try {
      return await authService.updateUser(userData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// getUsers
export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async (_, thunkApi) => {
    try {
      return await authService.getUsers();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// delete user
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id: string, thunkAPI) => {
    try {
      return await authService.deleteUser(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// upgrade User
export const upgradeUser = createAsyncThunk(
  "auth/upgradeUser",
  async (userData: any, thunkAPI) => {
    try {
      return await authService.upgradeUser(userData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  login With google
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (userToken: string, thunkAPI) => {
    try {
      return await authService.loginWithGoogle(userToken);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET(state) {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Logout User
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        toast.success(action.payload);
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        toast.error("Logout failed. Please try again");
      })

      // get login status
      .addCase(getLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
      })
      .addCase(getLoginStatus.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // get User
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = {
          ...action.payload,
          photo: action.payload?.photo || 'https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff'
        };
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        toast.error("Failed to fetch user data");
      })

      // update a User
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = {
          ...action.payload,
          photo: action.payload?.photo || state.user?.photo || 'https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff'
        };
        toast.success("Profile updated successfully");
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        toast.error("Failed to update profile");
      })

      // get users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload || []; // ✅ Safe fallback
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.users = []; // ✅ Reset to empty array on error
        toast.error("Failed to fetch users");
      })

      // delete user
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        toast.error("Failed to delete user");
      })

      // upgrade user
      .addCase(upgradeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upgradeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(upgradeUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        toast.error("Failed to upgrade user");
      })

      // login With Google
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = {
          ...action.payload,
          photo: action.payload?.photo || 'https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff'
        };
        toast.success("Login successful");
      })
      .addCase(loginWithGoogle.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        toast.error("Google login failed");
      });
  },
});

export const { RESET } = authSlice.actions;

export default authSlice.reducer;
