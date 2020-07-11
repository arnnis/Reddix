import req from "../../utils/req";
import { AppThunk } from "../../store/configureStore";

export default () => null;

export const getPosts = (): AppThunk => async (dispatch, getState) => {
  let data = await req("OAUTH").get("best").json();
  console.log("posts", data);
  return data;
};

export const getMySubreddits = (): AppThunk => async (dispatch) => {
  let data = await req("OAUTH").get("subreddits/mine.json").json();
  console.log("my subs", data);
  navigator.clipboard.writeText(JSON.stringify(data));
  return data;
};
