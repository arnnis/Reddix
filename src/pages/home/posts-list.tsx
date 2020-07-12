import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import PostCell from "../../components/post-cell";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../slices/posts/thunks";
import { Post } from "../../models/post";
import Flex from "../../components/flex";
import { setSubreddit, PostsState } from "../../slices/posts/slice";
import { AppDispatch, RootState } from "../../store/configureStore";
import { useParams } from "react-router-dom";
import { Listing } from "../../models/api";

interface Props {
  subreddit?: string;
}

const PostList: FC<Props> = ({}) => {
  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<any>(null);
  const { subreddit } = useParams<{ subreddit: string | undefined }>();
  const category = useSelector((state: RootState) => state.posts.category);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    console.log("subreddit:", subreddit);
    console.log("category:", category);
    getPostsList();
  }, [subreddit, category]);

  useEffect(() => {
    dispatch(setSubreddit(subreddit));
  }, [subreddit]);

  const isHome = !subreddit;

  const getPostsList = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      let posts: Listing<Post> = await dispatch(getPosts(subreddit, category));
      setPosts(posts.data.children.map(({ data }) => data.id));
    } catch (e) {
      console.log(e);
      setLoadError(e);
    } finally {
      setLoading(false);
    }
  };

  const renderPostCell = (postId: string) => (
    <PostCell key={postId} postId={postId} />
  );

  const renderLoading = () => (
    <Flex allCenter>
      <span>Loading...</span>
    </Flex>
  );

  const renderLoadError = () => (
    <Flex allCenter>
      <span>Load errored. {loadError?.message}</span>
    </Flex>
  );

  return (
    <Container>
      {loading
        ? renderLoading()
        : loadError
        ? renderLoadError()
        : posts.map(renderPostCell)}
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
