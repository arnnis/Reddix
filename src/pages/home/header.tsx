import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popup, Dropdown } from "semantic-ui-react";

import { ReactComponent as ThemeIcon } from "../../assets/svg/theme-light-dark.svg";

import { logInStart } from "../../slices/app/thunks";
import { RootState } from "../../store/configureStore";
import { Button } from "../../components/button";
import { ReactComponent as ChevronDown } from "../../assets/svg/chevron-down.svg";
import Flex from "../../components/flex";
import useMatchSubreddit from "../../navigation/useMatchSubreddit";
import useMatchSettings from "../../navigation/useMatchSettings";
import useMatchSaved from "../../navigation/useMatchSaved";
import useMatchHome from "../../navigation/useMatchHome";
import { useTheme } from "../../contexts/theme/useTheme";
import useMatchPost from "../../navigation/useMatchPost";

interface Props {}

const Header: FC<Props> = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
  const handleLogin = () => {
    dispatch(logInStart());
  };
  const me = useSelector((state: RootState) => state.app.me);

  const matchSubreddit = useMatchSubreddit();
  const matchSettings = useMatchSettings();
  const matchSaved = useMatchSaved();
  const matchHome = useMatchHome();

  const matchPost = useMatchPost();
  const { theme, toggleTheme } = useTheme();

  const renderLoginButton = () => (
    <Button title="Login" onClick={handleLogin} />
  );

  const renderUserPopup = () => (
    <Popup.Content style={{ width: 150 }}>
      {renderPopupOption(
        "Night Mode",
        <ThemeIcon
          style={{
            marginRight: 15,
            cursor: "pointer",
            fill: theme.isDark ? "#fff" : "#333",
          }}
          width={20}
          height={20}
        />,
        () => toggleTheme()
      )}
      <Button title="Logout" style={{ marginTop: 15 }} />
    </Popup.Content>
  );

  const renderPopupOption = (
    title: string,
    icon: JSX.Element,
    onClick?: () => void
  ) => (
    <PopupOptionContainer onClick={onClick}>
      {icon}
      <PopupOptionTitle>{title}</PopupOptionTitle>
    </PopupOptionContainer>
  );

  const renderUserProfile = () => (
    <Popup
      trigger={
        <UserProfileContainer>
          <UserAvatar src={me?.subreddit.icon_img} />
          <UserName>{me?.subreddit?.display_name_prefixed}</UserName>
        </UserProfileContainer>
      }
      position="bottom right"
      flowing
      hoverable
    >
      {renderUserPopup()}
    </Popup>
  );

  const renderCategoryDropdown = () =>
    (matchSubreddit || matchHome) &&
    !matchPost && (
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
      <Flex alignItems="center" style={{ marginLeft: "auto" }}>
        <ThemeIcon
          style={{
            marginRight: 15,
            cursor: "pointer",
            fill: theme.isDark ? "#fff" : "#333",
          }}
          width={20}
          height={20}
          onClick={() => toggleTheme()}
        />
        {isLoggedIn ? renderUserProfile() : renderLoginButton()}
      </Flex>
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
  color: ${(props) => props.theme.textColor};
`;

const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
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
  color: ${(props) => props.theme.textColor};
`;

const PopupOptionContainer = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

const PopupOptionTitle = styled.div`
  color: #34495e;
  font-size: 13.5px;
  margin-top: 1.5px;
`;

export default Header;
