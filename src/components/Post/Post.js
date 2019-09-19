import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './Post.module.css';
import Voter from '../Voter/Voter';
import EditButton from '../UI/EditButton/EditButton';
import DeleteButton from '../UI/DeleteButton/DeleteButton';

function Post(props) {
  const { post, onUpVote, onDownVote, onEdit, onDelete } = props;
  const {
    category,
    author,
    timestamp,
    title,
    body,
    voteScore,
    commentCount
  } = post;

  return (
    <div className={styles.Post}>
      <header className={styles.Post__Header}>
        <div>
          <span className={styles.Post__Category}>{category}</span>
          <span>|</span>
          <span>posted by {author}</span>
          <span>{moment(timestamp).calendar()}</span>
        </div>
        <div>
          <EditButton onClick={onEdit} />
          <DeleteButton onClick={onDelete} />
        </div>
      </header>

      <article className={styles.Post__Body}>
        <h3 className={styles.Post__Title}>{title}</h3>
        <p>{body}</p>
      </article>

      <aside className={styles.Post__Aside}>
        <Voter
          voteScore={voteScore}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </aside>

      <footer className={styles.Post__Footer}>
        <span>{commentCount} Comments</span>
      </footer>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired
};

export default Post;
