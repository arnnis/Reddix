import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { setSubreddit } from "../../slices/posts/slice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Voter from "../../components/voter";
import { Post } from "../../models/post";

const PostPage: FC = ({}) => {
  const { subreddit, postId } = useParams<{
    subreddit: string;
    postId: string;
  }>();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSubreddit(subreddit));
  }, [subreddit]);

  return <Container>{/*<Voter post={post} />*/}</Container>;
};

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
`;

export default PostPage;
