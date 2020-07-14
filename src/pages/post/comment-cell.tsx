import React, { FC, useEffect, useState } from "react";
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
  const [collapsed, setCollapsed] = useState(false);
  if (!comment.body) return null;

  const renderReply = (replyData: Data<Comment>) => (
    <CommentCell comment={replyData.data} isMaster={false} />
  );

  const renderLine = () => <Line onClick={() => setCollapsed(true)} />;

  return (
    <Container>
      <Flex flexDirection="column" style={{ width: 15 }}>
        {!collapsed ? (
          <>
            <ChevronUp
              width="16px"
              height="16px"
              style={{
                cursor: "pointer",
                fill: "#34495e",
              }}
            />
            <ChevronDown
              width="16px"
              height="16px"
              style={{
                cursor: "pointer",
                fill: "#34495e",
              }}
            />
            {renderLine()}
          </>
        ) : (
          <span onClick={() => setCollapsed(false)}>+</span>
        )}
      </Flex>
      <Flex flexDirection="column" style={{ marginLeft: 15 }}>
        <CommentContainer>
          <Flex flexDirection="column">
            <Flex>
              <Author>{comment.author}</Author>
              <Score>{comment.score} points</Score>
            </Flex>

            {!collapsed && <Text>{comment.body}</Text>}
          </Flex>
        </CommentContainer>
        {!collapsed &&
          comment.replies &&
          comment.replies.data.children.length &&
          comment.replies.data.children.map(renderReply)}
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: auto;
  margin-top: 20px;
`;

const CommentContainer = styled.div`
  display: flex;
`;

const Line = styled.div`
  height: 100%;
  width: 1.4px;
  background-color: whitesmoke;
  cursor: pointer;
  &:hover {
    background-color: lightgrey;
  }
`;

const Author = styled.span`
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Score = styled.span`
  font-size: 12px;
  margin-left: 5px;
  color: #7c7c7c;
`;

export default CommentCell;
