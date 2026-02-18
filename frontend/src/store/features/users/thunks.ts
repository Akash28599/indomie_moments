import { createAsyncThunk } from "@reduxjs/toolkit";

// Placeholder for user-related async operations
export const fetchUserProfileThunk = createAsyncThunk(
  "users/fetchProfile",
  async () => {
    // API calls handled via RTK Query in components
    return null;
  }
);
