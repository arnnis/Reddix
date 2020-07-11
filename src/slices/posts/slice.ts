import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Category = "best" | "top" | "new";

export type PostsState = Readonly<{
  list: Array<string>;
  loadingList: boolean;
  loading: { [userId: string]: boolean };
  category: Category;
}>;

const initialState: PostsState = {
  list: [],
  loadingList: false,
  loading: {},
  category: "best",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<Category>) {
      state.category = action.payload;
    },
  },
});

export const postsReducer = postsSlice.reducer;

export const { setCategory } = postsSlice.actions;
