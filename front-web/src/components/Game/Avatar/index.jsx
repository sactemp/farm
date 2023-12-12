import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../../../redux/actions';
// import List from './List';
import List from './List';
// import Edit from './Edit';

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({ dispatch });

class Index extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(Actions.skillKindList.fetchList());
    dispatch(Actions.entitySkillList.fetchList());
    dispatch(Actions.entityTypeList.fetchList());
    dispatch(Actions.entityKindList.fetchList());
  }

  render() {
    return (
      <List />
    );
  }
}

Index.propTypes = { dispatch: PropTypes.func.isRequired };

export default connect(mapStateToProps, mapDispatchToProps)(Index);
