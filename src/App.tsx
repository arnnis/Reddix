import React from "react";
import styled from "styled-components";
import Home from "./pages/home";

function App() {
  return (
    <Container>
      <Home />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: blueviolet;
  flex-direction: column;
`;

export default App;
