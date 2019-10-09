import React, { Component } from 'react';
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
import Button from '../../components/UI/Button/Button';
import EditButton from '../../components/UI/EditButton/EditButton';
import DeleteButton from '../../components/UI/DeleteButton/DeleteButton';
import Alert from '../../components/UI/Alert/Alert';

// Sub components of post
const PostHeader = ({
  category,
  author,
  timestamp,
  onEdit,
  onDelete
}) => (
  <header className={styles.Post__Header}>
    <div>
      <span className={styles.Post__Category}>{category}</span>
      <span>|</span>
      <span>posted by {author}</span>
      <span>{moment(timestamp).calendar()}</span>
    </div>
    <div>
      <EditButton onClick={onEdit} />
      <DeleteButton onClick={onDelete} />
    </div>
  </header>
);

const PostBody = ({ title, body, onClick }) => (
  <article className={styles.Post__Body} onClick={onClick}>
    <h3 className={styles.Post__Title}>{title}</h3>
    <p>{body}</p>
  </article>
);

const PostAside = ({ id, voteScore, upVotePost, downVotePost }) => (
  <aside className={styles.Post__Aside}>
    <Voter
      voteScore={voteScore}
      onUpVote={upVotePost.bind(null, id)}
      onDownVote={downVotePost.bind(null, id)}
    />
  </aside>
);

const PostFooter = ({ commentCount, onClick }) => (
  <footer className={styles.Post__Footer}>
    <Button
      onClick={onClick}
      Icon={CommentIcon}
      value={`${commentCount} Comments`}
      size="inline"
      customStyles={{ textTransform: 'capitalize' }}
    />
  </footer>
);

class Post extends Component {
  state = {
    showAlert: false
  };

  askConfirmation = () => {
    this.setState({ showAlert: true });
  };
  // Redirection functions
  redirectToPostFormPage = () => {
    this.props.history.push(`/posts/edit/${this.props.id}`);
  };
  redirectToPostDetailsPage = () => {
    this.props.history.push(`/posts/${this.props.id}`);
  };

  render() {
    const { post, upVotePost, downVotePost, deletePost } = this.props;

    if (post) {
      return (
        <div>
          {this.state.showAlert ? (
            <Alert
              title="Are you sure you wish to delete the post?"
              body="This cannot be undone"
              confirmText="Delete"
              onCancel={() => this.setState({ showAlert: false })}
              onConfirm={deletePost.bind(null, post.id)}
            />
          ) : null}
          <div className={styles.Post}>
            <PostHeader
              category={post.category}
              author={post.author}
              timestamp={post.timestamp}
              onEdit={this.redirectToPostFormPage}
              onDelete={this.askConfirmation}
            />
            <PostBody
              title={post.title}
              body={post.body}
              onClick={this.redirectToPostDetailsPage}
            />
            <PostAside
              id={post.id}
              voteScore={post.voteScore}
              upVotePost={upVotePost}
              downVotePost={downVotePost}
            />
            <PostFooter
              commentCount={post.commentCount}
              onClick={this.redirectToPostDetailsPage}
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

Post.propTypes = {
  id: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  post: state.posts.byId[ownProps.id]
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
