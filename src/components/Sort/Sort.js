import React from 'react';
import PropTypes from 'prop-types';
import { MdSort as Icon } from 'react-icons/md';
import Selector from '../UI/Selector/Selector';
import styles from './Sort.module.css';

const Sort = ({ selected, options, onSort }) => {
  return (
    <div className={styles.Sort}>
      <div className={styles.Sort__Label}>
        <Icon className={styles.Sort__Icon} />
        <span>Sort By</span>
      </div>

      <Selector
        selected={selected}
        placeholder="Default"
        options={options}
        onSelect={onSort}
      />
    </div>
  );
};

Sort.propTypes = {
  options: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired
};

export default Sort;
