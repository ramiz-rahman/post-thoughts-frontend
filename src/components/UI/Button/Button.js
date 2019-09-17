import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button(props) {
  const { Icon, value, onClick } = props;
  return (
    <button onClick={onClick} className={styles.Button}>
      <Icon className={styles.Button__Icon} />
      <span>{value}</span>
    </button>
  );
}

Button.propTypes = {
  Icon: PropTypes.func,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
