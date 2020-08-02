import React, { FC } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import NavBar from "./navbar";
import PostsList from "./posts-list";
import Header from "./header";
import PostPage from "../post";
import { HOME_AND_SUBREDDIT_PATH, POST_PATH } from "../../navigation/paths";

const Home: FC = () => {
  return (
    <Container>
      <NavBar />
      <Right>
        <Header />
        <Body>
          <Switch>
            <Route path={HOME_AND_SUBREDDIT_PATH}>
              <PostsList />
            </Route>
          </Switch>
          <Switch>
            <Route path={POST_PATH}>
              <PostPage />
            </Route>
          </Switch>
        </Body>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: calc(100% - 300px);
  padding: 0 6% 0 6%;
  background-color: #f2f3f5;
`;

const Body = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 90%;
  box-shadow: 0px 0px 15px -9px rgba(150, 150, 150, 1);
  background-color: white;
`;

export default Home;
