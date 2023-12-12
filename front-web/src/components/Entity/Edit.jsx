import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isStringNotEmpty } from '../../lib/validator';
import { ComboBox, TextEdit, EditItem } from '../../lib/controls';
// import Actions from 'redux/actions';

const mapStateToProps = ({ entityKindList, entityTypeList }) => ({
  entityKindList,
  entityTypeList,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

const EntityKindEdit = (props) => {
  const { entityKindList, entityTypeList, dispatch, route } = props;
  const { itemToChange } = entityKindList;
  const { data, validator } = itemToChange;
  const defaultItem = { title: 'Новый тип' };
  const validateRules = { title: { validate: (value) => (isStringNotEmpty(value) ? null : 'error') } };
  const validateState = itemToChange.validateState || {};

  return (
    <EditItem
      defaultItem={defaultItem}
      dispatch={dispatch}
      itemList={entityKindList}
      params={{ showMode: 'modal' }}
      route={route}
      validateRules={validateRules}
    >
      { data && (
        <div>
          <div xs="auto">
            <img
              alt={data.title}
              height={256}
              src={`/images/${data.gicon}`}
              width={256}
            />
          </div>
          <div>
            <TextEdit
              data={data}
              id="title"
              label="Наименование"
              onChange={validator.handleValueChangeEvent}
              placeholder="Введите наименование"
              validateState={validateState}
            />
            <ComboBox
              data={data}
              fieldId="id"
              fieldValue="title"
              id="entity_type_id"
              label="Тип"
              onChange={validator.handleValueChangeEvent}
              options={entityTypeList.items.toList().toArray()}
              placeholder="Выберите тип"
              validateState={validateState}
            />
            <TextEdit
              data={data}
              id="sx"
              label="Размер Х"
              onChange={validator.handleValueChangeEvent}
              placeholder="Введите размер Х"
              validateState={validateState}
            />
            <TextEdit
              data={data}
              id="sy"
              label="Размер Y"
              onChange={validator.handleValueChangeEvent}
              placeholder="Введите размер Y"
              validateState={validateState}
            />
            <TextEdit
              data={data}
              id="gcolor"
              label="Цвет"
              onChange={validator.handleValueChangeEvent}
              placeholder="Введите цвет"
              validateState={validateState}
            />
            <TextEdit
              data={data}
              id="gicon"
              label="Иконка"
              onChange={validator.handleValueChangeEvent}
              placeholder="Введите иконку"
              validateState={validateState}
            />
          </div>
        </div>
      )}
    </EditItem>
  );
};
EntityKindEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entityKindList: PropTypes.object.isRequired,
  entityTypeList: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityKindEdit);
