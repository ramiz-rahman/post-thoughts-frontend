import React from 'react';
import moment from 'moment';
import Voter from '../Voter/Voter';
import PropTypes from 'prop-types';
import styles from './Comment.module.css';

function Comment(props) {
  const { comment, onUpVote, onDownVote } = props;
  const { id, parentId, timestamp, body, author, voteScore } = comment;
  let commentStatus = null;
  if (voteScore > 0) {
    commentStatus = styles.Comment__Aside_votes_positive;
  } else if (voteScore < 0) {
    commentStatus = styles.Comment__Aside_votes_negative;
  }
  return (
    <div className={styles.Comment}>
      <header className={styles.Comment__Header}>
        <span>{author}</span>
        <span>{moment(timestamp).calendar()}</span>
      </header>
      <article className={styles.Comment__Body}>{body}</article>
      <aside className={`${styles.Comment__Aside} ${commentStatus}`}>
        <Voter
          voteScore={voteScore}
          size="s"
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </aside>
      <footer className={styles.Comment__Footer}>Actions</footer>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired
};
export default Comment;
