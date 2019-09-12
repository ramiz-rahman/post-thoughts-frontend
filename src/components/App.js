import React, { Component } from 'react';
import styles from './App.module.css';
import Post from './Post/Post';
import * as PostsAPI from '../utils/PostsAPI';

class App extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    PostsAPI.getAllPosts().then((posts) =>
      this.setState(() => ({ posts }))
    );
  }
  render() {
    return (
      <div className={styles.App}>
        <header className={styles.Header}>
          <h1>Readable</h1>
        </header>
        <section>List of Categories</section>
        <section>Sort and Filter Controls</section>
        <section>
          {this.state.posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
