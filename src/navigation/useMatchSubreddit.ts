import { useRouteMatch } from "react-router-dom";
import { HOME_PATH, SUBREDDIT_PATH } from "./paths";

function useMatchSubreddit(exact: boolean = false) {
  return useRouteMatch<{ subreddit: string }>({
    path: SUBREDDIT_PATH,
    strict: true,
    sensitive: true,
    exact,
  });
}

export default useMatchSubreddit;
