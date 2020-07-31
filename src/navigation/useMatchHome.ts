import { useRouteMatch } from "react-router-dom";
import { HOME_PATH } from "./paths";

function useMatchHome() {
  return useRouteMatch({
    path: HOME_PATH,
    strict: true,
    exact: true,
    sensitive: true,
  });
}

export default useMatchHome;
