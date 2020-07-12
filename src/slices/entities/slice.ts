import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import merge from "lodash/merge";
import { Post } from "../../models/post";
import { Subreddit } from "../../models/subreddit";
import { Data } from "../../models/api";

export type EntitiesState = Readonly<{
  posts: { byId: { [userId: string]: Post } };
  subreddits: { byId: { [userId: string]: Subreddit } };
}>;

const initialState: EntitiesState = {
  posts: { byId: {} },
  subreddits: { byId: {} },
};

type EntityType = keyof typeof initialState;

const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {
    storeEntities(
      state,
      action: PayloadAction<{ entity: EntityType; data: any | Data<any>[] }>
    ) {
      let { entity, data } = action.payload;

      if (!data) return;

      if (Array.isArray(data)) {
        data = data.reduce(
          (preValue, curValue) => ({
            ...preValue,
            [curValue.data.id]: curValue.data,
          }),
          {}
        );
      }

      state[entity].byId = merge(state[entity].byId, data);
    },
    updateEntity(
      state,
      action: PayloadAction<{ entity: EntityType; key: string; data: object }>
    ) {
      let { entity, key, data } = action.payload;
      if (!data) return;

      return {
        ...state,
        [entity]: {
          byId: {
            ...state[entity].byId,
            [key]: {
              ...(state[entity].byId[key] || {}),
              ...data,
            },
          },
        },
      };
    },
  },
});

export const entitiesReducer = entitiesSlice.reducer;

export const { storeEntities, updateEntity } = entitiesSlice.actions;
