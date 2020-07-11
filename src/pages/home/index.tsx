import React, { FC } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import NavBar from "./navbar";
import PostList from "./posts-list";
import Flex from "../../components/flex";
import Header from "./header";

const Home: FC = () => {
  const params = useParams<{ subreddit: string | undefined }>();
  return (
    <Container>
      <NavBar subreddit={params.subreddit} />
      <BodyContainer>
        <Header subreddit={params.subreddit} />
        <PostList subreddit={params.subreddit} />
      </BodyContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const BodyContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 100px 0 100px;
  background-color: #f2f3f5;
`;

export default Home;
