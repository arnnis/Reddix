import { useRouteMatch } from "react-router-dom";
import { HOME_PATH } from "./paths";

function useMatchHome() {
  return useRouteMatch({
    path: HOME_PATH,
    strict: true,

    sensitive: true,
  });
}

export default useMatchHome;
