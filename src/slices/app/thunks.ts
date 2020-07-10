import { AppThunk } from "../../store/configureStore";
import { CLIENT_ID, OAUTH_CALLBACK_URL, OAUTH_URL } from "../../env";
import req from "../../utils/req";
import ky from "ky";
import { LoginResult } from "../../models/auth";
import { setToken } from "./slice";
import { history } from "../../index";

export default null;

export const logIn = (): AppThunk => (dispatch) => {
  window.location.replace(OAUTH_URL);
};

export const finishLogin = (code: string): AppThunk => async (dispatch) => {
  const fd = new FormData();
  fd.append("code", code);
  fd.append("grant_type", "authorization_code");
  fd.append("redirect_uri", OAUTH_CALLBACK_URL);

  const r = await fetch("https://www.reddit.com/api/v1/access_token", {
    headers: {
      Authorization:
        "Basic " + btoa(unescape(encodeURIComponent(CLIENT_ID + ":" + ""))),
    },
    method: "POST",
    body: fd,
  });
  const data = await r.json();
  // const data = await ky
  //   .post("https://www.reddit.com/api/v1/access_token", {
  //     body: fd,
  //   })
  //   .json<LoginResult>();

  // alert(data.access_token);

  dispatch(setToken({ token: data.access_token }));
  // window.location.replace("/home");
  history.replace("/home");
};

// import {batch} from 'react-redux';
// import { AppThunk, RootState } from '../../store/configureStore';
// import { storeEntities } from '../entities/slice';

// export const getCurrentUser = (): AppThunk => async (dispatch, getState) => {
//   try {
//     let store: RootState = getState();
//     let currentUser = store.teams.list.find((ws) => ws.id === store.teams.currentTeam)?.userId;

//     let {user}: {user: User} = await http({
//       path: '/users.info',
//       body: {
//         user: currentUser,
//         //include_count: true,
//       },
//       isFormData: true,
//     });

//     batch(() => {
//       dispatch(storeEntities({entity: 'users', data: [user]}));
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const togglePresence = (): AppThunk => async (dispatch, getState) => {
//   let state: RootState = getState();
//   let currentPresence = state.app.presence;
//   let nextPresence = select(currentPresence, {
//     away: 'auto',
//     auto: 'away',
//   });
//   try {
//     let {ok}: {ok: boolean} = await http({
//       path: '/users.setPresence',
//       body: {
//         presence: nextPresence,
//       },
//       isFormData: true,
//       silent: false,
//     });

//     if (ok) {
//       dispatch(setPresence(nextPresence));
//     }

//     return ok;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };
