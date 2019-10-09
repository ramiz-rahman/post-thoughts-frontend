import React from 'react';
import propTypes from 'prop-types';
import styles from './Alert.module.css';

import Button from '../Button/Button';
import Backdrop from '../Backdrop/Backdrop';

const Alert = ({ title, body, confirmText, onConfirm, onCancel }) => {
  return (
    <div className={styles.Alert} onClick={onCancel}>
      {/* <Backdrop show opaque dark onClick={onCancel} /> */}
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

export default Alert;
