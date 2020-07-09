import { createSlice } from "@reduxjs/toolkit";

export type UsersState = Readonly<{
  list: Array<string>;
  loadingList: boolean;
  loading: { [userId: string]: boolean };
}>;

const initialState: UsersState = {
  list: [],
  loadingList: false,
  loading: {},
};

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
});

export const postsReducer = membersSlice.reducer;

export const {} = membersSlice.actions;
