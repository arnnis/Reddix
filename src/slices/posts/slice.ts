import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Category = "best" | "top" | "new";

export type PostsState = Readonly<{
  list: Array<string>;
  loadingList: boolean;
  loadError: string | null;
  loading: { [userId: string]: boolean };
  category: Category;
  subreddit: string | undefined;
  post: string | undefined;
}>;

const initialState: PostsState = {
  list: [],
  loadingList: false,
  loadError: null,
  loading: {},
  category: "best",
  subreddit: undefined,
  post: undefined,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostsStart(state) {
      state.loadingList = true;
      state.loadError = null;
    },
    getPostsSuccess(
      state,
      action: PayloadAction<{ list: string[]; reload: boolean }>
    ) {
      state.loadingList = false;
      state.list =
        state.list.length && !action.payload.reload
          ? [...state.list, ...action.payload.list]
          : action.payload.list;
    },
    getPostsFail(state, action: PayloadAction<PostsState["loadError"]>) {
      state.loadingList = false;
      state.loadError = action.payload;
    },
    setCategory(state, action: PayloadAction<Category>) {
      state.category = action.payload;
    },
    setSubreddit(state, action: PayloadAction<PostsState["subreddit"]>) {
      state.subreddit = action.payload;
    },
    setPost(state, action: PayloadAction<PostsState["post"]>) {
      state.post = action.payload;
    },
  },
});

export const postsReducer = postsSlice.reducer;

export const {
  setCategory,
  setSubreddit,
  setPost,
  getPostsStart,
  getPostsSuccess,
  getPostsFail,
} = postsSlice.actions;
