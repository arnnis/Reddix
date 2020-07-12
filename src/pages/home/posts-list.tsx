import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import PostCell from "../../components/post-cell";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../slices/posts/thunks";
import { Post } from "../../models/post";
import Flex from "../../components/flex";
import { setSubreddit, PostsState } from "../../slices/posts/slice";
import { RootState } from "../../store/configureStore";
import { useParams } from "react-router-dom";

interface Props {
  subreddit?: string;
}

const PostList: FC<Props> = ({}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<any>(null);
  const { subreddit } = useParams<{ subreddit: string | undefined }>();
  const category = useSelector((state: RootState) => state.posts.category);
  const dispatch = useDispatch();

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
      let posts: any = await dispatch(getPosts(subreddit, category));
      setPosts(posts.data.children);
    } catch (e) {
      setLoadError(e);
    } finally {
      setLoading(false);
    }
  };

  const renderPostCell = (post: any) => (
    <PostCell key={post.data.id} post={post.data} />
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
