import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RouteComponent, { makeUrl } from '../../lib/controls/RouteComponent';
import Actions from '../../redux/actions';
import List from './List';
import Edit from './Edit';

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({ dispatch });

class Index extends Component {
  static baseUrl(match) {
    return makeUrl(match, 'technologyProcess');
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(Actions.entityKindList.fetchList());
    dispatch(Actions.skillKindList.fetchList());
    dispatch(Actions.technologyProcessList.fetchList());
  }

  render() {
    const { match } = this.props;
    return (
      <RouteComponent match={match} List={List} Edit={Edit} />
    );
  }
}

Index.propTypes = { dispatch: PropTypes.func.isRequired, match: PropTypes.object.isRequired };

export default connect(mapStateToProps, mapDispatchToProps)(Index);
