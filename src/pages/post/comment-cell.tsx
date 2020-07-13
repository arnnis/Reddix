import React, { FC, useEffect } from "react";
import { ReactComponent as ChevronUp } from "../../assets/svg/chevron-up.svg";
import { ReactComponent as ChevronDown } from "../../assets/svg/chevron-down.svg";
import { Comment } from "../../models/comment";
import styled from "styled-components";
import { Data } from "../../models/api";
import Flex from "../../components/flex";

interface Props {
  comment: Comment;
  isMaster?: boolean;
}

const CommentCell: FC<Props> = ({ comment, isMaster = true }) => {
  if (!comment.body) return null;

  const renderReply = (replyData: Data<Comment>) => (
    <CommentCell comment={replyData.data} isMaster={false} />
  );

  return (
    <Container>
      <Flex flexDirection="column">
        <ChevronUp
          style={{
            cursor: "pointer",
            fill: "#34495e",
            height: 16,
            width: 16,
            marginLeft: -7.5,
          }}
        />
        <ChevronDown
          style={{
            cursor: "pointer",
            fill: "#34495e",
            height: 16,
            width: 16,
            marginLeft: -8,
          }}
        />
        {
          <div
            style={{
              height: "100%",
              width: 1.4,
              backgroundColor: "whitesmoke",
            }}
          />
        }
      </Flex>
      <Flex flexDirection="column" style={{ marginLeft: 15 }}>
        <CommentContainer>
          <Flex flexDirection="column">
            <Flex>
              <Author>{comment.author}</Author>
              <Score>{comment.score} points</Score>
            </Flex>

            <Text>{comment.body}</Text>
          </Flex>
        </CommentContainer>
        {comment.replies &&
          comment.replies.data.children.length &&
          comment.replies.data.children.map(renderReply)}
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: auto;
  //border-top: 1.3px solid whitesmoke;
  margin-top: 15px;
`;

const CommentContainer = styled.div`
  display: flex;

  //margin-left: 10px;

  //padding-top: 15px;
`;

const Author = styled.span`
  font-size: 12px;
  margin-bottom: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Score = styled.span`
  font-size: 12px;
  margin-left: 5px;
`;

export default CommentCell;
