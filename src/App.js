import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import Category from './containers/Category/Category';
import PostForm from './components/PostForm/PostForm';
import PostDetail from './components/PostDetail/PostDetail';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles.Header}>
          <h1>Readable</h1>
        </header>
        <Switch>
          <Route exact path="/posts/create" component={PostForm} />
          <Route
            exact
            path="/posts/5"
            render={() => (
              <PostDetail
                post={this.state.posts ? this.state.posts[0] : null}
              />
            )}
          />
          <Route path="/category/:id" component={Category} />
          <Route exact path="/" component={Category} />
        </Switch>
      </div>
    );
  }
}

export default App;
