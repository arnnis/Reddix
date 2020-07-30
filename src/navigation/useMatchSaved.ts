import { useRouteMatch } from "react-router-dom";
import { HOME_PATH, SAVED_PATH } from "./paths";

function useMatchSaved() {
  return useRouteMatch({
    path: SAVED_PATH,
    exact: true,
    strict: true,
    sensitive: true,
  });
}

export default useMatchSaved;
