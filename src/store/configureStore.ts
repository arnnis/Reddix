import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import {
  configureStore as RTKConfigureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import persistConfig from "./persistConfig";

import { appReducer } from "./../slices/app/slice";
import { entitiesReducer } from "../slices/entities/slice";
import { postsReducer } from "../slices/posts/slice";

const rootReducer = combineReducers({
  entities: entitiesReducer,

  app: appReducer,
  posts: postsReducer,
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
