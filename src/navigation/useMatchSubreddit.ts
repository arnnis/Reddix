import { useRouteMatch } from "react-router-dom";
import { HOME_PATH, SUBREDDIT_PATH } from "./paths";

function useIsHome() {
  return useRouteMatch({
    path: SUBREDDIT_PATH,
    strict: true,
    sensitive: true,
  });
}

export default useIsHome;
