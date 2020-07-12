import ky, { Hooks } from "ky";
import { store } from "../store/configureStore";
import { OAUTH_API_URL, PUBLIC_API_URL } from "../env";
import { refreshToken } from "../slices/app/thunks";
import { LoginResult } from "../models/auth";

type API_TYPE = "OAUTH" | "PUBLIC";

const kyHooks: Hooks = {
  afterResponse: [
    async (request, options, response) => {
      if (response.status === 401) {
        // Get a fresh token
        // @ts-ignore
        let data: LoginResult = await store.dispatch(refreshToken());

        // Retry with the token
        request.headers.set("Authorization", `Bearer ${data.access_token}`);

        return ky(request);
      }
    },
  ],
};

const createKyInstance = (apiType: API_TYPE) => {
  if (apiType === "PUBLIC") {
    return ky.create({
      prefixUrl: PUBLIC_API_URL,
      hooks: kyHooks,
    });
  } else {
    const token = store.getState().app.token;
    if (!token) throw new Error("401");
    let headers = {};
    if (token)
      headers = {
        Authorization: "Bearer " + store.getState().app.token,
      };
    return ky.create({
      prefixUrl: OAUTH_API_URL,
      headers,
      hooks: kyHooks,
    });
  }
};

export default createKyInstance;
