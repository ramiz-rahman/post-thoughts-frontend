import React from 'react';
import PropTypes from 'prop-types';
import styles from './Backdrop.module.css';

const Backdrop = (props) => {
  let classes = _getClassModifiers(props);
  const onClick = props.onClick ? props.onClick : null;
  const backdrop = <div className={classes} onClick={onClick} />;
  return props.show ? backdrop : null;
};

Backdrop.propTypes = {
  show: PropTypes.bool,
  opaque: PropTypes.bool,
  dark: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

function _getClassModifiers(props) {
  let modifiers = `${styles.Backdrop}`;
  if (props.opaque)
    modifiers = modifiers.concat(` ${styles.Backdrop_opaque}`);
  if (props.dark)
    modifiers = modifiers.concat(` ${styles.Backdrop_dark}`);
  if (props.onClick)
    modifiers = modifiers.concat(` ${styles.Backdrop_clickable}`);
  if (props.className)
    modifiers = modifiers.concat(` ${props.className}`);
  return modifiers;
}

export default Backdrop;
