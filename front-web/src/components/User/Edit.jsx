import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import { Form } from 'reactstrap';
import { TextEdit, EditItem } from '../../lib/controls';
import Actions from '../../redux/actions';
import { isStringNotEmpty } from '../../lib/validator';

import UserRoleList from './UserRoleList';

const mapStateToProps = (state) => ({ usersList: state.usersList });

const mapDispatchToProps = (dispatch) => ({ dispatch });

class UserEdit extends Component {
  constructor(props) {
    super(props);

    this.defaultItem = {
      FIO: '',
      POST: '',
      PHONE: '',
      EMAIL: '',
      LOGIN: '',
      PASSWORD: '',
    };

    this.validateRules = {
      FIO: { validate: (value) => (isStringNotEmpty(value) ? null : 'error') },
      POST: { validate: (value) => (isStringNotEmpty(value) ? null : 'error') },
      PHONE: { validate: (value) => (isStringNotEmpty(value) ? null : 'warning') },
      EMAIL: { validate: (value) => (isStringNotEmpty(value) ? null : 'warning') },
      LOGIN: { validate: (value) => (isStringNotEmpty(value) ? null : 'warning') },
      PASSWORD: { validate: (value) => (isStringNotEmpty(value) ? null : 'warning') },
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(Actions.usersList.fetchList());
  }

  render() {
    const { usersList, dispatch, route } = this.props;
    const { itemToChange } = usersList;
    const { data, validator } = itemToChange;

    const validateState = itemToChange.validateState || {};
    // Const organization = this.props.organizationList.items.get(data.ORGANIZATION_ID);

    return (
      <EditItem
        defaultItem={this.defaultItem}
        dispatch={dispatch}
        itemList={usersList}
        route={route}
        validateRules={this.validateRules}
      >
        {data && (
          <div>
            <TextEdit
              data={data}
              label="Фамилия, Имя, Отчество"
              name="FIO"
              onChange={validator.handleValueChangeEvent}
              placeholder="Введите ФИО"
              validateState={validateState}
            />
            <TextEdit
              data={data}
              label="Телефон"
              name="PHONE"
              onChange={validator.handleValueChangeEvent}
              placeholder="Введите номер телефона"
              validateState={validateState}
            />
            <TextEdit
              data={data}
              label="Эл.почта"
              name="EMAIL"
              onChange={validator.handleValueChangeEvent}
              placeholder="Введите адрес эл.почты"
              validateState={validateState}
            />
            <TextEdit
              data={data}
              label="Логин"
              name="LOGIN"
              onChange={validator.handleValueChangeEvent}
              placeholder="Введите логин"
              validateState={validateState}
            />
            <TextEdit
              data={data}
              label="Пароль"
              name="PASSWORD"
              onChange={validator.handleValueChangeEvent}
              placeholder="Введите пароль"
              type="password"
              validateState={validateState}
            />
            <UserRoleList
              route={route}
              user={data}
            />
          </div>
        )}
      </EditItem>
    );
  }
}

UserEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  usersList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
