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
  const dispatch = useDispatch();
  useEffect(() => {
    getPostsList();
  }, []);

  const getPostsList = async () => {
    setLoading(true);
    try {
      let posts: any = await dispatch(getPosts());
      setPosts(posts.data.children);
    } catch (e) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const renderPostCell = (post: any) => <PostCell post={post.data} />;

  const renderLoading = () => (
    <Flex justifyContent="center" alignItems="center">
      <span>Loading...</span>
    </Flex>
  );

  return (
    <Container>
      {loading ? renderLoading() : posts.map(renderPostCell)}
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
