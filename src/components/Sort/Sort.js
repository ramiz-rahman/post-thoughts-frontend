import React, { Component } from 'react';
import { MdSort as Icon } from 'react-icons/md';
import Selector from '../UI/Selector/Selector';
import styles from './Sort.module.css';

class Sort extends Component {
  state = {
    options: [
      'Votes: Ascending',
      'Votes: Descending',
      'Time: Ascending',
      'Time: Descending'
    ],
    selected: 'Votes: Ascending'
  };

  handleSelect = (e, option) => {
    e.preventDefault();
    this.setState(() => ({
      selected: option
    }));
  };

  render() {
    return (
      <div className={styles.Sort}>
        <Icon className={styles.Sort__Icon} />
        <Selector
          selected={this.state.selected}
          options={this.state.options}
          onSelect={this.handleSelect}
        />
      </div>
    );
  }
}

export default Sort;
