import req from "../../utils/req";
import { AppThunk } from "../../store/configureStore";
import { Category } from "./slice";
import { storeEntities } from "../entities/slice";
import { Listing } from "../../models/api";
import { Post } from "../../models/post";
import { Subreddit } from "../../models/subreddit";

export const getPosts = (
  subreddit?: string,
  category: Category = "best"
): AppThunk => async (dispatch, getState) => {
  let result = await req("OAUTH")
    .get(subreddit ? `r/${subreddit}/.json?raw_json=1` : category)
    .json<Listing<Post>>();
  console.log("posts", result);
  dispatch(storeEntities({ entity: "posts", data: result.data.children }));
  return result;
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
