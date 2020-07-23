import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import OauthCallback from "./pages/oauth-callback";

function App() {
  return (
    <Container>
      <Switch>
        <Route path="/oauthcallback">
          <OauthCallback />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.rootBackgroundColor};
  flex-direction: column;
`;

export default App;
