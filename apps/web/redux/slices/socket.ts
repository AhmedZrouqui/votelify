import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { RootState } from "../store";

export const connectSocket = createAsyncThunk(
  "socket/connectSocket",
  async (data, thunkAPI) => {
    try {
      return { action: "CONNECT" };
    } catch (err) {
      thunkAPI.rejectWithValue({});
    }
  }
);

const initialState: { ws: ReturnType<typeof io> | undefined } = {
  ws: undefined,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(connectSocket.fulfilled, (state, action) => {
      state.ws =
        action.payload?.action === "CONNECT"
          ? io("http://localhost:6969").connect()
          : undefined;
    });
    builder.addCase(connectSocket.pending, (state, action) => {
      state.ws = undefined;
    });
    builder.addCase(connectSocket.rejected, (state, action) => {
      state.ws = undefined;
    });
  },
});

export const selectSocket = (state: RootState) => state.socket;

export default socketSlice.reducer;
