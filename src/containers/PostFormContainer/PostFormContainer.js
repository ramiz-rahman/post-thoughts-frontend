import React, { Component } from 'react';
import styles from './PostFormContainer.module.css';

// Redux connection
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

// Sub Components
import PostForm from '../../components/PostForm/PostForm';

class PostFormContainer extends Component {
  render() {
    return (
      <div className={styles.PostFormContainer}>
        <PostForm
          categories={this.props.categories}
          onCreate={this.props.createPost}
          onEdit={this.props.editPost}
          editing={this.props.editing}
          post={this.props.post}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const editing = ownProps.match.path.includes('edit');
  const postId = editing ? ownProps.match.params.id : null;

  return {
    categories: state.categories.map((category) => category.name),
    post: postId ? state.posts[postId] : null,
    editing
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const editing = ownProps.match.path.includes('edit');
  const postId = editing ? ownProps.match.params.id : null;

  return {
    getCategories: () => dispatch(actionCreators.getCategories()),
    createPost: ({ category, title, author, body }) => {
      dispatch(
        actionCreators.createPost({ category, author, title, body })
      );
      ownProps.history.goBack();
    },

    editPost: ({ title, body }) => {
      dispatch(actionCreators.editPost({ id: postId, title, body }));
      ownProps.history.goBack();
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFormContainer);
