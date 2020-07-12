import React, { useEffect } from "react";
import styled from "styled-components";
import { setSubreddit } from "../../slices/posts/slice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const PostPage = () => {
  const { subreddit } = useParams<{ subreddit: string | undefined }>();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSubreddit(subreddit));
  }, [subreddit]);
  return <Container>fdfd</Container>;
};

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
`;

export default PostPage;
