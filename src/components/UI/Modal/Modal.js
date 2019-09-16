import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.module.css';

const Modal = (props) => {
  const { title, isOpen, close } = props;

  return isOpen ? (
    <div className={styles.ModalWrapper}>
      <Backdrop show opaque dark onClick={props.close} />
      <div className={styles.Modal}>
        <header>
          <h2>{title}</h2>
        </header>
        <article>{props.children}</article>
        <footer>
          <p>Copyright</p>
        </footer>
      </div>
    </div>
  ) : null;
};

function _getModifiers(props) {
  let modifiers = ` ${styles.Modal}`;
  if (props.open) modifiers = modifiers.concat(` ${styles.Modal_open}`);
  return modifiers;
}

export default Modal;
