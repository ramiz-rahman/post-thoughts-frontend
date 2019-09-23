import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './App.module.css';
import Category from './containers/Category/Category';
import CreatePost from './containers/CreatePost/CreatePost';
import PostDetail from './containers/PostDetail/PostDetail';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles.Header}>
          <h1>Readable</h1>
        </header>
        <Switch>
          <Route exact path="/posts/new" component={CreatePost} />
          <Route exact path="/posts/edit/:id" component={CreatePost} />
          <Route exact path="/posts/:id" component={PostDetail} />
          <Route path="/category/:id" component={Category} />
          <Route
            path="/"
            render={(routeProps) => <Redirect to="/category/all" />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
