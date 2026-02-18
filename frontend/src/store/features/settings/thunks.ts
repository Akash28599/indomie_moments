import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSettingsThunk = createAsyncThunk(
  "settings/fetch",
  async () => null
);
