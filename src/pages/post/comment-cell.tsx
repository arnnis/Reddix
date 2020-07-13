import React, { FC, useEffect } from "react";
import { Comment } from "../../models/comment";
import styled from "styled-components";
import { Data } from "../../models/api";

interface Props {
  comment: Comment;
}

const CommentCell: FC<Props> = ({ comment }) => {
  if (!comment.body) return null;
  const renderReply = (replyData: Data<Comment>) => (
    <CommentCell comment={replyData.data} />
  );

  return (
    <Container>
      <CommentContainer>
        <Author>{comment.author}</Author>
        <Text>{comment.body}</Text>
      </CommentContainer>

      {comment.replies &&
        comment.replies.data.children.length &&
        comment.replies.data.children.map(renderReply)}
    </Container>
  );
};

const Container = styled.div`
  padding-left: 15px;
  margin-bottom: 15px;
  //border-left: 1px solid red;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Author = styled.span`
  font-size: 12px;
  margin-bottom: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

export default CommentCell;
