import React, { FC } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logInStart } from "../../slices/app/thunks";
import { RootState } from "../../store/configureStore";

interface Props {
  subreddit?: string;
}

const Header: FC<Props> = ({ subreddit }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
  const handleLogin = () => {
    dispatch(logInStart());
  };

  const renderLoginButton = () => (
    <LoginButtonContainer onClick={handleLogin}>
      <LoginButtonText>Login</LoginButtonText>
    </LoginButtonContainer>
  );

  const renderUserProfile = () => (
    <UserProfileContainer>
      <UserAvatar src="https://styles.redditmedia.com/t5_2zldd/styles/communityIcon_fbblpo38vy941.png?width=256&s=13a87a036836ce95570a76feb53f27e61717ad1b" />
      <UserName>alirezarzna</UserName>
    </UserProfileContainer>
  );

  return (
    <Container>
      <CategoryTitle>{`r/${subreddit}` ?? "Best"}</CategoryTitle>
      {false ? renderUserProfile() : renderLoginButton()}
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

const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const UserAvatar = styled.img`
  height: 30px;
  width: 30px;
  background-color: darkred;
  border-radius: 100%;
`;

const UserName = styled.span`
  font-size: 15px;
  margin-left: 10px;
  margin-bottom: 1px;
`;

export default Header;
