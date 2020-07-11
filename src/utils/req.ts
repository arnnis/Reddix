import ky, { Hooks } from "ky";
import { store } from "../store/configureStore";
import { OAUTH_API_URL, PUBLIC_API_URL } from "../env";

type API_TYPE = "OAUTH" | "PUBLIC";

const kyHooks: Hooks = {
  afterResponse: [
    async (request, options, response) => {
      if (response.status === 401) {
        // Get a fresh token
        const token = await ky("https://example.com/token").text();

        // Retry with the token
        request.headers.set("Authorization", `token ${token}`);

        return ky(request);
      }
    },
  ],
};

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
