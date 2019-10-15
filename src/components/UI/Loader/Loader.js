import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <div className={styles.Loader__FirstBar}> </div>
      <div className={styles.Loader__SecondBar}></div>
      <div className={styles.Loader__ThirdBar}></div>
    </div>
  );
};

export default Loader;
