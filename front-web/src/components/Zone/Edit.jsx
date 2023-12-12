import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isStringNotEmpty } from '../../lib/validator';
import { TextEdit, EditItem } from '../../lib/controls';

const mapStateToProps = ({ zoneList }) => ({ zoneList });

const mapDispatchToProps = (dispatch) => ({ dispatch });

const Edit = (props) => {
  const { zoneList, dispatch, route } = props;
  const { itemToChange } = zoneList;
  const { data, validator } = itemToChange;
  const validateRules = { title: { validate: (value) => (isStringNotEmpty(value) ? null : 'error') } };

  const validateState = itemToChange.validateState || {};

  return (
    <EditItem
      dispatch={dispatch}
      itemList={zoneList}
      params={Edit.params}
      route={route}
      validateRules={validateRules}
    >
      <TextEdit
        data={data}
        id="title"
        label="Наименование"
        onChange={validator.handleValueChangeEvent}
        placeholder="Введите наименование"
        validateState={validateState}
      />
    </EditItem>
  );
};

Edit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  zoneList: PropTypes.object.isRequired,
};
Edit.params = { showMode: 'modal', pushHistory: 1 };

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
