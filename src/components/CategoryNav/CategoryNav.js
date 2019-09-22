import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './CategoryNav.module.css';

function CategoryNav({ categories = {}, currentCategory }) {
  const createCategoryItem = (category) => {
    let itemStyle = `${styles.CategoryNav__Item}`;
    if (category.path === currentCategory.path)
      itemStyle = itemStyle.concat(
        ` ${styles.CategoryNav__Item_active}`
      );
    return (
      <Link
        key={category.path}
        className={itemStyle}
        to={`category/${category.path}`}
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
  currentCategory: PropTypes.object.isRequired
};

export default CategoryNav;
