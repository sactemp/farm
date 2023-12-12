import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isStringNotEmpty } from '../../lib/validator';
import { TextEdit, EditItem } from '../../lib/controls';

const mapStateToProps = ({ skillKindList }) => ({ skillKindList });
const mapDispatchToProps = (dispatch) => ({ dispatch });

const SkillKindEdit = (props) => {
  const { skillKindList, dispatch, route } = props;
  const { itemToChange } = skillKindList;
  const { data, validator } = itemToChange;
  const defaultItem = { title: 'Новое умение' };
  const validateRules = { title: { validate: (value) => (isStringNotEmpty(value) ? null : 'error') } };
  const validateState = itemToChange.validateState || {};

  return (
    <EditItem
      defaultItem={defaultItem}
      dispatch={dispatch}
      itemList={skillKindList}
      route={route}
      validateRules={validateRules}
    >
      { data && (
        <TextEdit
          data={data}
          id="title"
          label="Наименование"
          onChange={validator.handleValueChangeEvent}
          placeholder="Введите наименование"
          validateState={validateState}
        />
      )}
    </EditItem>
  );
};
SkillKindEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  skillKindList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillKindEdit);
