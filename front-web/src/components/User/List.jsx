import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ListView } from '../../lib/controls';
// Import actionTypes from 'redux/actions';
import Actions from '../../redux/actions';
import Edit from './Edit';
// Import { resetErrorMessage } from '../../redux/actions/errors';

const mapStateToProps = ({ usersList }) => ({ usersList });
const mapDispatchToProps = (dispatch) => ({ dispatch });

class UserList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(Actions.usersList.fetchList());
    dispatch(Actions.userroleList.fetchList());
  }

  render() {
    const { usersList, dispatch, route } = this.props;
    const Item = ({ item }) => (
      <div>
        <div>
          <strong>
            Логин:
          </strong>
          { (item.login || 'не задано') }
        </div>
        <div className="field">
          {' '}
          <strong>
            ФИО:
          </strong>
          { item.surname }
          {' '}
          { item.name }
          {' '}
          { item.patronymic }
        </div>
        <div className="field">
          <strong>
            Телефон:
          </strong>
          { (item.PHONE || 'не задано') }
        </div>
        <div className="field">
          <strong>
            Эл.почта:
          </strong>
          { (item.EMAIL || 'не задано') }
        </div>
      </div>
    );

    return (
      <div className="UserList">
        <Button>
          Новый пользователь
        </Button>
        <ListView
          dispatch={dispatch}
          itemList={usersList}
          route={route}
          viewForEditItem={Edit}
        >
          <Item />
        </ListView>
      </div>
    );
  }
}

UserList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  usersList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
