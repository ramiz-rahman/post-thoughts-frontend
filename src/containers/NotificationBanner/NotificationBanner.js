import React from 'react';
import styles from './NotificationBanner.module.css';

// Redux Connection
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

// Sub components
import { MdClose as CloseIcon } from 'react-icons/md';

function _enhanceClassName(className, enhancer) {
  return `${className} ${enhancer}`;
}

function addColor(className, color) {
  if (color === 'success') {
    return _enhanceClassName(
      className,
      styles.NotificationBanner_color_success
    );
  } else if (color === 'warning') {
    return _enhanceClassName(
      className,
      styles.NotificationBanner_color_warning
    );
  } else if (color === 'danger') {
    return _enhanceClassName(
      className,
      styles.NotificationBanner_color_danger
    );
  } else {
    return className;
  }
}

const NotificationBanner = ({ message, color, close }) => {
  let className = styles.NotificationBanner;
  className = addColor(className, color);
  return message ? (
    <div className={className}>
      <div>{message}</div>
      <CloseIcon
        className={styles.NotificationBanner__CloseIcon}
        onClick={close}
      />
    </div>
  ) : null;
};

const mapStateToProps = (state, ownProps) => ({
  message: state.ui.notification.message,
  color: state.ui.notification.color
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(actionCreators.clearNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationBanner);
