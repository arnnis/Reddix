export const PUBLIC_API_URL = "https://www.reddit.com";
export const OAUTH_API_URL = "https://oauth.reddit.com";
export const APP_URL = "http://localhost:3000";
export const CLIENT_ID = "-q-aaV4uoRgELg";
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
export const OAUTH_CALLBACK_URL = `${APP_URL}/oauthcallback`;
export const OAUTH_URL = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=9043316759&redirect_uri=${OAUTH_CALLBACK_URL}&duration=permanent&scope=${SCOPES.join(
  " "
)}`;
