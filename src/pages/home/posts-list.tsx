import React, { FC, useEffect } from "react";
import styled from "styled-components";
import PostCell from "../../components/post-cell";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../slices/posts/thunks";
import Flex from "../../components/flex";
import { setSubreddit } from "../../slices/posts/slice";
import { RootState } from "../../store/configureStore";
import { useParams, useLocation } from "react-router-dom";
import useListEndReached from "../../utils/hooks/use-list-end-reached";

interface Props {
  subreddit?: string;
}

const PostList: FC<Props> = ({}) => {
  const { subreddit } = useParams<{ subreddit: string | undefined }>();
  const { pathname } = useLocation();
  const category = useSelector((state: RootState) => state.posts.category);
  const currentPostId = useSelector((state: RootState) => state.posts.post);
  const postsList = useSelector((state: RootState) => state.posts.list);
  const loading = useSelector((state: RootState) => state.posts.loadingList);
  const loadError = useSelector((state: RootState) => state.posts.loadError);
  const dispatch = useDispatch<any>();
  const loadingMore = loading && postsList.length;

  useEffect(() => {
    console.log("pathname:", pathname);
    console.log("subreddit:", subreddit);
    console.log("category:", category);
    getPostsList(true);
  }, [subreddit, category]);

  const listRef = useListEndReached(postsList, () => getPostsList());

  const isHome = !subreddit;

  const getPostsList = async (reload: boolean = false) => {
    dispatch(getPosts(subreddit, category, reload));
  };

  const renderPostCell = (postId: string) => (
    <PostCell key={postId} postId={postId} />
  );

  const renderLoading = () => (
    <Flex flex={1} allCenter>
      <span>Loading...</span>
    </Flex>
  );

  const renderLoadError = () => (
    <Flex allCenter>
      <span>Load errored. {loadError}</span>
    </Flex>
  );

  return (
    <Container
      style={{ visibility: currentPostId ? "hidden" : "visible" }}
      ref={listRef}
    >
      {loading && !loadingMore
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
  box-shadow: 0px 0px 15px -9px rgba(150, 150, 150, 1);
  background-color: white;
`;

export default PostList;
