import React, { Component } from 'react';
import styles from './CategoryView.module.css';

// Utilities

// Redux Connection
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { getFilteredPostList } from '../../reducers';

// Sub components
import CategoryNav from '../../components/CategoryNav/CategoryNav';
import Sort from '../../components/Sort/Sort';
import Post from '../Post/Post';
import Button from '../../components/UI/Button/Button';
import { MdAdd as AddIcon } from 'react-icons/md';
import {
  MdNewReleases,
  MdWhatshot,
  MdStar,
  MdAvTimer
} from 'react-icons/md';

import {
  MdMenu as MenuClosed,
  MdClose as MenuOpened
} from 'react-icons/md';

import ActionBar from '../../components/ActionBar/ActionBar';
class Category extends Component {
  state = {
    sortOrders: [
      { Icon: MdStar, text: 'Top Rated' },
      { Icon: MdWhatshot, text: 'Controversial' },
      { Icon: MdNewReleases, text: 'Latest' },
      { Icon: MdAvTimer, text: 'Oldest' }
    ],
    menuOpen: false
  };

  handleSort = (order) => {
    this.props.history.push(`?sortBy=${order}`);
  };

  toggleMenu = () =>
    this.setState((prevState) => ({ menuOpen: !prevState.menuOpen }));

  render() {
    const posts = this.props.posts;
    return (
      <div className={styles.CategoryView}>
        <div className={styles.CategoryView__NavigationBarContainer}>
          <button
            onClick={this.toggleMenu}
            className={styles.CategoryView__MenuButton}
          >
            {this.state.menuOpen ? MenuOpened() : MenuClosed()}
          </button>
          <div
            className={
              this.state.menuOpen
                ? null
                : styles.CategoryView__NavigationBar_hidden
            }
          >
            <div className={styles.CategoryView__NavigationBar}>
              <ActionBar categories={this.props.categories} />
            </div>
          </div>
        </div>

        <section className={styles.CategoryView__PostList}>
          {posts.map((post) => (
            <div className={styles.CategoryView__Post} key={post.id}>
              <Post id={post.id} />
            </div>
          ))}
        </section>
      </div>
    );
  }
}

const _sortPosts = (postList, order) => {
  const compareAsc = (a, b, field) => {
    return Number(a[field]) - Number(b[field]);
  };

  const compareDesc = (a, b, field) => {
    return -1 * compareAsc(a, b, field);
  };

  let posts = postList;
  if (order === 'Controversial') {
    posts = postList.sort((a, b) => compareAsc(a, b, 'voteScore'));
  } else if (order === 'Top Rated') {
    posts = postList.sort((a, b) => compareDesc(a, b, 'voteScore'));
  } else if (order === 'Oldest') {
    posts = postList.sort((a, b) => compareAsc(a, b, 'timestamp'));
  } else if (order === 'Latest') {
    posts = postList.sort((a, b) => compareDesc(a, b, 'timestamp'));
  }

  return posts;
};

const mapStateToProps = (state, ownProps) => {
  let postList = getFilteredPostList(state, ownProps.match.params.id);
  let sortBy = new URLSearchParams(ownProps.location.search).get(
    'sortBy'
  );
  let sortedPostList = _sortPosts(postList, sortBy);
  return {
    categories: state.categories,
    posts: sortedPostList
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  upVotePost: (id) => dispatch(actions.upVotePost(id)),
  downVotePost: (id) => dispatch(actions.downVotePost(id)),
  deletePost: (id) => dispatch(actions.deletePost(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
