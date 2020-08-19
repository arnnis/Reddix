import { useRouteMatch } from "react-router-dom";
import { HOME_PATH } from "./paths";

function useMatchHome(exact: boolean = false) {
  return useRouteMatch({
    path: HOME_PATH,
    strict: true,
    sensitive: true,
    exact,
  });
}

export default useMatchHome;
