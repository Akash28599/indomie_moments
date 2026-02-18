import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAuthApi } from "../../api/userAuthApi";
import { adminAuthApi } from "../../api/adminAuthApi";

interface VerifyOtpPayload {
  phoneNumber: string;
  code: string;
}

interface AdminLoginPayload {
  username: string;
  password: string;
}


export const verifyUserOtpThunk = createAsyncThunk(
  "auth/verifyUserOtp",
  async (payload: VerifyOtpPayload, { dispatch }) => {
    const result = await dispatch(
      userAuthApi.endpoints.verifyOtp.initiate(payload)
    ).unwrap();
    return result;
  }
);

export const loginAdminThunk = createAsyncThunk(
  "auth/loginAdmin",
  async (payload: AdminLoginPayload, { dispatch }) => {
    const result = await dispatch(
      adminAuthApi.endpoints.adminLogin.initiate(payload)
    ).unwrap();
    return result;
  }
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    await dispatch(userAuthApi.endpoints.userLogout.initiate()).unwrap();
  }
);

export const logoutAdminThunk = createAsyncThunk(
  "auth/logoutAdmin",
  async (_, { dispatch }) => {
    await dispatch(adminAuthApi.endpoints.adminLogout.initiate()).unwrap();
  }
);


