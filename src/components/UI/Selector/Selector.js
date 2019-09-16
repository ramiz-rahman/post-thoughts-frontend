import React, { Component } from 'react';
import {
  MdExpandMore as AngleDown,
  MdExpandLess as AngleUp
} from 'react-icons/md';
import PropTypes from 'prop-types';
import styles from './Selector.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Selector extends Component {
  state = {
    selected: 'Votes: Ascending',
    open: false
  };

  select = (option) => {
    this.setState(() => ({
      selected: option
    }));
  };

  toggle = () => {
    this.setState((prevState) => ({
      open: !prevState.open
    }));
  };

  close = () => {
    this.setState(() => ({ open: false }), console.log('CLICKed'));
  };

  render() {
    const Icon = this.state.open ? AngleUp : AngleDown;
    let modifiers = `${styles.Selector}`;
    if (this.state.open) {
      modifiers = modifiers.concat(` ${styles.Selector_listOpen}`);
    }

    return (
      <div className={styles.SelectorWrapper}>
        <Backdrop show={this.state.open} onClick={this.close} />
        <div className={modifiers} onClick={this.toggle}>
          <div className={styles.Selector__Header}>
            <div>{this.state.selected}</div>
            <Icon className={styles.Selector__Icon} />
          </div>
          <SelectorList
            open={this.state.open}
            options={this.props.options}
            onClick={this.select}
          />
        </div>
      </div>
    );
  }
}

function SelectorList(props) {
  const { options, open, onClick } = props;

  if (open) {
    return (
      <ul className={styles.Selector__List}>
        {options.map((option) => {
          return (
            <li
              key={option}
              className={styles.Selector__ListItem}
              onClick={() => onClick(option)}
            >
              {option}
            </li>
          );
        })}
      </ul>
    );
  } else {
    return null;
  }
}

export default Selector;
