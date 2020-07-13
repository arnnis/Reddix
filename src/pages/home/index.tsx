import React, { FC } from "react";
import styled from "styled-components";
import { Switch, Route, useParams } from "react-router-dom";

import NavBar from "./navbar";
import PostsList from "./posts-list";
import Header from "./header";
import PostPage from "../post";

const Home: FC = () => {
  return (
    <Container>
      <NavBar />
      <RightContainer>
        <Header />
        <BodyContainer>
          <Switch>
            <Route path="/(r?)/:subreddit?">
              <PostsList />
            </Route>
          </Switch>
          <Switch>
            <Route path="/r/:subreddit/comments/:postId">
              <PostPage />
            </Route>
          </Switch>
        </BodyContainer>
      </RightContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const RightContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 100px 0 100px;
  background-color: #f2f3f5;
`;

const BodyContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`;

export default Home;
