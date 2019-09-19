import React from 'react';
import PropTypes from 'prop-types';
import styles from './DeleteButton.module.css';
import { MdDeleteForever as Delete } from 'react-icons/md';

function DeleteButton({ onClick }) {
  return <Delete className={styles.DeleteButton} onClick={onClick} />;
}

DeleteButton.propTypes = {
  onClick: PropTypes.func
};

export default DeleteButton;
