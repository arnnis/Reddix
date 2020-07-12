import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Category = "best" | "top" | "new";

export type PostsState = Readonly<{
  list: Array<string>;
  loadingList: boolean;
  loading: { [userId: string]: boolean };
  category: Category;
  subreddit: string | undefined;
}>;

const initialState: PostsState = {
  list: [],
  loadingList: false,
  loading: {},
  category: "best",
  subreddit: undefined,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<Category>) {
      state.category = action.payload;
    },
    setSubreddit(state, action: PayloadAction<PostsState["subreddit"]>) {
      state.subreddit = action.payload;
    },
  },
});

export const postsReducer = postsSlice.reducer;

export const { setCategory, setSubreddit } = postsSlice.actions;
