import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AppState = Readonly<{
  token: string | null;
}>;

const initialState: AppState = {
  token: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
    },
  },
});

export const appReducer = appSlice.reducer;

export const { setToken } = appSlice.actions;
