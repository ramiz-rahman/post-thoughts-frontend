import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button(props) {
  const { icon, value, onClick } = props;
  return (
    <button onClick={onClick} className={styles.Button}>
      <span>{icon}</span>
      <span>{value}</span>
    </button>
  );
}

Button.propTypes = {
  icon: PropTypes.object,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
