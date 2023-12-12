import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import getUserRoleList from '../../redux/selectors/userRole';
import { CheckBox } from '../../lib/controls';

const mapStateToProps = (state) => ({
  usersList: state.usersList,
  rolesList: state.rolesList,
  userRoleList: getUserRoleList(state),
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

class UserRoleList extends Component {
  componentDidMount() {
    const { dispatch, user } = this.props;

    dispatch(Actions.userRoleList.fetchList());
    if (user) {
      // Dispatch({ type: actionTypes.userRole.list.selectorParams.change, params: { USER_ID: user.ID } });
    }
  }

  render() {
    const { user, userRoleList, rolesList, dispatch } = this.props;

    if (!user) {
      return null;
    }

    const handleClick = (params, userRole) => {
      if (params.value === 1) {
        dispatch(Actions.userRole.createItem({
          item: {
            USER_ID: user.ID,
            ROLE_ID: parseInt(params.id, 10),
          },
        }));
      } else if (params.value === 0) {
        dispatch(Actions.userRole.deleteItem({ item: userRole }));
      }
      return null;
    };

    return (
      <div className="UserList">
        { rolesList.items.toList().map((item) => {
          const userRole = userRoleList.items.find((usr) => usr.ROLE_ID === item.ID);

          return (
            <div
              className="card"
              key={item.id}
            >
              <CheckBox
                label={item.TITLE}
                name={`${item.id}`}
                onChange={(params) => handleClick(params, userRole)}
                value={typeof userRole !== 'undefined' ? 1 : 0}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

UserRoleList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  rolesList: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userRoleList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRoleList);
