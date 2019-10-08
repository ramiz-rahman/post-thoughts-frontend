import React from 'react';
import PropTypes from 'prop-types';
import styles from './CategoryNav.module.css';

import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

function CategoryNav({ categories = {}, currentPath, location }) {
  const createCategoryItem = (category) => {
    let itemStyle = `${styles.CategoryNav__Item}`;
    if (category.path === currentPath)
      itemStyle = itemStyle.concat(
        ` ${styles.CategoryNav__Item_active}`
      );
    return (
      <Link
        key={category.path}
        className={itemStyle}
        to={{
          pathname: `/category/${category.path}`,
          search: location.search
        }}
      >
        {category.name}
      </Link>
    );
  };

  return (
    <div className={styles.CategoryNav}>
      <ul className={styles.CategoryNav__List}>
        {categories.map((category) => createCategoryItem(category))}
      </ul>
    </div>
  );
}

CategoryNav.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPath: PropTypes.string.isRequired
};

export default withRouter(CategoryNav);
