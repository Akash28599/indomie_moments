import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../../../auth/auth.types";
import { verifyUserOtpThunk, loginAdminThunk, logoutUserThunk, logoutAdminThunk } from "./thunks";

export interface AuthState {
  user: AuthUser | null;
  admin: AuthUser | null;
}

const initialState: AuthState = {
  user: null,
  admin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.admin = null;
    },
    setAdmin(state, action: PayloadAction<AuthUser>) {
      state.admin = action.payload;
      state.user = null;
    },
    clearUser(state) {
      state.user = null;
    },
    clearAdmin(state) {
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUserOtpThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.admin = null;
      })
      .addCase(loginAdminThunk.fulfilled, (state, action) => {
        state.admin = action.payload.admin;
        state.user = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutAdminThunk.fulfilled, (state) => {
        state.admin = null;
      });
  },
});

export const { setUser, setAdmin, clearUser, clearAdmin } = authSlice.actions;
export default authSlice.reducer;
