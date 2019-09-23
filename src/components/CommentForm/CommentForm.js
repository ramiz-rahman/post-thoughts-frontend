import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './CommentForm.module.css';
import Button from '../UI/Button/Button';

class CommentForm extends Component {
  state = {
    author: '',
    comment: ''
  };

  handleChange = (e, attr) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ [attr]: value });
  };

  handleCommentChange = (e) => {
    this.handleChange(e, 'comment');
  };

  handleAuthorChange = (e) => {
    this.handleChange(e, 'author');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.author && this.state.comment) {
      this.props.onSubmit(this.state.author, this.state.comment, e);
      this.setState({ author: '', comment: '' });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.CommentForm}>
        <label className={styles.CommentForm__Header}>
          Comment as{' '}
          <input
            className={styles.CommentForm__AuthorInput}
            type="text"
            value={this.state.author}
            onChange={this.handleAuthorChange}
            required
          />{' '}
        </label>
        <textarea
          className={styles.CommentForm__Body}
          placeholder="What are your thoughts"
          value={this.state.comment}
          onChange={this.handleCommentChange}
          required
        />
        <footer className={styles.CommentForm__Footer}>
          <Button value="Comment" onClick={this.handleSubmit} />
        </footer>
      </form>
    );
  }
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CommentForm;
