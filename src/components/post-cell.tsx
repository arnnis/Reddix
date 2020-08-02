import React, { FC } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { ReactComponent as CommentIcon } from "../assets/svg/comment.svg";
import { ReactComponent as SaveIcon } from "../assets/svg/bookmark-plus.svg";
import Flex from "./flex";
import Voter from "./voter";
import { history, RootState } from "../store/configureStore";
import millify from "millify";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { vote } from "../slices/posts/thunks";
import useMatchPost from "../navigation/useMatchPost";

dayjs.extend(relativeTime);
dayjs.extend(utc);

interface Props {
  postId: string;
  currentScrollPosition?: number;
}

const PostCell: FC<Props> = ({ postId, currentScrollPosition }) => {
  const post = useSelector(
    (state: RootState) => state.entities.posts.byId[postId]
  );
  const matchPost = useMatchPost();

  const renderVotes = () => <Voter post={post} />;

  const renderMetadata = () => (
    <SubredditContainer>
      <SubredditImage src="https://a.thumbs.redditmedia.com/zDOFJTXd6fmlD58VDGypiV94Leflz11woxmgbGY6p_4.png" />
      <Link to={"/" + post.subreddit_name_prefixed}>
        <SubredditName>{post.subreddit_name_prefixed}</SubredditName>
      </Link>

      <Author>by u/{post.author}</Author>
      <DateTime>
        {dayjs.utc(dayjs.unix(post.created_utc)).local().fromNow()}
      </DateTime>
    </SubredditContainer>
  );

  const renderSelfText = () =>
    !!post.selftext && (
      <PostText>{<ReactMarkdown source={post.selftext} />}</PostText>
    );

  const renderImage = () => {
    if (!post?.preview) return null;
    let res = 2;
    if (matchPost) res = 3;
    const blurred = post.over_18 && !matchPost;
    const width = post.preview?.images[0]?.resolutions[res]?.width;
    const height = post.preview?.images[0]?.resolutions[res]?.height;

    return (
      <a href={post?.preview?.images[0].source.url} target="_blank">
        {/*This wrapped div is to make sharp css: blur edges.*/}
        <BlurImageEdgeSharperDiv
          width={width}
          height={height}
          offset={10}
          active={blurred}
        >
          <PostImage
            src={post?.preview?.images[0]?.resolutions[res]?.url}
            width={width}
            height={height}
            style={{
              height,
              width,
            }}
            nsfw={blurred}
          />
        </BlurImageEdgeSharperDiv>
      </a>
    );
  };

  const renderCommentsNum = () => (
    <Link to={"/" + post.subreddit_name_prefixed + "/comments/" + post.id}>
      <Flex alignItems="center">
        <CommentIcon style={{ fill: "#8d9092", height: 15 }} />
        <CommentsNum>
          {millify(post.num_comments, { precision: 1 })} comments
        </CommentsNum>
      </Flex>
    </Link>
  );

  const renderSaveIcon = () => (
    <Flex alignItems="center" style={{ flex: "initial" }}>
      <SaveIcon style={{ fill: "#8d9092", height: 15 }} />
      <CommentsNum>save</CommentsNum>
    </Flex>
  );

  const renderToolbar = () => (
    <ToolbarContainer>
      {renderCommentsNum()}
      {renderSaveIcon()}
    </ToolbarContainer>
  );

  return (
    <Container>
      {renderVotes()}
      <BodyContainer>
        <Flex flexDirection="column">
          {renderMetadata()}
          <PostTitle href={post.url}>
            {post.title} <Domain>({post.domain})</Domain>
          </PostTitle>
          <Flex>
            {renderSelfText()}
            {renderImage()}
          </Flex>
          {renderToolbar()}
        </Flex>
      </BodyContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  border-bottom: 1.25px solid whitesmoke;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 15px 10px 0;
  text-overflow: ellipsis;
`;

const PostTitle = styled.a`
  font-size: 15.5px;
  font-weight: 500;
  margin-top: 10px;
  color: #34495e;
  text-decoration: none;
`;

const PostText = styled.span`
  font-size: 14px;
  margin-top: 10px;

  color: #34495e;
  text-overflow: ellipsis;
  line-height: 20px;
`;

const BlurImageEdgeSharperDiv = styled.div<{
  active: boolean;
  offset: number;
  width: number;
  height: number;
}>`
  overflow: hidden;
  margin-left: 0px;
  margin-top: 15px;
  width: ${(props) =>
    props.active ? props.width - props.offset : props.width}px;
  height: ${(props) =>
    props.active ? props.height - props.offset : props.height}px;
`;

const PostImage = styled.img<{ nsfw: boolean }>`
  filter: ${(props) => (props.nsfw ? "blur(13px)" : "initial")};
`;

const ToolbarContainer = styled.div`
  display: flex;
  margin-top: 15px;
`;

const Author = styled.span`
  color: #828282;
  font-size: 11.5px;

  font-weight: 400;
  cursor: pointer;
  margin-left: 5px;
`;

const DateTime = styled.span`
  color: #828282;
  font-size: 11.5px;

  font-weight: 400;
  cursor: pointer;
  margin-left: 5px;
`;

const Domain = styled.span`
  color: #828282;
  font-size: 11.5px;

  font-weight: 400;
  cursor: pointer;
  margin-left: 10px;
`;

const CommentsNum = styled.span`
  color: #828282;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  margin-bottom: 1px;
`;

const SubredditContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SubredditImage = styled.img`
  display: flex;
  height: 18px;
  width: 18px;
  border-radius: 5px;
  margin-right: 5px;
`;

const SubredditName = styled.span`
  font-size: 11.5px;
  font-weight: bold;
  color: #34495e;
`;

export default PostCell;
