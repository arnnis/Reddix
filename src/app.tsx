import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import OauthCallback from "./pages/oauth-callback";
import { HOME_PATH, OAUTH_CALLBACK_PATH } from "./navigation/paths";

function App() {
  return (
    <Container>
      <Switch>
        <Route path={OAUTH_CALLBACK_PATH}>
          <OauthCallback />
        </Route>
        <Route path={HOME_PATH}>
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
