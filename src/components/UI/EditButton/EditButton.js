import React from 'react';
import PropTypes from 'prop-types';
import styles from './EditButton.module.css';
import { MdEdit as Edit } from 'react-icons/md';

function EditButton({ onClick }) {
  return <Edit className={styles.EditButton} onClick={onClick} />;
}

EditButton.propTypes = {
  onClick: PropTypes.func
};

export default EditButton;
