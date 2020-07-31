import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popup, Dropdown } from "semantic-ui-react";
import { useParams, useRouteMatch } from "react-router-dom";

import { logInStart } from "../../slices/app/thunks";
import { RootState } from "../../store/configureStore";
import { Button } from "../../components/button";
import { ReactComponent as ChevronDown } from "../../assets/svg/chevron-down.svg";
import Flex from "../../components/flex";
import useMatchSubreddit from "../../navigation/useMatchSubreddit";
import useMatchSettings from "../../navigation/useMatchSettings";
import useMatchSaved from "../../navigation/useMatchSaved";
import useMatchHome from "../../navigation/useMatchHome";

interface Props {}

const Header: FC<Props> = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
  const handleLogin = () => {
    dispatch(logInStart());
  };

  const matchSubreddit = useMatchSubreddit();
  const matchSettings = useMatchSettings();
  const matchSaved = useMatchSaved();
  const matchHome = useMatchHome();
  const category = useSelector((state: RootState) => state.posts.category);
  const postId = useSelector((state: RootState) => state.posts.post);

  const renderLoginButton = () => (
    <Button title="Login" onClick={handleLogin} />
  );

  const renderUserPopup = () => (
    <Popup.Content style={{ width: 150 }}>
      {renderPopupOption("Saved", <ChevronDown />)}
    </Popup.Content>
  );

  const renderPopupOption = (title: string, icon: JSX.Element) => (
    <PopupOptionContainer>
      {icon}
      <PopupOptionTitle>{title}</PopupOptionTitle>
    </PopupOptionContainer>
  );

  const renderUserProfile = () => (
    <Popup
      trigger={
        <UserProfileContainer>
          <UserAvatar src="https://styles.redditmedia.com/t5_2zldd/styles/communityIcon_fbblpo38vy941.png?width=256&s=13a87a036836ce95570a76feb53f27e61717ad1b" />
          <UserName>alirezarzna</UserName>
        </UserProfileContainer>
      }
      position="bottom center"
      flowing
      hoverable
    >
      {renderUserPopup()}
    </Popup>
  );

  const renderCategoryDropdown = () =>
    (matchSubreddit || matchHome) &&
    !postId && (
      <Dropdown
        text="BEST"
        inline
        style={{ marginLeft: 25, marginTop: 4, color: "#e04e18" }}
      >
        <Dropdown.Menu vertical>
          <Dropdown.Item text="Top" selected={true} />
          <Dropdown.Item text="Best" />
          <Dropdown.Item text="New" />
        </Dropdown.Menu>
      </Dropdown>
    );

  const getTitle = () => {
    if (matchSettings) return "Settings";
    if (matchSubreddit) return `r/${matchSubreddit.params.subreddit}`;
    if (matchSaved) return "Saved";
    return "Home";
  };

  return (
    <Container>
      <CategoryTitle>{getTitle()}</CategoryTitle>
      {renderCategoryDropdown()}
      {isLoggedIn ? renderUserProfile() : renderLoginButton()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 25px 0 30px 0;
  height: 10%;
  width: 100%;
  align-items: center;
`;

const CategoryTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
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

const PopupOptionContainer = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

const PopupOptionTitle = styled.div`
  color: #34495e;
  font-size: 13.5px;
  margin-left: 5px;
`;

export default Header;
