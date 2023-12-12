import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import List from './List';
import Edit from './Edit';

const Component = ({ match, baseUrl }) => (
  <Switch>
    <Route
      exact
      path={match.url}
      render={(params) => (
        <List route={{
          baseUrl,
          action: 'list',
          ...params,
        }}
        />
      )}
    />
    <Route
      path={`${match.url}/create`}
      render={(params) => (
        <Edit route={{
          action: 'create',
          ...params,
        }}
        />
      )}
    />
    <Route
      path={`${match.url}/edit/:itemId`}
      render={(params) => (
        <Edit route={{
          action: 'edit',
          ...params,
        }}
        />
      )}
    />
  </Switch>
);

Component.propTypes = {
  baseUrl: PropTypes.string,
  match: PropTypes.object.isRequired,
};
Component.defaultProps = { baseUrl: '/' };

export default Component;
