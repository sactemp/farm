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
  static baseUrl(url) {
    return makeUrl(url, 'entityKinds');
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(Actions.skillKindList.fetchList());
    dispatch(Actions.entitySkillList.fetchList());
    dispatch(Actions.entityTypeList.fetchList());
    dispatch(Actions.entityKindList.fetchList());
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
