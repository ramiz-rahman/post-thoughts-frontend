import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdSort as Icon } from 'react-icons/md';
import Selector from '../UI/Selector/Selector';
import styles from './Sort.module.css';

class Sort extends Component {
  state = {
    selected: ''
  };

  handleSelect = (e, option) => {
    e.preventDefault();
    this.setState(() => ({
      selected: option
    }));
    this.props.onSort(e, option);
  };

  render() {
    return (
      <div className={styles.Sort}>
        <div className={styles.Sort__Label}>
          <Icon className={styles.Sort__Icon} />
          <span>Sort By</span>
        </div>

        <Selector
          selected={this.state.selected}
          placeholder="Default"
          options={this.props.options}
          onSelect={this.handleSelect}
        />
      </div>
    );
  }
}

Sort.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSort: PropTypes.func.isRequired
};

export default Sort;
