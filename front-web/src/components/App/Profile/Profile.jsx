import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../../../redux/actions';
import Logined from './Logined';
import NotLogined from './NotLogined';

// import './Profile.scss';

const mapStateToProps = (state) => ({
  auth: state.auth,
  rolesList: state.rolesList,
  userroleList: state.userroleList,
  organizationList: state.organizationList,
});

const mapDispatchToProps = (dispatch) => ({
  doLogin: (loginCredentials) => dispatch(Actions.auth.postlogin({ loginCredentials })),
  handleLogout: () => {
    dispatch(Actions.mainview.requestOfflineGameMode());
    dispatch(Actions.websocket.close());
    dispatch(Actions.auth.postlogout());
  },
});

const Profile = (props) => {
  const { auth, doLogin, organizationList, handleLogout } = props;

  //  console.log(111111, auth.user);

  if (auth.user) {
    return (
      <Logined
        user={auth.user}
        userroleList={props.userroleList}
        organizationList={organizationList}
        rolesList={props.rolesList}
        onLogout={handleLogout}
      />
    );
  }
  return (
    <>
      <NotLogined handleLogin={doLogin} />
    </>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  doLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  organizationList: PropTypes.object,
  rolesList: PropTypes.object.isRequired,
  userroleList: PropTypes.object.isRequired,
};

Profile.defaultProps = { organizationList: null };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
