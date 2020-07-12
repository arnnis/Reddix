import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as HotIcon } from "../../assets/svg/fire.svg";
import { ReactComponent as NewIcon } from "../../assets/svg/plus-box.svg";
import { ReactComponent as ChartIcon } from "../../assets/svg/chart-bar.svg";
import { useDispatch, useSelector } from "react-redux";
import { getMySubreddits, getPosts } from "../../slices/posts/thunks";
import Flex from "../../components/flex";
import { Subreddit } from "../../models/subreddit";
import { setCategory } from "../../slices/posts/slice";
import { history, RootState } from "../../store/configureStore";

interface Props {}

const NavBar: FC<Props> = () => {
  const dispatch = useDispatch();
  const [subreddits, setSubreddits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<any>(null);
  const subreddit = useSelector((state: RootState) => state.posts.subreddit);
  const category = useSelector((state: RootState) => state.posts.category);

  const isHome = !subreddit;

  useEffect(() => {
    getMySubredditsList();
  }, []);

  const getMySubredditsList = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      let subs: any = await dispatch(getMySubreddits());
      setSubreddits(subs.data.children);
    } catch (e) {
      setLoadError(e);
    } finally {
      setLoading(false);
    }
  };

  const renderAppLogo = () => (
    <LogoContainer
      onClick={() => {
        dispatch(setCategory("best"));
        history.push("/");
      }}
    >
      <LogoTilte>Reddix</LogoTilte>
    </LogoContainer>
  );

  const renderHomeSection = () => (
    <Section title="HOME">
      <SectionItem
        title="NEW"
        icon={
          <NewIcon
            style={{
              marginLeft: -3,
              fill: isHome && category === "new" ? "#494949" : "#CECECE",
              height: 19,
            }}
          />
        }
        onPress={() => {
          dispatch(setCategory("new"));
          history.push("/");
        }}
        selected={isHome && category === "new"}
      />
      <SectionItem
        title="BEST"
        icon={
          <HotIcon
            style={{
              marginLeft: -3,
              fill: isHome && category === "best" ? "#494949" : "#CECECE",
            }}
          />
        }
        onPress={() => {
          dispatch(setCategory("best"));
          history.push("/");
        }}
        selected={isHome && category === "best"}
      />
      <SectionItem
        title="TOP"
        icon={
          <ChartIcon
            style={{
              marginLeft: -3,
              fill: isHome && category === "top" ? "#494949" : "#CECECE",
              height: 19,
            }}
          />
        }
        onPress={() => {
          dispatch(setCategory("top"));
          history.push("/");
        }}
        selected={isHome && category === "top"}
      />
    </Section>
  );

  const renderSubReddit = ({ data: sub }: { data: Subreddit }) => {
    return (
      <SectionItem
        key={sub.id}
        title={"r/" + sub.display_name}
        onPress={() => {
          dispatch(setCategory("best"));
          history.push("/r/" + sub.display_name);
        }}
        selected={sub.display_name === subreddit}
        icon={
          <SubredditImage
            src={(sub.icon_img || sub.community_icon)?.replace(/amp;/g, "")}
            style={{ marginLeft: -3 }}
          />
        }
      />
    );
  };

  const renderSubReddits = () => (
    <Section title="SUBREDDITS">{subreddits.map(renderSubReddit)}</Section>
  );

  return (
    <Container>
      {renderAppLogo()}
      <Flex flexDirection="column" style={{ overflowY: "auto" }}>
        {renderHomeSection()}

        {renderSubReddits()}
      </Flex>
    </Container>
  );
};

const Section: FC<{ title: string }> = ({ title, children }) => (
  <SectionContainer>
    <SectionTitleContainer>
      <SectionTitle>{title}</SectionTitle>
      <SectionDivider />
    </SectionTitleContainer>
    {children}
  </SectionContainer>
);

const SectionItem: FC<{
  icon: any;
  title: string;
  onPress?(): void;
  selected?: boolean;
}> = ({ icon, title, onPress, selected }) => (
  <SectionItemContainer selected={selected} onClick={onPress}>
    {icon}
    <SectionItemTitle selected={selected}>{title}</SectionItemTitle>
    {selected && <SectionItemSelectedBar />}
  </SectionItemContainer>
);

const Container = styled.div`
  display: flex;
  width: 300px;
  height: 100%;
  background-color: #fff;
  flex-direction: column;
  box-shadow: 10px 0px 15px -19px rgba(150, 150, 150, 1);
`;

const LogoContainer = styled.div`
  display: flex;
  height: 150px;
  width: 100%;
  //background-color: navajowhite;
  align-items: center;
  padding-left: 35px;
  cursor: pointer;
`;

const LogoTilte = styled.div`
  font-size: 19.5px;
  font-weight: bold;
  color: #e04e18;
`;

const SectionContainer = styled.div`
  background-color: #fff;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
`;

const SectionTitleContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 35px 0 35px;
  flex-direction: column;
  margin-bottom: 10px;
`;

const SectionTitle = styled.span`
  font-size: 14px;
  color: #6d6f76;
  margin-bottom: 10px;
  font-weight: 500;
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: whitesmoke;
`;

const SectionItemContainer = styled.div<{ selected?: boolean }>`
  position: relative;
  height: 47.5px;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0px 35px 0 35px;
  cursor: pointer;
`;

const SectionItemTitle = styled.span<{ selected?: boolean }>`
  font-size: 13.5px;
  color: ${(props) => (props.selected ? "#494949" : "#CECECE")};
  margin-left: 15px;
  font-weight: bold;
`;

const SectionItemSelectedBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4.5px;
  background-color: #e04e18;
`;

const SubredditImage = styled.img`
  width: 21px;
  height: 21px;
  border-radius: 100%;
`;

export default NavBar;
