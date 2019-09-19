import React, { Component } from 'react';
import styles from './App.module.css';
import Post from './Post/Post';
import Sort from './Sort/Sort';
import PostForm from './PostForm/PostForm';
import Modal from './UI/Modal/Modal';
import Button from './UI/Button/Button';
import PostDetail from './PostDetail/PostDetail';
import { MdAdd as Add } from 'react-icons/md';
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

  voteOnPost = async (postId, vote, e) => {
    e.preventDefault();

    const votedPost = await PostsAPI.voteOnPost(postId, {
      option: vote
    });

    const _updateIfNew = (post, newPost) => {
      return post.id === newPost.id ? newPost : post;
    };

    const _updatePosts = (posts, newPost) => {
      return posts.map((post) => _updateIfNew(post, newPost));
    };

    this.setState((prevState) => ({
      posts: _updatePosts(prevState.posts, votedPost)
    }));
  };

  upVote = async (postId, e) => {
    this.voteOnPost(postId, 'upVote', e);
  };

  downVote = async (postId, e) => {
    this.voteOnPost(postId, 'downVote', e);
  };

  editPost = async (postId, title, body, e) => {
    e.preventDefault();
    const updatedPost = await PostsAPI.updatePost(postId, title, body);
    const posts = this.state.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    this.setState({ posts });
  };

  deletePost = async (postId, e) => {
    e.preventDefault();
    const deletedPost = await PostsAPI.deletePost(postId);
    this.setState((prevState) => ({
      posts: prevState.posts.filter(
        (post) => post.id !== deletedPost.id
      )
    }));
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

          <Button
            onClick={this.openModal}
            value="Create Post"
            Icon={Add}
          />
        </section>
        <section>
          Sort By: <Sort />
        </section>
        <section>
          <PostDetail
            post={this.state.posts ? this.state.posts[0] : null}
          />
        </section>
        <section>
          {this.state.posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onUpVote={this.upVote.bind(null, post.id)}
              onDownVote={this.downVote.bind(null, post.id)}
              onDelete={this.deletePost.bind(null, post.id)}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
