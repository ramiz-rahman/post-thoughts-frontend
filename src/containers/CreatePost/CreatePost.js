import React, { Component } from 'react';
import styles from './CreatePost.module.css';
import PostForm from '../../components/PostForm/PostForm';
import * as API from '../../utils/PostsAPI';
import uuidv5 from 'node-uuid';

class CreatePost extends Component {
  state = {
    editing: false,
    post: null,
    categories: []
  };

  componentDidMount() {
    API.getCategories().then((categories) =>
      this.setState({
        categories: categories.map((category) => category.name)
      })
    );
    const postId = this.props.match.params.id;
    const editing = this.props.match.path.includes('edit');
    if (editing && postId) {
      API.getPost(postId).then((post) =>
        this.setState({ editing, post })
      );
    }
  }

  createPost = ({ category, author, title, body }, e) => {
    e.preventDefault();
    const post = {
      category,
      author,
      title,
      body,
      timestamp: Date.now(),
      id: uuidv5('ramiz')
    };
    API.createPost(post);
    this.props.history.push('/category/all');
  };

  editPost = (id, { title, body }, e) => {
    e.preventDefault();
    API.updatePost(id, title, body);
    this.props.history.push('/category/all');
  };

  render() {
    return (
      <div className={styles.CreatePost}>
        <PostForm
          categories={this.state.categories}
          onCreate={this.createPost}
          onEdit={this.editPost.bind(
            null,
            this.state.post ? this.state.post.id : null
          )}
          editing={this.state.editing}
          post={this.state.post}
        />
      </div>
    );
  }
}

export default CreatePost;
