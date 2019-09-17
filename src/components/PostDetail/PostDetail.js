import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv5 from 'node-uuid';
import styles from './PostDetail.module.css';
import Post from '../Post/Post';
import Button from '../UI/Button/Button';
import Comment from '../Comment/Comment';
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

  handleChange = (e, attr) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ [attr]: value });
  };

  handleCommentChange = (e) => {
    this.handleChange(e, 'currentComment');
  };

  handleAuthorChange = (e) => {
    this.handleChange(e, 'author');
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

  addComment = (e) => {
    e.preventDefault();
    if (this.state.postId && this.state.currentComment) {
      const newComment = {
        id: uuidv5('ramiz'),
        parentId: this.state.postId,
        timestamp: Date.now(),
        author: this.state.author,
        body: this.state.currentComment
      };

      console.log(newComment);

      API.addCommentToPost(newComment).then((comment) =>
        this.setState((prevState) => ({
          comments: [...prevState.comments, comment],
          currentComment: '',
          author: ''
        }))
      );
    }
  };

  render() {
    return (
      <div>
        {this.props.post && <Post post={this.props.post} />}
        <form onSubmit={this.addComment}>
          <label>
            comment
            <textarea
              placeholder="What are your thoughts?"
              value={this.state.currentComment}
              onChange={this.handleCommentChange}
            />
            <Button value="comment" onClick={this.addComment} />
          </label>
          <label>
            author
            <input
              placeholder="Your name?"
              value={this.state.author}
              onChange={this.handleAuthorChange}
            />
          </label>
        </form>
        <div>
          {this.state.comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onUpVote={this.upVoteComment.bind(null, comment.id)}
              onDownVote={this.downVoteComment.bind(null, comment.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PostDetail;
