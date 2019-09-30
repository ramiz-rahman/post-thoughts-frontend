import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

function _enhanceClassName(className, enhancer) {
  return `${className} ${enhancer}`;
}

function addSize(className, size) {
  if (size === 'inline') {
    return _enhanceClassName(className, styles.Button_size_inline);
  } else if (size === 's') {
    return _enhanceClassName(className, styles.Button_size_s);
  } else if (size === 'm') {
    return _enhanceClassName(className, styles.Button_size_m);
  } else if (size === 'l') {
    return _enhanceClassName(className, styles.Button_size_l);
  } else if (size === 'block') {
    return _enhanceClassName(className, styles.Button_size_block);
  } else {
    return className;
  }
}

function addColor(className, color) {
  if (color === 'success') {
    return _enhanceClassName(className, styles.Button_color_success);
  } else if (color === 'warning') {
    return _enhanceClassName(className, styles.Button_color_warning);
  } else if (color === 'danger') {
    return _enhanceClassName(className, styles.Button_color_danger);
  } else {
    return className;
  }
}

function Button(props) {
  const { Icon, value, onClick, size, color, customStyles } = props;
  let classNames = styles.Button;
  classNames = addColor(classNames, color);
  classNames = addSize(classNames, size);
  return (
    <button
      onClick={onClick}
      className={classNames}
      style={customStyles}
    >
      {Icon && <Icon className={styles.Button__Icon} />}
      <span className={styles.Button__Text}>{value}</span>
    </button>
  );
}

Button.propTypes = {
  Icon: PropTypes.func,
  size: PropTypes.oneOf(['inline', 's', 'm', 'l', 'block']),
  color: PropTypes.oneOf(['success', 'warning', 'danger']),
  customStyles: PropTypes.object,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
