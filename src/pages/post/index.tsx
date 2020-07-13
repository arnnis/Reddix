import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { setPost } from "../../slices/posts/slice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../models/post";
import { RootState } from "../../store/configureStore";
import PostCell from "../../components/post-cell";
import { getPostComments } from "../../slices/posts/thunks";
import { Data, Listing } from "../../models/api";
import { Comment } from "../../models/comment";
import CommentCell from "./comment-cell";

const PostPage: FC = ({}) => {
  const { subreddit, postId } = useParams<{
    subreddit: string;
    postId: string;
  }>();
  const dispatch = useDispatch<any>();
  // this post object is available when it's loaded in posts list.
  const post = useSelector(
    (state: RootState) => state.entities.posts.byId[postId]
  );
  const [comments, setComments] = useState<Data<Comment>[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsLoadError, setCommentsLoadError] = useState(null);

  // Sync url subreddit with redux
  // useEffect(() => {
  //   dispatch(setSubreddit(subreddit));
  // }, [subreddit]);
  // Sync url postId with redux
  useEffect(() => {
    dispatch(setPost(postId));
  }, [postId]);

  useEffect(() => {
    // load Post if not in redux

    getComments();

    return () => {
      dispatch(setPost(undefined));
    };
  }, []);

  const getComments = async () => {
    let data: [Listing<Post>, Listing<Comment>] = await dispatch(
      getPostComments(postId, subreddit)
    );
    setComments(data[1].data.children);
  };

  const renderCommentCell = (comment: Data<Comment>) => (
    <CommentCell comment={comment.data} />
  );

  const renderComments = () => (
    <CommentsContainer>{comments.map(renderCommentCell)}</CommentsContainer>
  );

  return (
    <Container>
      {post ? (
        <>
          <Card>
            <PostCell postId={postId} />
          </Card>
          <Card style={{ marginTop: 15, flexDirection: "column" }}>
            <CommentsNum>{post.num_comments} Comments</CommentsNum>
            {renderComments()}
          </Card>
        </>
      ) : (
        "Post not found in redux state"
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`;

const Card = styled.div`
  display: flex;
  box-shadow: 0px 0px 15px -9px rgba(150, 150, 150, 1);
  background-color: white;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 10px 15px 0px;
`;

const CommentsNum = styled.span`
  font-size: 15px;
  font-weight: 500;
  margin-left: 15px;
  margin-top: 15px;
`;

export default PostPage;
