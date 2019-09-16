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
    open: false
  };

  toggle = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      open: !prevState.open
    }));
  };

  close = (e) => {
    e.preventDefault();
    this.setState(() => ({ open: false }));
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
            <div>{this.props.selected}</div>
            <Icon className={styles.Selector__Icon} />
          </div>
          <SelectorList
            open={this.state.open}
            options={this.props.options}
            onClick={this.props.onSelect}
          />
        </div>
      </div>
    );
  }
}

Selector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

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
              onClick={(e) => onClick(e, option)}
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

SelectorList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  open: PropTypes.bool,
  onClick: PropTypes.func
};

export default Selector;
