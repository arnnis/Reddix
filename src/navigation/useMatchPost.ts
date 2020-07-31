import { useRouteMatch } from "react-router-dom";
import { HOME_PATH, POST_PATH, SUBREDDIT_PATH } from "./paths";

function useMatchPost() {
  return useRouteMatch<{ subreddit: string; postId: string }>({
    path: POST_PATH,
    strict: true,
    sensitive: true,
  });
}

export default useMatchPost;
