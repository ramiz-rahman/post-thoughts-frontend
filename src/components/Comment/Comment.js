import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Comment.module.css';

// Utils
import moment from 'moment';

// Sub components
import Voter from '../Voter/Voter';
import Alert from '../UI/Alert/Alert';
import Button from '../UI/Button/Button';

class Comment extends Component {
  state = {
    isEditing: false,
    body: '',
    showAlert: false
  };

  componentDidMount() {
    if (this.props.comment.body)
      this.setState({ body: this.props.comment.body });
  }

  handleBodyChange = (e) => {
    e.preventDefault();
    const body = e.target.value;
    this.setState({ body });
  };

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({ isEditing: true });
  };

  handleEditSave = (e) => {
    e.preventDefault();
    this.setState({ isEditing: false });
    this.props.onEdit(this.state.body, e);
  };

  handleEditCancel = (e) => {
    e.preventDefault();
    this.setState({ isEditing: false, body: this.props.comment.body });
  };

  handleDelete = (e) => {
    e.preventDefault();
    this.setState({ showAlert: true });
  };

  render() {
    const { comment, onUpVote, onDownVote, onDelete } = this.props;
    const { timestamp, author, voteScore } = comment;

    return (
      <div className={styles.Comment}>
        {this.state.showAlert ? (
          <Alert
            title="Are you sure you wish to delete this comment?"
            body="This cannot be undone."
            confirmText="Delete"
            onCancel={() => this.setState({ showAlert: false })}
            onConfirm={onDelete}
          />
        ) : null}
        <CommentHeader author={author} timestamp={timestamp} />
        <CommentAside
          voteScore={voteScore}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
        <CommentBody
          body={this.state.body}
          onChange={this.handleBodyChange}
          isEditing={this.state.isEditing}
        />
        <CommentFooter
          isEditing={this.state.isEditing}
          onEdit={this.handleEdit}
          onEditSave={this.handleEditSave}
          onEditCancel={this.handleEditCancel}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

/* Internal Components */

// HEADER
function CommentHeader({ author, timestamp }) {
  return (
    <header className={styles.Comment__Header}>
      <em>{author}</em>
      <span>{moment(timestamp).calendar()}</span>
    </header>
  );
}

CommentHeader.propTypes = {
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

// ASIDE
function CommentAside({ voteScore, onUpVote, onDownVote }) {
  let commentStatus = null;
  if (voteScore > 0) {
    commentStatus = styles.Comment__Aside_votes_positive;
  } else if (voteScore < 0) {
    commentStatus = styles.Comment__Aside_votes_negative;
  }
  return (
    <aside className={`${styles.Comment__Aside} ${commentStatus}`}>
      <Voter
        voteScore={voteScore}
        size="s"
        onUpVote={onUpVote}
        onDownVote={onDownVote}
      />
    </aside>
  );
}

CommentAside.propTypes = {
  voteScore: PropTypes.number.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired
};

// Body
function CommentBody({ isEditing = false, body, onChange }) {
  return (
    <article className={styles.Comment__Body}>
      {isEditing ? (
        <textarea
          placeholder="What are your thoughts?"
          value={body}
          onChange={onChange}
          className={styles.Comment__TextInput}
        />
      ) : (
        body
      )}
    </article>
  );
}

CommentBody.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  body: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

// Footer
function CommentFooter({
  isEditing = false,
  onEdit,
  onEditSave,
  onEditCancel,
  onDelete
}) {
  const actions = isEditing ? (
    <Fragment>
      <Button
        onClick={onEditSave}
        className={styles.Comment__Action}
        value="Save"
      />
      <Button
        onClick={onEditCancel}
        className={styles.Comment__Action}
        value="Cancel"
        size="inline"
      />
    </Fragment>
  ) : (
    <Fragment>
      <Button
        onClick={onEdit}
        className={styles.Comment__Action}
        value="Edit"
        size="inline"
      />
      <Button
        onClick={onDelete}
        className={styles.Comment__Action}
        size="inline"
        value="Delete"
      />
    </Fragment>
  );
  return <footer className={styles.Comment__Footer}>{actions}</footer>;
}

CommentFooter.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onEditSave: PropTypes.func.isRequired,
  onEditCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Comment;
