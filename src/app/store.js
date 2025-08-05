import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import onlineUsersReducer from "../features/users/onlineUsersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onlineUsers: onlineUsersReducer,
  },
});
