import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import PostCell from "../../components/post-cell";
import { useDispatch } from "react-redux";
import { getPosts } from "../../slices/posts/thunks";
import { Post } from "../../models/post";
import Flex from "../../components/flex";

const PostList: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getPostsList();
  }, []);

  const getPostsList = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      let posts: any = await dispatch(getPosts());
      setPosts(posts.data.children);
    } catch (e) {
      setLoadError(e);
    } finally {
      setLoading(false);
    }
  };

  const renderPostCell = (post: any) => <PostCell post={post.data} />;

  const renderLoading = () => (
    <Flex allCenter>
      <span>Loading...</span>
    </Flex>
  );

  const renderLoadError = () => (
    <Flex allCenter>
      <span>Load errored.</span>
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
