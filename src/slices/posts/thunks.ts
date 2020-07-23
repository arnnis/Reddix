import req from "../../utils/req";
import { AppThunk } from "../../store/configureStore";
import {
  Category,
  getPostsStart,
  getPostsFail,
  getPostsSuccess,
} from "./slice";
import { storeEntities } from "../entities/slice";
import { Listing } from "../../models/api";
import { Post } from "../../models/post";
import { Subreddit } from "../../models/subreddit";
import { batch } from "react-redux";
import { Comment } from "../../models/comment";

export const getPosts = (
  subreddit?: string,
  category: Category = "best"
): AppThunk => async (dispatch, getState) => {
  const store = getState();
  const { isLoggedIn } = store.app;
  const lastPostId = store.posts.list[store.posts.list.length - 1];
  const after = store.entities.posts.byId[lastPostId]?.name ?? "";
  dispatch(getPostsStart());

  try {
    let result: Listing<Post>;
    if (isLoggedIn) {
      result = await req("OAUTH")
        .get(
          subreddit
            ? `r/${subreddit}/.json?after=${after}&&count=${store.posts.list.length}&&raw_json=1`
            : category
        )
        .json<Listing<Post>>();
    } else {
      result = await req("PUBLIC")
        .get(
          subreddit
            ? `r/${subreddit}/.json?after=${after}&&count=${store.posts.list.length}&&raw_json=1`
            : `${category}/.json`
        )
        .json<Listing<Post>>();
    }

    console.log("posts", result);

    batch(() => {
      dispatch(storeEntities({ entity: "posts", data: result.data.children }));
      dispatch(
        getPostsSuccess(result.data.children.map(({ data }) => data.id))
      );
    });

    return result;
  } catch (e) {
    dispatch(getPostsFail(e.message));
  }
};

export const getMySubreddits = (): AppThunk => async (dispatch) => {
  let data = await req("OAUTH")
    .get("subreddits/mine.json?raw_json=1")
    .json<Listing<Subreddit>>();
  console.log("my subs", data);
  // navigator.clipboard.writeText(JSON.stringify(data));
  dispatch(storeEntities({ entity: "subreddits", data: data.data.children }));
  return data;
};

// Loads both post object and commments
export const getPostComments = (
  postId: string,
  subreddit: string
): AppThunk => async (dispatch) => {
  let data = await req("OAUTH")
    .get(`r/${subreddit}/comments/${postId}?raw_json=1&depth=3`)
    .json<[Listing<Post>, Listing<Comment>]>();
  console.log("comments", data);

  dispatch(storeEntities({ entity: "posts", data: data[0].data.children }));
  return data;
};
