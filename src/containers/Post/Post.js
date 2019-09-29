import React from 'react';
import PropTypes from 'prop-types';
import styles from './Post.module.css';

// Utilities
import moment from 'moment';
import { MdModeComment as CommentIcon } from 'react-icons/md';

// Redux Connection
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

// React-Router connection
import { withRouter } from 'react-router';

// Sub components
import Voter from '../../components/Voter/Voter';
import EditButton from '../../components/UI/EditButton/EditButton';
import DeleteButton from '../../components/UI/DeleteButton/DeleteButton';

function Post(props) {
  const { id, post, upVotePost, downVotePost, deletePost } = props;

  // Redirection functions
  const redirectToPostFormPage = () => {
    props.history.push(`/posts/edit/${id}`);
  };
  const redirectToPostDetailsPage = () => {
    props.history.push(`/posts/${id}`);
  };

  // Sub components of post
  const PostHeader = ({ category, author, timestamp }) => (
    <header className={styles.Post__Header}>
      <div>
        <span className={styles.Post__Category}>{category}</span>
        <span>|</span>
        <span>posted by {author}</span>
        <span>{moment(timestamp).calendar()}</span>
      </div>
      <div>
        <EditButton onClick={redirectToPostFormPage} />
        <DeleteButton onClick={deletePost.bind(null, id)} />
      </div>
    </header>
  );

  const PostBody = ({ title, body }) => (
    <article
      className={styles.Post__Body}
      onClick={redirectToPostDetailsPage}
    >
      <h3 className={styles.Post__Title}>{title}</h3>
      <p>{body}</p>
    </article>
  );

  const PostAside = ({ voteScore }) => (
    <aside className={styles.Post__Aside}>
      <Voter
        voteScore={voteScore}
        onUpVote={upVotePost.bind(null, id)}
        onDownVote={downVotePost.bind(null, id)}
      />
    </aside>
  );

  const PostFooter = ({ commentCount }) => (
    <footer className={styles.Post__Footer}>
      <button
        onClick={redirectToPostDetailsPage}
        className={styles.Post__Action}
      >
        <CommentIcon className={styles.Post__ActionIcon} />
        {commentCount} Comments
      </button>
    </footer>
  );

  if (post) {
    return (
      <div className={styles.Post}>
        <PostHeader {...post} />
        <PostBody {...post} />
        <PostAside {...post} />
        <PostFooter {...post} />
      </div>
    );
  } else {
    return null;
  }
}

Post.propTypes = {
  id: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  post: state.posts[ownProps.id]
});

const mapDispatchToProps = (dispatch) => ({
  upVotePost: (id) => dispatch(actionCreators.upVotePost(id)),
  downVotePost: (id) => dispatch(actionCreators.downVotePost(id)),
  deletePost: (id) => dispatch(actionCreators.deletePost(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Post));
