import { useRouteMatch } from "react-router-dom";
import { HOME_PATH, SAVED_PATH, SETTINGS_PATH } from "./paths";

function useMatchSettings() {
  return useRouteMatch({
    path: SETTINGS_PATH,
    exact: true,
    strict: true,
    sensitive: true,
  });
}

export default useMatchSettings;
