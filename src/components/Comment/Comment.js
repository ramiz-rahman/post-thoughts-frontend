import React, { Component, Fragment } from 'react';
import moment from 'moment';
import Voter from '../Voter/Voter';
import PropTypes from 'prop-types';
import styles from './Comment.module.css';

class Comment extends Component {
  state = {
    isEditing: false,
    body: ''
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

  render() {
    const { comment, onUpVote, onDownVote, onDelete } = this.props;
    const { timestamp, author, voteScore } = comment;

    return (
      <div className={styles.Comment}>
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
          onDelete={onDelete}
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
      <span>{author}</span>
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
      <button onClick={onEditSave} className={styles.Comment__Action}>
        Save
      </button>
      <button onClick={onEditCancel} className={styles.Comment__Action}>
        Cancel
      </button>
    </Fragment>
  ) : (
    <Fragment>
      <button onClick={onEdit} className={styles.Comment__Action}>
        Edit
      </button>
      <button onClick={onDelete} className={styles.Comment__Action}>
        Delete
      </button>
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
