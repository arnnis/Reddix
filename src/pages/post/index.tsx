import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { setSubreddit, setPost } from "../../slices/posts/slice";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Voter from "../../components/voter";
import { Post } from "../../models/post";
import { RootState } from "../../store/configureStore";
import PostCell from "../../components/post-cell";

const PostPage: FC = ({}) => {
  const { subreddit, postId } = useParams<{
    subreddit: string;
    postId: string;
  }>();
  const { state } = useLocation();
  const dispatch = useDispatch();
  // this post object is available when it's loaded in posts list.
  const post = useSelector(
    (state: RootState) => state.entities.posts.byId[postId]
  );

  // Sync url subreddit with redux
  useEffect(() => {
    dispatch(setSubreddit(subreddit));
  }, [subreddit]);
  // Sync url postId with redux
  useEffect(() => {
    dispatch(setPost(postId));
  }, [postId]);

  useEffect(() => {
    // getPost
    console.log("post page state", state);
  }, []);

  return (
    <Container>
      {post ? <PostCell postId={postId} /> : "Post not found in redux state"}
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  width: 100%;
`;

export default PostPage;
