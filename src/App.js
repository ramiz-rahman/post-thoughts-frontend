import React, { Component } from 'react';
import styles from './App.module.css';

// Redux connection
import { connect } from 'react-redux';
import * as actionCreators from './actions';

// Routes
import { Route, Switch, Redirect, Link } from 'react-router-dom';

// Pages
import Category from './containers/CategoryView/CategoryView';
import PostFormContainer from './containers/PostFormContainer/PostFormContainer';
import PostDetail from './containers/PostDetail/PostDetail';

import NotificationBanner from './containers/NotificationBanner/NotificationBanner';
import Footer from './components/Footer/Footer';

const imgUrl =
  'https://images.unsplash.com/photo-1568515477935-c5bab4867b99?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjk1NjgwfQ';

class App extends Component {
  componentDidMount() {
    this.props.getAllCategories();
    this.props.getAllPosts();
  }
  render() {
    return (
      <div
        className={styles.App}
        style={{
          backgroundImage: `linear-gradient(var(--red), var(--teal)), url(${imgUrl})`
        }}
      >
        <NotificationBanner />
        <header className={styles.App__Header}>
          <h1>
            <Link to="/">PostThoughts</Link>
          </h1>
        </header>
        <Switch>
          <Route
            exact
            path="/posts/new"
            component={PostFormContainer}
          />
          <Route
            exact
            path="/posts/edit/:id"
            component={PostFormContainer}
          />
          <Route exact path="/posts/:id" component={PostDetail} />
          <Route path="/category/:id" component={Category} />
          <Route
            path="/"
            render={(routeProps) => <Redirect to="/category/all" />}
          />
        </Switch>
        <footer className={styles.App__Footer}>
          <Footer />
        </footer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAllCategories: () => dispatch(actionCreators.getCategories()),
  getAllPosts: () => dispatch(actionCreators.getAllPosts())
});

export default connect(null, mapDispatchToProps)(App);
