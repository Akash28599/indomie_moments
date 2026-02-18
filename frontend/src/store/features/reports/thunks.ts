import { createAsyncThunk } from "@reduxjs/toolkit";

// Leaderboard and stats data fetched via RTK Query
export const fetchLeaderboardThunk = createAsyncThunk(
  "reports/fetchLeaderboard",
  async () => null
);
