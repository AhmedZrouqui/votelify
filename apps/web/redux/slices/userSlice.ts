import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import io from "socket.io-client";
import socket from "./socket";

export const connectUser = createAsyncThunk(
  "user/connectUser",
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      if (state.socket.ws !== undefined) {
        state.socket.ws.emit("CONNECT_USER", { data: "zibala" });
      }
    } catch (err) {
      thunkAPI.rejectWithValue({});
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(connectUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(connectUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(connectUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
