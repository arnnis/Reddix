import React, { FC } from "react";
import styled from "styled-components";
import NavBar from "./navbar";
import PostList from "./posts-list";
import Flex from "../../components/flex";
import Header from "./header";

const Home: FC = () => {
  return (
    <Container>
      <NavBar />
      <BodyContainer>
          <Header />
          <PostList />
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
`

export default Home;
