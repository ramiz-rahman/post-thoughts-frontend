import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
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

  async componentDidMount() {
    await this.props.getCategories();
    let categories = this.props.categories;
    this.setState({
      categories: categories.map((category) => category.name)
    });
    /* API.getCategories().then((categories) =>
      this.setState({
        categories: categories.map((category) => category.name)
      })
    ); */
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
    this.props.addPost(category, author, title, body);
    /*   const post = {
      category,
      author,
      title,
      body,
      timestamp: Date.now(),
      id: uuidv5('ramiz')
    };
    API.createPost(post);
     */
    this.props.history.push('/category/all');
  };

  editPost = (id, { title, body }, e) => {
    e.preventDefault();
    this.props.editPost(id, title, body);
    // API.updatePost(id, title, body);
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

const mapStateToProps = (state) => ({
  categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(actionCreators.getCategories()),
  addPost: (category, title, author, body) =>
    dispatch(actionCreators.addPost({ category, author, title, body })),
  editPost: (id, title, body) =>
    dispatch(actionCreators.editPost({ id, title, body }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);
