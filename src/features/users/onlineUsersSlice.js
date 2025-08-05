import { createSlice } from "@reduxjs/toolkit";

const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState: [],
  reducers: {
    setOnlineUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setOnlineUsers } = onlineUsersSlice.actions;
export default onlineUsersSlice.reducer;
