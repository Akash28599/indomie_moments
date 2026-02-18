import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import "./api/userAuthApi";
import "./api/adminAuthApi";
import "./api/momentsApi";
import "./api/leaderboardApi";
import "./api/adminMomentsApi";
import "./api/adminUsersApi";

import authReducer from "./features/auth/slice";
import usersReducer from "./features/users/slice";
import reportsReducer from "./features/reports/slice";
import settingsReducer from "./features/settings/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "admin"], // Only persist user and admin, not loading states
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    users: usersReducer,
    reports: reportsReducer,
    settings: settingsReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
