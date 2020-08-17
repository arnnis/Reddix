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
  },
});

export const appReducer = appSlice.reducer;

export const { setToken, logout } = appSlice.actions;
