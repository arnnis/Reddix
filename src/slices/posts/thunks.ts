import req from "../../utils/req";
import { AppThunk } from "../../store/configureStore";
import {
  Category,
  getPostsStart,
  getPostsFail,
  getPostsSuccess,
} from "./slice";
import { storeEntities } from "../entities/slice";
import { Listing } from "../../models/api";
import { Post } from "../../models/post";
import { Subreddit } from "../../models/subreddit";
import { batch } from "react-redux";
import { Comment } from "../../models/comment";
import { updateEntity } from "../entities/slice";

export const getPosts = (
  subreddit?: string,
  category: Category = "best",
  reload: boolean = false
): AppThunk => async (dispatch, getState) => {
  const store = getState();
  const { isLoggedIn } = store.app;
  const lastPostId = store.posts.list[store.posts.list.length - 1];
  const after = reload ? "" : store.entities.posts.byId[lastPostId]?.name ?? "";
  dispatch(getPostsStart());

  try {
    let result: Listing<Post>;
    if (isLoggedIn) {
      result = await req("OAUTH")
        .get(
          subreddit
            ? `r/${subreddit}/.json?after=${after}&&count=${store.posts.list.length}&&raw_json=1`
            : category
        )
        .json<Listing<Post>>();
    } else {
      result = await req("PUBLIC")
        .get(
          subreddit
            ? `r/${subreddit}/.json?after=${after}&&count=${store.posts.list.length}&&raw_json=1`
            : `${category}/.json`
        )
        .json<Listing<Post>>();
    }

    console.log("posts", result);

    batch(() => {
      dispatch(
        storeEntities({
          entity: "posts",
          data: result.data.children.map((child) => child.data),
        })
      );
      dispatch(
        getPostsSuccess({
          list: result.data.children.map(({ data }) => data.id),
          reload,
        })
      );
    });

    return result;
  } catch (e) {
    dispatch(getPostsFail(e.message));
  }
};

export const getMySubreddits = (): AppThunk => async (dispatch, getState) => {
  const store = getState();
  const { isLoggedIn } = store.app;
  let data = await req(isLoggedIn ? "OAUTH" : "PUBLIC")
    .get("subreddits/mine.json?raw_json=1")
    .json<Listing<Subreddit>>();
  console.log("my subs", data);
  // navigator.clipboard.writeText(JSON.stringify(data));
  dispatch(
    storeEntities({
      entity: "subreddits",
      data: data.data.children.map((child) => child.data),
    })
  );
  return data;
};

// Loads both post object and commments
export const getPostComments = (
  postId: string,
  subreddit: string
): AppThunk => async (dispatch) => {
  let data = await req("OAUTH")
    .get(`r/${subreddit}/comments/${postId}?raw_json=1&showmore=true`)
    .json<[Listing<Post>, Listing<Comment>]>();
  console.log("comments", data);

  const commentsAndReplies: Comment[] = [];

  for (let comment of data[1].data.children) {
    commentsAndReplies.push(comment.data);

    if (comment.data.replies?.data?.children) {
      for (let reply of comment.data.replies?.data.children) {
        if (reply.kind !== "more") commentsAndReplies.push(reply.data);
      }
    }
  }

  dispatch(storeEntities({ entity: "comments", data: commentsAndReplies }));
  dispatch(
    storeEntities({
      entity: "posts",
      data: data[0].data.children.map((child) => child.data),
    })
  );
  return data;
};

export const vote = (
  id: string,
  on: "post" | "comment",
  type: "upvote" | "downvote" | "unvote"
): AppThunk => async (dispatch, getState) => {
  try {
    // let data = await req("OAUTH")
    //   .post(`api/vote`, {
    //     body: JSON.stringify({
    //       dir: type === "upvote" ? 1 : type === "downvote" ? -1 : 0,
    //       id,
    //     }),
    //   })
    //   .json<[Listing<Post>, Listing<Comment>]>();
    const store = getState();
    const entityKey = on === "post" ? "posts" : "comments";
    const entity = store.entities[entityKey].byId[id];
    const currentVoteStatus =
      entity.likes === true
        ? "upvote"
        : entity.likes === false
        ? "downvote"
        : "unvote";

    let scoreChange = type === "upvote" ? +1 : type === "downvote" ? -1 : 0;
    if (currentVoteStatus === "upvote") {
      scoreChange -= 1;
    }
    if (currentVoteStatus === "downvote") {
      scoreChange += 1;
    }
    const newScore = entity.score + scoreChange;
    const likes = type === "upvote" ? true : type === "downvote" ? false : null;
    dispatch(
      updateEntity({
        entity: entityKey,
        key: id,
        data: { score: newScore, likes },
      })
    );
  } catch (e) {
    console.log(e);
  }
};

export const loadMoreComments = (
  postId: string,
  commentId: string
): AppThunk => async (dispatch) => {
  let data = await req("OAUTH")
    .get(
      `api/morechildren?raw_json=1&link_id=${postId}&children=${commentId}&api_type=json&sort=confidence&limit_children=true`
    )
    .json<[Listing<Post>, Listing<Comment>]>();

  debugger;
};
