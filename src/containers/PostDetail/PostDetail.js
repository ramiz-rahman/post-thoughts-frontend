import React, { Component } from 'react';
import uuidv5 from 'node-uuid';
import styles from './PostDetail.module.css';
import Post from '../../components/Post/Post';
import Comment from '../../components/Comment/Comment';
import CommentForm from '../../components/CommentForm/CommentForm';
import * as API from '../../utils/PostsAPI';

class PostDetail extends Component {
  state = {
    post: null,
    comments: []
  };

  componentDidMount() {
    const postId = this.props.match.params.id;
    API.getPost(postId).then((post) => this.setState({ post }));
    API.getPostComments(postId).then((comments) =>
      this.setState({ comments })
    );
  }

  voteOnPost = async (postId, vote, e) => {
    e.preventDefault();

    const votedPost = await API.voteOnPost(postId, {
      option: vote
    });

    this.setState({ post: votedPost });
  };

  upVotePost = async (postId, e) => {
    this.voteOnPost(postId, 'upVote', e);
  };

  downVotePost = async (postId, e) => {
    this.voteOnPost(postId, 'downVote', e);
  };

  editPost = async (postId, e) => {
    e.preventDefault();
    this.props.history.push(`/posts/edit/${postId}`);
  };

  deletePost = async (postId, e) => {
    e.preventDefault();
    const deletedPost = await API.deletePost(postId);
    this.setState((prevState) => ({
      posts: prevState.posts.filter(
        (post) => post.id !== deletedPost.id
      )
    }));
  };

  voteOnComment = async (id, vote, e) => {
    e.preventDefault();

    const _updateIfNew = (comment, newComment) => {
      return comment.id === newComment.id ? newComment : comment;
    };
    const _updateComments = (comments, newComment) => {
      return comments.map((comment) =>
        _updateIfNew(comment, newComment)
      );
    };

    const votedComment = await API.voteOnComment(id, {
      option: vote
    });

    this.setState((prevState) => ({
      comments: _updateComments(prevState.comments, votedComment)
    }));
  };

  upVoteComment = (id, e) => {
    this.voteOnComment(id, 'upVote', e);
  };

  downVoteComment = (id, e) => {
    this.voteOnComment(id, 'downVote', e);
  };

  addComment = async (author, body, e) => {
    e.preventDefault();
    if (this.state.post) {
      let newComment = {
        id: uuidv5('ramiz'),
        parentId: this.state.post.id,
        timestamp: Date.now(),
        author: author,
        body: body
      };

      newComment = await API.addCommentToPost(newComment);
      this.setState((prevState) => ({
        comments: [...prevState.comments, newComment]
      }));
    }
  };

  editComment = async (id, body, e) => {
    e.preventDefault();
    const timestamp = Date.now();
    const updatedComment = await API.editComment(id, timestamp, body);
    const upDateIf = (comment, updatedComment) => {
      return comment.id === updatedComment ? updatedComment : comment;
    };
    const comments = this.state.comments.map((comment) =>
      upDateIf(comment, updatedComment)
    );
    this.setState({ comments });
  };

  deleteComment = async (id, e) => {
    e.preventDefault();
    const deletedComment = await API.deleteComment(id);
    const comments = this.state.comments.filter(
      (comment) => comment.id !== deletedComment.id
    );
    this.setState({ comments });
  };

  render() {
    const post = this.state.post;
    return (
      <div className={styles.PostDetail}>
        <div className={styles.PostDetail__Post}>
          {post && (
            <Post
              post={this.state.post}
              onUpVote={this.upVotePost.bind(null, post.id)}
              onDownVote={this.downVotePost.bind(null, post.id)}
              onEdit={this.editPost.bind(null, post.id)}
              onDelete={this.deletePost.bind(null, post.id)}
            />
          )}
        </div>

        <div className={styles.PostDetail__CommentForm}>
          <CommentForm onSubmit={this.addComment} />
        </div>

        <div className={styles.PostDetail__CommentList}>
          <h5 className={styles.PostDetail__CommentListHeader}>
            {this.state.comments.length} Comments
          </h5>
          {this.state.comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onUpVote={this.upVoteComment.bind(null, comment.id)}
              onDownVote={this.downVoteComment.bind(null, comment.id)}
              onEdit={this.editComment.bind(null, comment.id)}
              onDelete={this.deleteComment.bind(null, comment.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PostDetail;
