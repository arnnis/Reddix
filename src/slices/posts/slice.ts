import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vote } from "../../models/api";

export type Category = "best" | "top" | "new";

export type PostsState = Readonly<{
  list: Array<string>;
  loadingList: boolean;
  loadingMore: boolean;
  loadError: string | null;
  loading: { [userId: string]: boolean };
  category: Category;
  subreddit: string | undefined;
  post: string | undefined;
}>;

const initialState: PostsState = {
  list: [],
  loadingList: false,
  loadingMore: false,
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
    getPostsStart(state, action: PayloadAction<{ loadMore: boolean }>) {
      if (action.payload.loadMore) state.loadingMore = true;
      else state.loadingList = true;
      state.loadError = null;
    },
    getPostsSuccess(
      state,
      action: PayloadAction<{ list: string[]; loadMore: boolean }>
    ) {
      if (action.payload.loadMore) state.loadingMore = false;
      else state.loadingList = false;
      state.list = action.payload.loadMore
        ? [...state.list, ...action.payload.list]
        : action.payload.list;
    },
    getPostsFail(
      state,
      action: PayloadAction<{ err: PostsState["loadError"]; loadMore: boolean }>
    ) {
      if (action.payload.loadMore) state.loadingMore = false;
      else state.loadingList = false;

      state.loadError = action.payload.err;
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

export const convertVoteFromReddit = (likes: null | true | false): Vote =>
  likes === true ? "upvote" : likes === false ? "downvote" : "unvote";
