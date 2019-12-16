import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './PostForm.module.css';

// Sub components
import Selector from '../UI/Selector/Selector';
import Button from '../UI/Button/Button';

class PostForm extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    editing: PropTypes.bool,
    post: PropTypes.object,
    onEdit: PropTypes.func,
    onCreate: PropTypes.func
  };

  state = {
    category: '',
    author: '',
    title: '',
    body: '',
    categories: [],
    editing: false,
    errors: new Set()
  };

  componentDidMount() {
    this.setState({
      categories: this.props.categories
    });

    if (this.props.post && this.props.editing)
      this.setState({
        category: this.props.post.category,
        author: this.props.post.author,
        title: this.props.post.title,
        body: this.props.post.body,
        editing: true
      });
  }

  componentDidUpdate() {
    const { categories, editing, post } = this.props;
    if (
      !(
        categories.length === this.state.categories.length &&
        categories.every(
          (category, index) => category === this.state.categories[index]
        )
      )
    )
      this.setState({ categories: this.props.categories });

    if (!this.state.editing && editing && post) {
      this.setState({
        category: post.category,
        author: post.author,
        title: post.title,
        body: post.body,
        editing: true
      });
    }
  }

  handleChange = (e, attr, value) => {
    e.preventDefault();
    const val = value ? value : e.target.value;
    this.setState(() => ({ [attr]: val }));
  };

  handleCategoryChange = (e, value) => {
    this.handleChange(e, 'category', value);
  };

  handleAuthorChange = (e) => {
    this.handleChange(e, 'author');
  };

  handleTitleChange = (e) => {
    this.handleChange(e, 'title');
  };

  handleBodyChange = (e) => {
    this.handleChange(e, 'body');
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.category.length === 0) {
      this.setState((prevState) => ({
        errors: new Set([...prevState.errors, 'category not selected!'])
      }));
    } else {
      const { onEdit, onCreate } = this.props;
      const post = {
        category: this.state.category,
        author: this.state.author,
        title: this.state.title,
        body: this.state.body
      };

      if (this.state.editing) {
        onEdit(post);
      } else {
        onCreate(post);
      }
    }
  };

  render() {
    return (
      <form className={styles.PostForm} onSubmit={this.handleSubmit}>
        <CategorySelector
          categories={this.state.categories}
          selected={this.state.category}
          onSelect={this.handleCategoryChange}
          errors={this.state.errors}
        />
        <TextInputField
          name="Author"
          placeholder="What's your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
          disabled={this.state.editing}
        />
        <TextInputField
          name="Title"
          placeholder="What's your topic"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <PostBodyField
          name="Body"
          placeholder="What's your content?"
          value={this.state.body}
          onChange={this.handleBodyChange}
        />
        <SubmitButton
          editStatus={this.state.editing}
          onSubmit={this.handleSubmit}
        />
      </form>
    );
  }
}

// Category Selector
function CategorySelector({ categories, selected, onSelect, errors }) {
  let displayErrClass = errors.has('category not selected!')
    ? null
    : styles.PostForm__ErrorMsg_hidden;
  return (
    <label className={styles.PostForm__Field}>
      <span className={styles.PostForm__Label}>Category</span>
      <div className={styles.PostForm__CategorySelector}>
        <Selector
          options={categories}
          selected={selected}
          placeholder="Select a category"
          onSelect={onSelect}
        />
      </div>
      <span
        className={`${styles.PostForm__ErrorMsg} ${displayErrClass}`}
      >
        &#9888; Please select a category
      </span>
    </label>
  );
}
CategorySelector.propTypes = {
  categories: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  errors: PropTypes.object
};

// Text Input Field
function TextInputField({
  name,
  placeholder,
  value,
  onChange,
  disabled
}) {
  return (
    <label className={styles.PostForm__Field}>
      <span className={styles.PostForm__Label}>{name}</span>
      <input
        className={styles.PostForm__Input}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
      />
    </label>
  );
}
TextInputField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

// Post Body field
function PostBodyField({ name, placeholder, value, onChange }) {
  return (
    <label className={styles.PostForm__Field}>
      <span className={styles.PostForm__Label}>{name}</span>
      <textarea
        className={styles.PostForm__Body}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
PostBodyField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

// Submit Button
function SubmitButton({ editStatus }) {
  const text = editStatus ? 'Edit' : 'Create';
  return (
    <div className={styles.PostForm__Footer}>
      <Button
        value={text}
        size="block"
        color="success"
        onClick={() => null}
      />
    </div>
  );
}

SubmitButton.propTypes = {
  editStatus: PropTypes.bool.isRequired
};

export default PostForm;
