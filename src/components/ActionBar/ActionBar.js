import React, { Component } from 'react';
import styles from './ActionBar.module.css';

import { withRouter } from 'react-router';

// Sub components
import CategoryNav from '../CategoryNav/CategoryNav';
import Sort from '../Sort/Sort';
import Button from '../UI/Button/Button';
import { MdAdd as AddIcon } from 'react-icons/md';
import {
  MdNewReleases,
  MdWhatshot,
  MdStar,
  MdAvTimer
} from 'react-icons/md';

class ActionBar extends Component {
  state = {
    sortOrders: [
      { Icon: MdStar, text: 'Top Rated' },
      { Icon: MdWhatshot, text: 'Controversial' },
      { Icon: MdNewReleases, text: 'Latest' },
      { Icon: MdAvTimer, text: 'Oldest' }
    ]
  };

  handleSort = (e, order) => {
    e.preventDefault();
    this.props.history.push(`?sortBy=${order}`);
  };

  render() {
    const currentSortOrder = new URLSearchParams(
      this.props.location.search
    ).get('sortBy');
    return (
      <div className={styles.ActionBar}>
        <nav className={styles.ActionBar__Filter}>
          <CategoryNav
            categories={[
              { name: 'all', path: 'all' },
              ...this.props.categories
            ]}
            currentPath={this.props.match.params.id}
          />
        </nav>
        <section className={styles.ActionBar__Sort}>
          <Sort
            options={this.state.sortOrders}
            onSort={this.handleSort}
            selected={currentSortOrder}
          />
        </section>
        <Button
          value="Post"
          Icon={AddIcon}
          onClick={() => {
            this.props.history.push('/posts/new');
          }}
          size="m"
          color="success"
        />
      </div>
    );
  }
}

export default withRouter(ActionBar);
