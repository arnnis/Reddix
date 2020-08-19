import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import merge from "lodash/merge";
import { Post } from "../../models/post";
import { Subreddit } from "../../models/subreddit";
import { Data } from "../../models/api";
import { Comment } from "../../models/comment";

export type EntitiesState = Readonly<{
  posts: { byId: { [userId: string]: Post } };
  comments: { byId: { [userId: string]: Comment } };
  subreddits: { byId: { [userId: string]: Subreddit } };
}>;

const initialState: EntitiesState = {
  posts: { byId: {} },
  comments: { byId: {} },
  subreddits: { byId: {} },
};

type EntityType = keyof typeof initialState;

const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {
    storeEntities(
      state,
      action: PayloadAction<{ entity: EntityType; data: any | any[] }>
    ) {
      let { entity, data } = action.payload;

      if (!data) return;

      if (Array.isArray(data)) {
        data = data.reduce(
          (preValue, curValue) => ({
            ...preValue,
            [curValue.id]: curValue,
          }),
          {}
        );
      }

      state[entity].byId = merge(state[entity].byId, data);
    },
    updateEntity(
      state,
      action: PayloadAction<{
        entity: EntityType;
        key: string;
        data: any | Data<any>[];
      }>
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

    addRepliesToComment(
      state,
      action: PayloadAction<{ commentId: string; replies: Data<Comment>[] }>
    ) {
      const { commentId, replies } = action.payload;
      let moreIndex = state.comments.byId[commentId]?.replies?.data.children
        .map((c) => c.kind)
        .indexOf("more");
      if (!moreIndex) return;
      state.comments.byId[commentId].replies?.data.children.splice(
        moreIndex,
        1
      );

      if (!state.comments.byId[commentId]?.replies) {
      } else {
        for (let reply of replies) {
          state.comments.byId[commentId]?.replies?.data.children.push(reply);
        }
      }
    },
  },
});

export const entitiesReducer = entitiesSlice.reducer;

export const {
  storeEntities,
  updateEntity,
  addRepliesToComment,
} = entitiesSlice.actions;
