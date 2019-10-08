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

    let enhancedSelector = `${styles.Selector}`;
    if (this.state.open) {
      enhancedSelector = enhancedSelector.concat(
        ` ${styles.Selector_listOpen}`
      );
    }

    return (
      <div className={styles.SelectorWrapper}>
        <Backdrop show={this.state.open} onClick={this.close} />

        <div className={enhancedSelector} onClick={this.toggle}>
          <div className={styles.Selector__Header}>
            {this.props.selected ? (
              <div>{this.props.selected}</div>
            ) : (
              <div className={styles.Selector__Placeholder}>
                {this.props.placeholder}
              </div>
            )}
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
  options: PropTypes.array,
  selected: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

function SelectorList(props) {
  const { options, open, onClick } = props;

  if (open) {
    return (
      <ul className={styles.Selector__List}>
        {options.map((option) => {
          const { Icon, text } = option;
          return (
            <li
              key={text}
              className={styles.Selector__ListItem}
              onClick={(e) => onClick(e, text)}
            >
              <span className={styles.Selector__ListIcon}>
                {Icon ? Icon() : null}
              </span>
              <span className={styles.Selector__ListText}>
                {text ? text : null}
              </span>
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
  options: PropTypes.array,
  open: PropTypes.bool,
  onClick: PropTypes.func
};

export default Selector;
