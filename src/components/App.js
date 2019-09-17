import React, { Component } from 'react';
import styles from './App.module.css';
import Post from './Post/Post';
import Sort from './Sort/Sort';
import PostForm from './PostForm/PostForm';
import Modal from './UI/Modal/Modal';
import Button from './UI/Button/Button';
import * as PostsAPI from '../utils/PostsAPI';

class App extends Component {
  state = {
    posts: [],
    categories: [],
    modalOpen: false
  };
  componentDidMount() {
    PostsAPI.getAllPosts().then((posts) =>
      this.setState(() => ({ posts }))
    );
    PostsAPI.getCategories().then((categories) =>
      this.setState({ categories: categories })
    );
  }

  upVote = (postId) => {
    PostsAPI.vote(postId, { option: 'upVote' }).then(
      this.setState((prevState) => {
        const posts = prevState.posts.map((post) => {
          if (post.id === postId) {
            post.voteScore += 1;
          }
          return post;
        });
        return { posts };
      })
    );
  };

  downVote = (postId) => {
    PostsAPI.vote(postId, { option: 'downVote' }).then(
      this.setState((prevState) => {
        const posts = prevState.posts.map((post) => {
          if (post.id === postId) {
            post.voteScore -= 1;
          }
          return post;
        });
        return { posts };
      })
    );
  };

  closeModal = (e) => {
    e.preventDefault();
    this.setState(() => ({ modalOpen: false }));
  };

  openModal = (e) => {
    e.preventDefault();
    this.setState(() => ({ modalOpen: true }));
  };

  render() {
    return (
      <div className={styles.App}>
        <Modal isOpen={this.state.modalOpen} close={this.closeModal}>
          <PostForm />
        </Modal>
        <header className={styles.Header}>
          <h1>Readable</h1>
        </header>
        <section>
          <ul>
            {this.state.categories.map((category) => (
              <li key={category.path}>{category.name}</li>
            ))}
          </ul>

          <Button onClick={this.openModal} value="Create Post" />
        </section>
        <section>
          Sort By: <Sort />
        </section>
        <section>
          {this.state.posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onUpVote={this.upVote}
              onDownVote={this.downVote}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
