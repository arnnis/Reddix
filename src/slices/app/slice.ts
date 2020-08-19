import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Me } from "../../models/me";

export type TokenState = {
  token: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  isLoggedIn?: boolean;
  me: Me | null;
};

export type AppState = Readonly<TokenState & {}>;

const initialState: AppState = {
  token: null,
  refreshToken: null,
  expiresIn: null,
  isLoggedIn: false,
  me: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<Partial<TokenState>>) {
      const { token, refreshToken, expiresIn, isLoggedIn } = action.payload;
      if (token) state.token = token;
      if (refreshToken) state.refreshToken = refreshToken;
      if (expiresIn) state.expiresIn = expiresIn;
      if (isLoggedIn) state.isLoggedIn = isLoggedIn;
    },
    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.expiresIn = null;
      state.isLoggedIn = false;
    },
    setMe(state, action: PayloadAction<Me>) {
      state.me = action.payload;
    },
  },
});

export const appReducer = appSlice.reducer;

export const { setToken, logout, setMe } = appSlice.actions;
