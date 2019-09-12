import React from 'react';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <h1>Readable</h1>
      </header>
      <section>List of Categories</section>
      <section>Sort and Filter Controls</section>
      <section>List of Posts</section>
    </div>
  );
}

export default App;
