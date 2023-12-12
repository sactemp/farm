import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GameMap from './GameMap';
import Avatar from './Avatar';
import Actions from '../../redux/actions';

const mapStateToProps = ({ mainview, auth }) => ({ mainview, auth });
const mapDispatchToProps = (dispatch) => ({ dispatch });

class Index extends Component {

  componentDidMount() {
    const { auth, dispatch } = this.props;
    dispatch(Actions.entityKindList.fetchList());
    dispatch(Actions.zoneList.fetchList());
    dispatch(Actions.entityList.fetchList({ where: { user_id: auth.user.id } }));
  }

  render() {
    const { mainview } = this.props;

    return (mainview.gameMode > 0 ? (
      <GameMap />
    ) : (
      <Avatar />
    )
    );
  }
}
Index.propTypes = {
  mainview: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
