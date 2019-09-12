import React from 'react';
import styles from './App.module.css';
import Post from './Post/Post';

const samplePost = {
  id: '8xf0y6ziyjabvozdd253nd',
  timestamp: 1568319679205,
  title: 'Udacity is the best place to learn React',
  body:
    'Everyone says so after all.Everyone says so after all.Everyone says so after all.Everyone says so after all.Everyone says so after all.Everyone says so after all.Everyone says so after all.Everyone says so after all.Everyone says so after all.Everyone says so after all.',
  author: 'ramiz732',
  category: 'react',
  voteScore: 6,
  deleted: false,
  commentCount: 2
};

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <h1>Readable</h1>
      </header>
      <section>List of Categories</section>
      <section>Sort and Filter Controls</section>
      <section>
        <Post post={samplePost} />
      </section>
    </div>
  );
}

export default App;
