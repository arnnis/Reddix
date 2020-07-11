import ky from "ky";
import { store } from "../store/configureStore";
import { OAUTH_API_URL, PUBLIC_API_URL } from "../env";

type API_TYPE = "OAUTH" | "PUBLIC";

const createKyInstance = (apiType: API_TYPE) => {
  if (apiType === "PUBLIC") {
    return ky.create({
      prefixUrl: PUBLIC_API_URL,
    });
  } else {
    const token = store.getState().app.token;
    let headers = {};
    if (token)
      headers = {
        Authorization: "Bearer " + store.getState().app.token,
      };
    return ky.create({
      prefixUrl: OAUTH_API_URL,
      headers,
    });
  }
};

export default createKyInstance;
