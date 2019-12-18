import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div>
        Made with <span className={styles.Footer__Heart}>&hearts;</span>{' '}
        by{' '}
        <a
          href="https://www.linkedin.com/in/ramiz-rahman/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.Footer__Link}
        >
          Ramiz Rahman
        </a>
      </div>
      <div>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.Footer__Link}
        >
          Demo
        </a>{' '}
        <a
          href="https://github.com/ramiz-rahman/post-thoughts-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.Footer__Link}
        >
          Code
        </a>
      </div>
    </div>
  );
};

export default Footer;
