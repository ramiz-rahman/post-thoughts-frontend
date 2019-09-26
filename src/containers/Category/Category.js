import React, { Component } from 'react';
import styles from './Category.module.css';
import { Link } from 'react-router-dom';
import CategoryNav from '../../components/CategoryNav/CategoryNav';
import Sort from '../../components/Sort/Sort';
import Post from '../../components/Post/Post';
import * as API from '../../utils/PostsAPI';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Category extends Component {
  state = {
    posts: [],
    categories: [],
    currentPath: 'all',
    sortOrders: [
      'votes: ascending',
      'votes: descending',
      'time: ascending',
      'time: descending'
    ]
  };

  componentDidMount() {
    this.props.getAllCategories();
    this.props.getAllPosts();
    API.getCategories().then((categories) =>
      this.setState({ categories: categories })
    );
    API.getAllPosts().then((posts) => this.setState(() => ({ posts })));
  }

  componentDidUpdate() {
    const currentPath = this.props.match.params.id;
    if (
      currentPath &&
      currentPath !== this.state.currentPath &&
      (this.state.categories
        .map((category) => category.path)
        .includes(currentPath) ||
        currentPath === 'all')
    )
      this.setState({ currentPath });
  }

  handleSort = (e, order) => {
    e.preventDefault();

    const compareAsc = (a, b, field) => {
      return Number(a[field]) - Number(b[field]);
    };

    const compareDesc = (a, b, field) => {
      return -1 * compareAsc(a, b, field);
    };

    let posts = this.state.posts;
    if (order === 'votes: ascending') {
      posts = posts.sort((a, b) => compareAsc(a, b, 'voteScore'));
    } else if (order === 'votes: descending') {
      posts = posts.sort((a, b) => compareDesc(a, b, 'voteScore'));
    } else if (order === 'time: ascending') {
      posts = posts.sort((a, b) => compareAsc(a, b, 'timestamp'));
    } else if (order === 'time: descending') {
      posts = posts.sort((a, b) => compareDesc(a, b, 'timestamp'));
    }

    this.setState({ posts });
  };

  _filterPosts = () => {
    return this.state.currentPath === 'all'
      ? this.state.posts
      : this.state.posts.filter(
          (post) => post.category === this.state.currentPath
        );
  };

  render() {
    console.log(this.props.categories);
    const posts = this._filterPosts();

    return (
      <div className={styles.Category}>
        <section className={styles.Category__Nav}>
          <CategoryNav
            categories={[
              { name: 'all', path: 'all' },
              ...this.props.categories
            ]}
            currentPath={this.state.currentPath}
          />
        </section>

        <section className={styles.Category__Sort}>
          <Sort
            options={this.state.sortOrders}
            onSort={this.handleSort}
          />
          <Link to="/posts/new">Create Post</Link>
        </section>

        <section>
          {Object.keys(this.props.posts).map((postId) => {
            const post = this.props.posts[postId];
            return (
              <div className={styles.Category__Post} key={post.id}>
                <Post id={post.id} />
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  posts: state.posts
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAllCategories: () => dispatch(actions.getCategories()),
  getAllPosts: () => dispatch(actions.getAllPosts()),
  upVotePost: (id) => dispatch(actions.upVotePost(id)),
  downVotePost: (id) => dispatch(actions.downVotePost(id)),
  deletePost: (id) => dispatch(actions.deletePost(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
