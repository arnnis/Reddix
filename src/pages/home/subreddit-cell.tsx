import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history, RootState } from "../../store/configureStore";
import { setCategory } from "../../slices/posts/slice";
import { SectionItem } from "./navbar";
import styled from "styled-components";
import useMatchSubreddit from "../../navigation/useMatchSubreddit";

interface Props {
  subId: string;
}

const SubredditCell: FC<Props> = ({ subId }) => {
  const sub = useSelector(
    (state: RootState) => state.entities.subreddits.byId[subId]
  );
  const matchSubreddit = useMatchSubreddit();

  const dispatch = useDispatch<any>();
  return (
    <SectionItem
      key={sub.id}
      title={"r/" + sub.display_name}
      onPress={() => {
        dispatch(setCategory("best"));
        history.push(process.env.PUBLIC_URL + "/r/" + sub.display_name);
      }}
      selected={
        !!matchSubreddit && matchSubreddit.params.subreddit === sub.display_name
      }
      icon={
        <SubredditImage
          src={(sub.icon_img || sub.community_icon)?.replace(/amp;/g, "")}
          style={{ marginLeft: -3 }}
        />
      }
    />
  );
};

const SubredditImage = styled.img`
  width: 21px;
  height: 21px;
  border-radius: 100%;
`;

export default React.memo(SubredditCell);
