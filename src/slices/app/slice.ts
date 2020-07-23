import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TokenState = {
  token: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  isLoggedIn?: boolean;
};

export type AppState = Readonly<TokenState & {}>;

const initialState: AppState = {
  token: null,
  refreshToken: null,
  expiresIn: null,
  isLoggedIn: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<TokenState>) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.expiresIn = action.payload.expiresIn;
      state.isLoggedIn = !!action.payload.token;
    },
    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.expiresIn = null;
      state.isLoggedIn = false;
    },
  },
});

export const appReducer = appSlice.reducer;

export const { setToken, logout } = appSlice.actions;
