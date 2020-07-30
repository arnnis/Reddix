import { useRouteMatch } from "react-router-dom";
import { HOME_PATH, SUBREDDIT_PATH } from "./paths";

function useMatchSubreddit() {
  return useRouteMatch<{ subreddit: string }>({
    path: SUBREDDIT_PATH,
    strict: true,
    sensitive: true,
  });
}

export default useMatchSubreddit;
