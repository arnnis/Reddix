import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import OauthCallback from "./pages/oauth-callback";
import PostPage from "./pages/post";

function App() {
  return (
    <Container>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/oauthcallback" exact>
          <OauthCallback />
        </Route>
      </Switch>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f2f3f5;
  flex-direction: column;
`;

export default App;
