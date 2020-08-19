// general
export const PUBLIC_API_URL = "https://www.reddit.com";
export const OAUTH_API_URL = "https://oauth.reddit.com";
const SCOPES = [
  "identity",
  "account",
  "mysubreddits",
  "edit",
  "flair",
  "history",
  "read",
  "save",
  "vote",
];
export const DEFAULT_TITLE = "Reddix for reddit";

// prod
export const APP_URL_PROD = "https://arnnis.github.io/Reddix";
export const CLIENT_ID_PROD = "-q-aaV4uoRgELg";

// Dev
const ID_DEV = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
const CLIENT_ID_DEV = "7IWjDq1H8IAtXA";
export const APP_URL_DEV = "http://localhost:3000/Reddix";

export const APP_URL = ID_DEV ? APP_URL_DEV : APP_URL_PROD;
export const CLIENT_ID = ID_DEV ? CLIENT_ID_DEV : CLIENT_ID_PROD;

export const OAUTH_CALLBACK_URL = `${APP_URL}/oauthcallback`;
export const OAUTH_URL = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=9043316759&redirect_uri=${OAUTH_CALLBACK_URL}&duration=permanent&scope=${SCOPES.join(
  " "
)}`;
