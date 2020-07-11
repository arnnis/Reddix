import req from "../../utils/req";
import { AppThunk } from "../../store/configureStore";
import { Category, PostsState } from "./slice";

export default () => null;

export const getPosts = (
  subreddit?: string,
  category: Category = "best"
): AppThunk => async (dispatch, getState) => {
  let data = await req("OAUTH")
    .get(subreddit ? `r/${subreddit}/.json` : category)
    .json();
  console.log("posts", data);
  return data;
};

export const getMySubreddits = (): AppThunk => async (dispatch) => {
  let data = await req("OAUTH").get("subreddits/mine.json").json();
  console.log("my subs", data);
  navigator.clipboard.writeText(JSON.stringify(data));
  return data;
};
