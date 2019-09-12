import React from 'react';
import moment from 'moment';
import {
  MdThumbUp as UpVote,
  MdThumbDown as DownVote
} from 'react-icons/md';
import styles from './Post.module.css';

function Post(props) {
  const { post, onUpVote, onDownVote } = props;
  const {
    id,
    category,
    author,
    timestamp,
    title,
    body,
    voteScore,
    commentCount
  } = post;

  return (
    <div className={styles.post}>
      <header className={styles.postHeader}>
        <span className={styles.category}>{category}</span> |
        <span className={styles.author}>posted by {author}</span> .
        <span>{moment(timestamp).calendar()}</span>
      </header>

      <article className={styles.postBody}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{body}</p>
      </article>

      <aside className={styles.postAside}>
        <UpVote
          className={styles.voteControl}
          onClick={() => onUpVote(id)}
        />
        <span>{voteScore}</span>
        <DownVote
          className={styles.voteControl}
          onClick={() => onDownVote(id)}
        />
      </aside>

      <footer className={styles.postFooter}>
        <span>{commentCount} Comments</span>
      </footer>
    </div>
  );
}

export default Post;
