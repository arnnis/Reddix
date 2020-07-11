import { createSlice } from "@reduxjs/toolkit";

export type PostsState = Readonly<{
  list: Array<string>;
  loadingList: boolean;
  loading: { [userId: string]: boolean };
}>;

const initialState: PostsState = {
  list: [],
  loadingList: false,
  loading: {},
};

const membersSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export const postsReducer = membersSlice.reducer;

export const {} = membersSlice.actions;
