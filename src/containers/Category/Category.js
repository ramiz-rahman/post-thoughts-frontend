import React, { Component } from 'react';
import styles from './Category.module.css';
import { Link } from 'react-router-dom';
import CategoryNav from '../../components/CategoryNav/CategoryNav';
import Sort from '../../components/Sort/Sort';
import Post from '../../components/Post/Post';
import * as API from '../../utils/PostsAPI';

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
    API.getCategories().then((categories) =>
      this.setState({ categories: categories })
    );
    API.getAllPosts().then((posts) => this.setState(() => ({ posts })));
  }

  componentDidUpdate() {
    const currentPath = this.props.match.params.id;
    if (currentPath !== this.state.currentPath)
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

  voteOnPost = async (postId, vote, e) => {
    e.preventDefault();

    const votedPost = await API.voteOnPost(postId, {
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

  upVotePost = async (postId, e) => {
    this.voteOnPost(postId, 'upVote', e);
  };

  downVotePost = async (postId, e) => {
    this.voteOnPost(postId, 'downVote', e);
  };

  editPost = async (postId, title, body, e) => {
    e.preventDefault();
    const updatedPost = await API.updatePost(postId, title, body);
    const posts = this.state.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    this.setState({ posts });
  };

  deletePost = async (postId, e) => {
    e.preventDefault();
    const deletedPost = await API.deletePost(postId);
    this.setState((prevState) => ({
      posts: prevState.posts.filter(
        (post) => post.id !== deletedPost.id
      )
    }));
  };

  _filterPosts = () => {
    return this.state.currentPath === 'all'
      ? this.state.posts
      : this.state.posts.filter(
          (post) => post.category === this.state.currentPath
        );
  };

  render() {
    const posts = this._filterPosts();

    return (
      <div className={styles.Category}>
        <section className={styles.Category__Nav}>
          <CategoryNav
            categories={[
              { name: 'all', path: 'all' },
              ...this.state.categories
            ]}
            currentPath={this.state.currentPath}
          />
        </section>

        <section className={styles.Category__Sort}>
          <Sort
            options={this.state.sortOrders}
            onSort={this.handleSort}
          />
        </section>

        <section>
          {posts.map((post) => (
            <div className={styles.Category__Post} key={post.id}>
              <Post
                post={post}
                onUpVote={this.upVotePost.bind(null, post.id)}
                onDownVote={this.downVotePost.bind(null, post.id)}
                onEdit={this.editPost.bind(null, post.id)}
                onDelete={this.deletePost.bind(null, post.id)}
              />
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default Category;
