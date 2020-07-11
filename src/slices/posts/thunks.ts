import req from "../../utils/req";
import { AppThunk } from "../../store/configureStore";

export default () => null;

export const getPosts = (): AppThunk => async (dispatch, getState) => {
  let data = await req("OAUTH").get("best").json();
  console.log("posts", data);
  return data;
};
