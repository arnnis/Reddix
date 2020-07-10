import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logIn } from "../../slices/app/thunks";

const Header = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(logIn());
  };

  const renderLoginButton = () => (
    <LoginButtonContainer onClick={handleLogin}>
      <LoginButtonText>Login</LoginButtonText>
    </LoginButtonContainer>
  );

  return (
    <Container>
      <CategoryTitle>Best</CategoryTitle>
      {renderLoginButton()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100px;
  width: 100%;

  align-items: center;
`;

const CategoryTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const LoginButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
`;

const LoginButtonText = styled.div`
  color: blue;
`;

export default Header;
