import React, { FC } from "react";
import styled from "styled-components";
import { ReactComponent as ChevronUp } from "../assets/svg/chevron-up.svg";
import { ReactComponent as ChevronDown } from "../assets/svg/chevron-down.svg";
import Flex from "./flex";
import { Post } from "../models/post";

interface Props {
  post: Post;
}

const PostCell: FC<Props> = ({ post }) => {
  const renderVotes = () => (
    <VotesContainer>
      <ChevronUp style={{ cursor: "pointer" }} />
      <span>{post.ups.toString()}</span>
      <ChevronDown style={{ cursor: "pointer" }} />
    </VotesContainer>
  );

  const renderSubReddit = () => (
    <SubredditContainer>
      <SubredditImage src="https://styles.redditmedia.com/t5_2zldd/styles/communityIcon_fbblpo38vy941.png" />
      <SubredditName>r/{post.subreddit}</SubredditName>
    </SubredditContainer>
  );

  return (
    <Container>
      {renderVotes()}
      <BodyContainer>
        {renderSubReddit()}
        <PostTitle>{post.title}</PostTitle>
      </BodyContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100px;
  max-height: 300px;
  background-color: #fff;
  border-bottom: 1px solid whitesmoke;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7.5px;
`;

const PostTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-top: 5px;
`;

const VotesContainer = styled.div`
  display: flex;
  min-width: 100px;
  //background-color: red;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubredditContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SubredditImage = styled.img`
  display: flex;
  height: 23px;
  width: 23px;
`;

const SubredditName = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

export default PostCell;
