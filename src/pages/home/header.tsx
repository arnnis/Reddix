import React, { FC } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logInStart } from "../../slices/app/thunks";
import { RootState } from "../../store/configureStore";
import { Button } from "../../components/button";
import { ReactComponent as ChevronDown } from "../../assets/svg/chevron-down.svg";
import Flex from "../../components/flex";

interface Props {}

const Header: FC<Props> = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
  const handleLogin = () => {
    dispatch(logInStart());
  };
  const subreddit = useSelector((state: RootState) => state.posts.subreddit);
  const category = useSelector((state: RootState) => state.posts.category);
  const postId = useSelector((state: RootState) => state.posts.post);

  const renderLoginButton = () => (
    <Button title="Login" onClick={handleLogin} />
  );

  const renderUserProfile = () => (
    <UserProfileContainer>
      <UserAvatar src="https://styles.redditmedia.com/t5_2zldd/styles/communityIcon_fbblpo38vy941.png?width=256&s=13a87a036836ce95570a76feb53f27e61717ad1b" />
      <UserName>alirezarzna</UserName>
    </UserProfileContainer>
  );

  const renderCategoryDropdown = () =>
    subreddit &&
    !postId && (
      <Flex alignItems="center" style={{ marginTop: 1.5 }}>
        <CategoryDropdown>{category.toUpperCase()}</CategoryDropdown>
        <ChevronDown style={{ fill: "#e04e18", height: 18 }} />
      </Flex>
    );

  return (
    <Container>
      <CategoryTitle>
        {subreddit ? `r/${subreddit}` : category.toUpperCase()}
      </CategoryTitle>
      {renderCategoryDropdown()}
      {false ? renderUserProfile() : renderLoginButton()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 25px 0 30px 0;
  width: 100%;
  align-items: center;
`;

const CategoryTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const CategoryDropdown = styled.div`
  color: #e04e18;
  font-weight: 500;
  margin-left: 30px;
  font-size: 14.5px;
  cursor: pointer;
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
