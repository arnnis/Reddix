import React, { FC } from "react";
import { ReactComponent as ChevronUp } from "../assets/svg/chevron-up.svg";
import { ReactComponent as ChevronDown } from "../assets/svg/chevron-down.svg";
import styled from "styled-components";
import millify from "millify";
import { Post } from "../models/post";
import { vote } from "../slices/posts/thunks";
import { useDispatch } from "react-redux";
import { Vote } from "../models/api";
import { convertVoteFromReddit } from "../slices/posts/slice";
import { useTheme } from "../contexts/theme/useTheme";

interface Props {
  post: Post;
}

const Voter: FC<Props> = ({ post }) => {
  const dispatch = useDispatch();
  const currentVote: Vote = convertVoteFromReddit(post.likes);
  const { theme } = useTheme();

  const handleUpvoteClick = () => {
    dispatch(vote(post.id, post.name, "post", "upvote"));
  };

  const handleDownvoteClick = () => {
    dispatch(vote(post.id, post.name, "post", "downvote"));
  };

  return (
    <VotesContainer>
      <ChevronUp
        style={{
          cursor: "pointer",
          fill: currentVote === "upvote" ? theme.orange : "#34495e",
        }}
        onClick={handleUpvoteClick}
      />
      <Votes>{millify(post.score, { precision: 1 })}</Votes>
      <ChevronDown
        style={{
          cursor: "pointer",
          fill: currentVote === "downvote" ? theme.orange : "#34495e",
        }}
        onClick={handleDownvoteClick}
      />
    </VotesContainer>
  );
};

const VotesContainer = styled.div`
  display: flex;
  min-width: 100px;
  //background-color: red;
  flex-direction: column;
  align-items: center;
  padding: 15px 0 15px 0;
`;

const Votes = styled.span`
  font-size: 14.5px;
  color: #34495e;
  font-weight: 500;
`;

export default Voter;
