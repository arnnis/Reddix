import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { setPost } from "../../slices/posts/slice";
import { useParams } from "react-router-dom";
import { Transition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../models/post";
import { RootState } from "../../store/configureStore";
import PostCell from "../../components/post-cell";
import { getPostComments } from "../../slices/posts/thunks";
import { Data, Listing } from "../../models/api";
import { Comment } from "../../models/comment";
import CommentCell from "./comment-cell";
import { DEFAULT_TITLE } from "../../env";
import Flex from "../../components/flex";
import { Loader } from "semantic-ui-react";

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
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadErr, setLoadErr] = useState(null);
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    dispatch(setPost(postId));
    setInProp(true);
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
    setLoading(true);
    try {
      let data: [Listing<Post>, Listing<Comment>] = await dispatch(
        getPostComments(postId, subreddit)
      );
      setComments(data[1].data.children);
    } catch (e) {
      setLoadErr(e);
    } finally {
      setLoading(false);
    }
  };

  const renderCommentCell = (comment: Data<Comment>) => (
    <CommentCell commentId={comment.data.id} />
  );

  const renderComments = () => (
    <CommentsContainer>{comments.map(renderCommentCell)}</CommentsContainer>
  );

  const renderLoading = () => (
    <Flex flex={1} justifyContent="center" alignItems="center">
      <Loader active inline={true}>
        Loading
      </Loader>
    </Flex>
  );

  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles: any = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <Container>
      <Transition in={inProp} timeout={duration}>
        {(state) => (
          <Flex
            flex={1}
            style={{ ...defaultStyle, ...transitionStyles[state] }}
            flexDirection="column"
          >
            {post ? (
              <>
                <PostCell postId={postId} />
                <CommentsNum>{post.num_comments} Comments</CommentsNum>
              </>
            ) : null}
            <Flex style={{ minHeight: 100 }}>
              {loading ? (
                renderLoading()
              ) : loadErr ? (
                <span>{loadErr}</span>
              ) : (
                renderComments()
              )}
            </Flex>
          </Flex>
        )}
      </Transition>
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
  background-color: ${(props) => props.theme.backgroundColor};
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
  color: ${(props) => props.theme.textColor};
`;

export default PostPage;
