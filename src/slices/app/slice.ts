import { createSlice } from "@reduxjs/toolkit";

export type AppState = Readonly<{
  ds: "ss";
}>;

const initialState: AppState = {
  ds: "ss",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export const appReducer = appSlice.reducer;

export const {} = appSlice.actions;
