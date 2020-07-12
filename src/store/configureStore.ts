import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import {
  Action,
  configureStore as RTKConfigureStore,
  getDefaultMiddleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import persistConfig from "./persistConfig";

import { appReducer } from "./../slices/app/slice";
import { entitiesReducer } from "../slices/entities/slice";
import { postsReducer } from "../slices/posts/slice";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  entities: entitiesReducer,
  app: appReducer,
  posts: postsReducer,
  router: connectRouter(history),
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const logger = createLogger();

const middlewares = [...getDefaultMiddleware(), logger];

export const store = RTKConfigureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
