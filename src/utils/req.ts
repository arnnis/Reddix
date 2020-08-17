import ky, { Hooks } from "ky";
import { store } from "../store/configureStore";
import { CLIENT_ID, OAUTH_API_URL, PUBLIC_API_URL } from "../env";
import { refreshToken } from "../slices/app/thunks";
import { LoginResult } from "../models/auth";
import { setToken, logout } from "../slices/app/slice";

type API_TYPE = "OAUTH" | "PUBLIC";

const kyHooks: Hooks = {
  afterResponse: [
    async (request, options, response) => {
      if (response.status === 401) {
        // Get a fresh token
        console.log("401: trying to refresh token...");
        // @ts-ignore
        let data: LoginResult = await store.dispatch(refreshToken());

        if (data?.access_token) {
          // Retry with the token
          request.headers.set("Authorization", `Bearer ${data.access_token}`);

          return ky(request);
        } else {
          store.dispatch(logout());
        }
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
    let token = store.getState().app.token;

    if (!token) throw new Error("401");

    let headers = {};
    if (token)
      headers = {
        Authorization: "Bearer " + token,
      };
    return ky.create({
      prefixUrl: OAUTH_API_URL,
      headers,
      hooks: kyHooks,
    });
  }
};

export default createKyInstance;
