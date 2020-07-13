import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
// @ts-ignore
import useScrollInfo from "react-element-scroll-hook";
import PostCell from "../../components/post-cell";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../slices/posts/thunks";
import Flex from "../../components/flex";
import { setSubreddit } from "../../slices/posts/slice";
import { RootState } from "../../store/configureStore";
import { useParams, useLocation } from "react-router-dom";

interface Props {
  subreddit?: string;
}

const PostList: FC<Props> = ({}) => {
  const { subreddit } = useParams<{ subreddit: string | undefined }>();
  const { pathname } = useLocation();
  const category = useSelector((state: RootState) => state.posts.category);
  const postsList = useSelector((state: RootState) => state.posts.list);
  const loading = useSelector((state: RootState) => state.posts.loadingList);
  const loadError = useSelector((state: RootState) => state.posts.loadError);
  const dispatch = useDispatch<any>();
  // const [scrollInfo, setRef, ref] = useScrollInfo();

  useEffect(() => {
    console.log("pathname:", pathname);
    console.log("subreddit:", subreddit);
    console.log("category:", category);
    getPostsList();
    // if (state?.currentScrollPosition)
    //   ref.current.toScroll(0, state.currentScrollPosition);
  }, [subreddit, category]);

  useEffect(() => {
    dispatch(setSubreddit(subreddit));
  }, [subreddit]);

  const isHome = !subreddit;

  const getPostsList = async () => {
    dispatch(getPosts(subreddit, category));
  };

  const renderPostCell = (postId: string) => (
    <PostCell
      key={postId}
      postId={postId}
      // currentScrollPosition={scrollInfo.y.value}
    />
  );

  const renderLoading = () => (
    <Flex allCenter>
      <span>Loading...</span>
    </Flex>
  );

  const renderLoadError = () => (
    <Flex allCenter>
      <span>Load errored. {loadError}</span>
    </Flex>
  );

  return (
    <Container>
      {loading
        ? renderLoading()
        : loadError
        ? renderLoadError()
        : postsList.map(renderPostCell)}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

export default PostList;
