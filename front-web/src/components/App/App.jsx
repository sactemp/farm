import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Import Immutable from 'immutable';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { Redirect, Switch, Route, withRouter } from 'react-router-dom';
import div from '@material-ui/core/Container';
// Import ProductListMenu from 'components/Product/ProductListMenu';
import Actions from '../../redux/actions';
// Import RightColumn from './RightColumn';
import Admin from '../Admin/Admin';
import Game from '../Game';
// Import AccessList from 'components/AccessList';
import Error404 from './Error404';
import Error500 from './Error500';
import ErrorBoundary from './ErrorBoundary';
import Profile from './Profile';
import Home from './Home';
import Header from './Header';
import Errors from './Errors';
import './Styles.scss';
/*
 * Import logo from './helplogo.jpg';
 * import Background from './farm1111.jpg';
 */

const mapStateToProps = ({ auth, errors, websocket }) => ({ auth, errors, websocket });
const mapDispatchToProps = (dispatch) => ({ dispatch });

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    // dispatch(Actions.usersList.fetchList());
    dispatch(Actions.userroleList.fetchList());
    // dispatch(Actions.rolesList.fetchList());
    // dispatch(Actions.entityKindList.fetchList());
  }

  render() {
    const { auth, match, errors } = this.props;

    return (
      <div
        className="App"
      >
        <Header />
        <Errors errors={errors} />
        <ErrorBoundary>
          <Switch>
            <Route
              exact
              path="/"
              render={(params) => {
                if (!auth.user) {
                  return (<Home {...params} />);
                }
                return (
                  <Redirect to={{
                    pathname: '/game',
                    state: { from: match.location },
                  }}
                  />
                );
              }}
            />
            <Route
              exact
              path="/game"
              render={(params) => {
                if (!auth.user) {
                  return (
                    <Redirect to={{
                      pathname: '/',
                      state: { from: match.location },
                    }}
                    />
                  );
                }
                return <Game {...params} />;
              }}
            />
            <Route
              path="/admin"
              render={(params) => {
                if (!auth.user) {
                  return (
                    <Redirect to={{
                      pathname: '/',
                      state: { from: match.location },
                    }}
                    />
                  );
                }
                return (<Admin {...params} />);
              }}
            />
            <Route
              component={Profile}
              path="/profile"
            />
            <Route
              component={Error500}
              path="/error500"
            />
            <Route component={Error404} />
          </Switch>
        </ErrorBoundary>
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  websocket: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default hot(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));
