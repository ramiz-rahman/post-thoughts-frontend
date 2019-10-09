import React from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.module.css';

import Button from '../Button/Button';

const Alert = ({ title, body, confirmText, onConfirm, onCancel }) => {
  return (
    <div className={styles.Alert} onClick={onCancel}>
      <div className={styles.Alert__Content}>
        <h5>{title}</h5>
        <p>{body}</p>
        <div className={styles.Alert__Actions}>
          <Button size="inline" value="Cancel" onClick={onCancel} />
          <Button
            color="danger"
            size="s"
            value={confirmText ? confirmText : 'Confirm'}
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  confirmText: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
export default Alert;
