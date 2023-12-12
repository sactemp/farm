import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isStringNotEmpty } from '../../lib/validator';
import { TextEdit, EditItem } from '../../lib/controls';
// import Actions from 'redux/actions';

const mapStateToProps = ({ rolesList }) => ({ rolesList });

const mapDispatchToProps = (dispatch) => ({ dispatch });

const Edit = (props) => {
  const { rolesList, dispatch, route, params } = props;
  const { itemToChange } = rolesList;
  const { data, validator } = itemToChange;
  const validateRules = { TITLE: { validate: (value) => (isStringNotEmpty(value) ? null : 'error') } };
  const validateState = itemToChange.validateState || {};

  return (
    <EditItem
      dispatch={dispatch}
      itemList={rolesList}
      params={params}
      route={route}
      validateRules={validateRules}
    >
      { data && (
        <div>
          <TextEdit
            data={data}
            id="TITLE"
            label="Наименование"
            onChange={validator.handleValueChangeEvent}
            placeholder="Введите наименование"
            validateState={validateState}
          />
        </div>
      )}
    </EditItem>
  );
};
Edit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  rolesList: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  params: PropTypes.object,
};
Edit.defaultProps = { params: {} };

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
