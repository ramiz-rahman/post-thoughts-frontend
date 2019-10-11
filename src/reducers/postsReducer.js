import { combineReducers } from 'redux';
import byId from './postsById';
import allIds from './postsAllIds';

// SAMPLE OF STATE SLICE
/* 
const posts = {
  byId: {
    '8xf0y6ziyjabvozdd253nd': {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872634,
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      voteScore: 6,
      deleted: false,
      commentCount: 2
    },
    '6ni6ok3ym7mf1p33lnez': {
      id: '6ni6ok3ym7mf1p33lnez',
      timestamp: 1468479767190,
      title: 'Learn Redux in 10 minutes!',
      body:
        'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thingone',
      category: 'redux',
      voteScore: -5,
      deleted: false,
      commentCount: 0
    }
  }
  allIds: ['8xf0y6ziyjabvozdd253nd', '6ni6ok3ym7mf1p33lnez'];
}
}; */

const postsReducer = combineReducers({
  byId,
  allIds
});

export default postsReducer;

// Selector: Return a list of posts filtered by category
export const getFilteredPostList = (state, filter) => {
  let postList = state.allIds.map((postId) => state.byId[postId]);
  if (!filter || filter !== 'all') {
    postList = postList.filter((post) => post.category === filter);
  }
  return postList;
};
