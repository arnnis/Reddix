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
import { DEFAULT_TITLE } from "../../env";

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

  useEffect(() => {
    dispatch(setPost(postId));
  }, [postId]);

  // Change tab title on post change.
  useEffect(() => {
    if (post?.title) {
      document.title = post.title;
    } else {
      document.title = DEFAULT_TITLE;
    }
  }, [post?.title]);

  // onMount
  useEffect(() => {
    // load Post if not in redux

    getComments().catch((e) => console.log(e));

    return () => {
      dispatch(setPost(undefined));
      document.title = DEFAULT_TITLE;
    };
  }, []);

  const getComments = async () => {
    let data: [Listing<Post>, Listing<Comment>] = await dispatch(
      getPostComments(postId, subreddit)
    );
    setComments(data[1].data.children);
  };

  const renderCommentCell = (comment: Data<Comment>) => (
    <CommentCell commentId={comment.data.id} />
  );

  const renderComments = () => (
    <CommentsContainer>{comments.map(renderCommentCell)}</CommentsContainer>
  );

  return (
    <Container>
      {post ? (
        <>
          <PostCell postId={postId} />
          <CommentsNum>{post.num_comments} Comments</CommentsNum>
          {renderComments()}
        </>
      ) : (
        <span>Post not found in redux state</span>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding: 0px 10px 20px 20px;
`;

const CommentsNum = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-left: 15px;
  margin-top: 15px;
`;

export default PostPage;
