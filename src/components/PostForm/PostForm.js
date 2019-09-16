import React, { Component } from 'react';
import Selector from '../UI/Selector/Selector';
import styles from './PostForm.module.css';
import * as API from '../../utils/PostsAPI';
import uuidv5 from 'node-uuid';

class PostForm extends Component {
  state = {
    category: '',
    author: '',
    title: '',
    body: '',
    categories: ['react', 'redux', 'porn', 'BBW', 'Anime']
  };

  handleChange = (e, attr, value) => {
    e.preventDefault();
    const val = value ? value : e.target.value;
    this.setState(() => ({ [attr]: val }));
  };

  handleCategoryChange = (e, value) => {
    this.handleChange(e, 'category', value);
  };

  handleAuthorChange = (e) => {
    this.handleChange(e, 'author');
  };

  handleTitleChange = (e) => {
    this.handleChange(e, 'title');
  };

  handleBodyChange = (e) => {
    this.handleChange(e, 'body');
  };

  createPost = (e) => {
    e.preventDefault();
    const post = {
      category: this.state.category,
      author: this.state.author,
      title: this.state.title,
      body: this.state.body,
      timestamp: Date.now(),
      id: uuidv5('ramiz')
    };
    API.createPost(post);
  };

  editPost = (e, id) => {
    e.preventDefault();
    const title = this.state.title;
    const body = this.state.body;
    API.updatePost(id, title, body);
  };

  render() {
    return (
      <form className={styles.PostForm} onSubmit={this.createPost}>
        <label className={styles.PostForm__Field}>
          Category
          <Selector
            options={this.state.categories}
            selected={this.state.category}
            onSelect={this.handleCategoryChange}
          />
        </label>
        <label className={styles.PostForm__Field}>
          Author
          <input
            type="text"
            name="author"
            placeholder="Enter your name"
            value={this.state.author}
            onChange={this.handleAuthorChange}
          />
        </label>
        <label className={styles.PostForm__Field}>
          Title
          <input
            type="text"
            name="title"
            placeholder="Enter post title here"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
        </label>
        <label className={styles.PostForm__Field}>
          Body
          <textarea
            placeholder="Enter content here"
            value={this.state.body}
            onChange={this.handleBodyChange}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    );
  }
}

export default PostForm;
