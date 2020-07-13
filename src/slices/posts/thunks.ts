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
  // if (getState().posts.list.length) return;
  dispatch(getPostsStart());

  try {
    let result = await req("OAUTH")
      .get(subreddit ? `r/${subreddit}/.json?raw_json=1` : category)
      .json<Listing<Post>>();

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

  // dispatch(storeEntities({ entity: "subreddits", data: data.data.children }));
  return data;
};
