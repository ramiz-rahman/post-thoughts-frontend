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
      this.props.onSubmit(this.state.author, this.state.comment);
      this.setState({ author: '', comment: '' });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.CommentForm}>
        <div className={styles.CommentForm__Header}>
          <label className={styles.CommentForm__AuthorInput}>
            <span className={styles.CommentForm__AuthorInputLabel}>
              Comment as
            </span>
            <input
              className={styles.CommentForm__AuthorInputBox}
              type="text"
              placeholder="Your name"
              value={this.state.author}
              onChange={this.handleAuthorChange}
              required
            />
          </label>
        </div>

        <textarea
          className={styles.CommentForm__Body}
          placeholder="What are your thoughts?"
          value={this.state.comment}
          onChange={this.handleCommentChange}
          required
        />
        <footer className={styles.CommentForm__Footer}>
          <Button
            value="Comment"
            onClick={this.handleSubmit}
            size="block"
            color="success"
          />
        </footer>
      </form>
    );
  }
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CommentForm;
