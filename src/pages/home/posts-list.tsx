import React, { FC, useEffect } from "react";
import styled from "styled-components";
import PostCell from "../../components/post-cell";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../slices/posts/thunks";
import Flex from "../../components/flex";
import { RootState } from "../../store/configureStore";
import { useParams, useLocation } from "react-router-dom";
import useListEndReached from "../../utils/hooks/use-list-end-reached";
import useMatchPost from "../../navigation/useMatchPost";
import usePrevious from "../../utils/hooks/usePrevious";
import { Loader } from "semantic-ui-react";
import useMatchSubreddit from "../../navigation/useMatchSubreddit";
import useMatchHome from "../../navigation/useMatchHome";
import TopLoadingBar from "../../components/top-loading-bar";

const PostList: FC = () => {
  const { pathname } = useLocation();
  const category = useSelector((state: RootState) => state.posts.category);
  const postsList = useSelector((state: RootState) => state.posts.list);
  const loading = useSelector((state: RootState) => state.posts.loadingList);
  const loadError = useSelector((state: RootState) => state.posts.loadError);
  const loadingMore = useSelector(
    (state: RootState) => state.posts.loadingMore
  );
  const dispatch = useDispatch<any>();
  const matchPost = useMatchPost();
  const prevMathPost = usePrevious(matchPost);
  const matchSubreddit = useMatchSubreddit(true);
  const matchHome = useMatchHome(true);
  const prevMatchSubreddit = usePrevious(matchSubreddit);
  const prevMatchHome = usePrevious(matchHome);
  const prevCategory = usePrevious(category);

  useEffect(() => {
    if (matchPost) return;
    if (
      matchSubreddit?.params.subreddit !==
        // @ts-ignore
        prevMatchSubreddit?.params.subreddit ||
      category !== prevCategory
      // matchHome?.path !== prevMatchHome?.path
    ) {
      console.log("pathname:", pathname);
      console.log("subreddit:", matchSubreddit?.params.subreddit);
      console.log("category:", category);
      getPostsList();
    }
  }, [matchSubreddit?.params.subreddit, category]);
  //
  const listRef = useListEndReached(postsList, () => getPostsList(true));

  const isHome = !matchSubreddit?.params.subreddit;

  const getPostsList = (loadMore?: boolean) => {
    dispatch(getPosts(matchSubreddit?.params.subreddit, category, loadMore));
  };

  const renderPostCell = (postId: string) => (
    <PostCell key={postId} postId={postId} />
  );

  const renderLoading = () => (
    <Flex flex={1} allCenter>
      <Loader active inline={true}>
        Going to{" "}
        {matchSubreddit?.params.subreddit
          ? `r/${matchSubreddit?.params.subreddit}`
          : ""}{" "}
        ...
      </Loader>
    </Flex>
  );

  const renderTopLoadingBar = () => <TopLoadingBar active={loading} />;

  const renderLoadError = () => (
    <Flex allCenter>
      <span>Load errored. {loadError}</span>
    </Flex>
  );

  return (
    <Container
      style={{ visibility: matchPost ? "hidden" : "visible" }}
      ref={listRef}
    >
      {loadError ? renderLoadError() : postsList.map(renderPostCell)}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  background-color: white;
`;

export default PostList;
