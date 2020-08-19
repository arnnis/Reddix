import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import NavBar from "./navbar";
import PostsList from "./posts-list";
import Header from "./header";
import PostPage from "../post";
import { HOME_AND_SUBREDDIT_PATH, POST_PATH } from "../../navigation/paths";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUserInfo } from "../../slices/app/thunks";
import TopLoadingBar from "../../components/top-loading-bar";
import { RootState } from "../../store/configureStore";

const Home: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserInfo());
  });
  const loading = useSelector((state: RootState) => state.posts.loadingList);

  const renderTopLoadingBar = () => <TopLoadingBar active={loading} />;

  return (
    <Container>
      {renderTopLoadingBar()}
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
  background-color: ${(props) => props.theme.rootBackgroundColor};
`;

const Body = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 90%;
  box-shadow: ${(props) =>
    props.theme.isDark
      ? "initial"
      : "0px 0px 15px -9px rgba(150, 150, 150, 1)"};
  background-color: ${(props) => props.theme.backgroundColor};
`;

export default Home;
