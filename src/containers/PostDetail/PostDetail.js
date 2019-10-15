import React, { Component } from 'react';
import styles from './PostDetail.module.css';

// Redux connection
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

// Sub Components
import Post from '../Post/Post';
import Comment from '../../components/Comment/Comment';
import CommentForm from '../../components/CommentForm/CommentForm';
import Loader from '../../components/UI/Loader/Loader';

class PostDetail extends Component {
  componentDidMount() {
    this.props.getAllComments();
  }

  render() {
    const post = this.props.post;
    return (
      <div className={styles.PostDetail}>
        <div className={styles.PostDetail__Post}>
          {post && <Post id={post.id} />}
        </div>

        <div className={styles.PostDetail__CommentForm}>
          <CommentForm onSubmit={this.props.addComment} />
        </div>

        <div className={styles.PostDetail__CommentList}>
          <h5 className={styles.PostDetail__CommentListHeader}>
            {this.props.comments.length} Comments
          </h5>

          {!this.props.commentsLoading ? (
            this.props.comments.map((comment) => (
              <div
                className={styles.PostDetail__Comment}
                key={comment.id}
              >
                <Comment
                  comment={comment}
                  onUpVote={this.props.upVoteComment.bind(
                    null,
                    comment.id
                  )}
                  onDownVote={this.props.downVoteComment.bind(
                    null,
                    comment.id
                  )}
                  onEdit={this.props.editComment.bind(null, comment.id)}
                  onDelete={this.props.deleteComment.bind(
                    null,
                    comment.id
                  )}
                />
              </div>
            ))
          ) : (
            <div className={styles.PostDetail__LoadingIcon}>
              <Loader />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts.byId[ownProps.match.params.id],
    comments: Object.keys(state.comments)
      .filter(
        (commentId) =>
          state.comments[commentId].parentId ===
          ownProps.match.params.id
      )
      .map((commentId) => state.comments[commentId]),
    commentsLoading: state.ui.commentsLoading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const postId = ownProps.match.params.id;
  return {
    getAllComments: () =>
      dispatch(actionCreators.getPostComments(postId)),
    addComment: (author, body) =>
      dispatch(actionCreators.createComment({ author, body, postId })),
    editComment: (id, body) =>
      dispatch(actionCreators.editComment({ id, body })),
    upVoteComment: (id) => dispatch(actionCreators.upVoteComment(id)),
    downVoteComment: (id) =>
      dispatch(actionCreators.downVoteComment(id)),
    deleteComment: (id) => dispatch(actionCreators.deleteComment(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);
