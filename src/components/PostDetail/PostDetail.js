import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv5 from 'node-uuid';
import styles from './PostDetail.module.css';
import Post from '../Post/Post';
import Button from '../UI/Button/Button';
import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm';
import * as API from '../../utils/PostsAPI';

class PostDetail extends Component {
  state = {
    postId: null,
    comments: [],
    currentComment: '',
    author: ''
  };

  componentDidUpdate() {
    const postId = this.props.post ? this.props.post.id : null;
    if (postId && postId !== this.state.postId) {
      this.setState(() => ({ postId }));
      API.getPostComments(postId).then((comments) =>
        this.setState({ comments })
      );
    }
  }

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
    if (this.state.postId) {
      let newComment = {
        id: uuidv5('ramiz'),
        parentId: this.state.postId,
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
    return (
      <div>
        {this.props.post && <Post post={this.props.post} />}
        <CommentForm onSubmit={this.addComment} />
        <div>
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
