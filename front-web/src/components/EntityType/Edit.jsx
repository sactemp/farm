import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isStringNotEmpty } from '../../lib/validator';
import { TextEdit, EditItem } from '../../lib/controls';

const mapStateToProps = (state) => ({ unittypeList: state.unittypeList });

const mapDispatchToProps = (dispatch) => ({ dispatch });

class RoleEdit extends Component {
  constructor(props) {
    super(props);

    this.defaultItem = { TITLE: 'Новая роль' };
    this.validateRules = { TITLE: { validate: (value) => (isStringNotEmpty(value) ? null : 'error') } };
  }

  render() {
    const { unittypeList, dispatch, route } = this.props;
    const { itemToChange } = unittypeList;
    const { data, validator } = itemToChange;

    const validateState = itemToChange.validateState || {};

    return (
      <EditItem
        defaultItem={this.defaultItem}
        dispatch={dispatch}
        itemList={unittypeList}
        route={route}
        validateRules={this.validateRules}
      >
        { data && (
          <TextEdit
            data={data}
            label="Наименование"
            name="TITLE"
            onChange={validator.handleValueChangeEvent}
            placeholder="Введите наименование"
            validateState={validateState}
          />
        )}
      </EditItem>
    );
  }
}

RoleEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  unittypeList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleEdit);
