import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebaseLogin, firebaseRegister } from "./authApi";
import { toast } from "react-toastify";

const savedUser = JSON.parse(localStorage.getItem("user"));
const savedToken = localStorage.getItem("token");

const initialState = {
  user: savedUser || null,
  token: savedToken || null,
  isAuthenticated: !!savedToken,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await firebaseLogin({ email, password });
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      return await firebaseRegister({ username, email, password });
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      toast.info("Вы вышли из аккаунта");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(login.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.token;
        s.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(a.payload.user));
        localStorage.setItem("token", a.payload.token);

        toast.success(`Добро пожаловать, ${a.payload.user.displayName || a.payload.user.email}!`);
      })
      .addCase(login.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error.message;

        toast.error("Ошибка входа: " + s.error);
      })
      .addCase(register.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(register.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.token;
        s.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(a.payload.user));
        localStorage.setItem("token", a.payload.token);

        toast.success(`Регистрация прошла успешно. Добро пожаловать, ${a.payload.user.displayName}!`);
      })
      .addCase(register.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error.message;

        toast.error("Ошибка регистрации: " + s.error);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
