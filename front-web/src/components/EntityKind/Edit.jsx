import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { isStringNotEmpty } from '../../lib/validator';
import { ComboBox, TextEdit, EditItem } from '../../lib/controls';

const mapStateToProps = ({ entityTypeList, entityKindList }) => ({ entityTypeList, entityKindList });

const mapDispatchToProps = (dispatch) => ({ dispatch });

const Edit = (props) => {
  const { entityKindList, entityTypeList, dispatch, route } = props;
  const { itemToChange } = entityKindList;
  const { data, validator } = itemToChange;
  const validateRules = { title: { validate: (value) => (isStringNotEmpty(value) ? null : 'error') } };

  const validateState = itemToChange.validateState || {};

  return (
    <EditItem
      dispatch={dispatch}
      itemList={entityKindList}
      route={route}
      params={Edit.params}
      validateRules={validateRules}
    >
      {data && (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextEdit
              data={data}
              id="gicon"
              label="Иконка"
              onChange={validator.handleValueChangeEvent}
              placeholder="Введите иконка"
              validateState={validateState}
            />
            <Avatar src={`/assets/images/${data.gicon}`} alt={data.gicon} />
          </div>
          <TextEdit
            data={data}
            id="title"
            label="Наименование"
            onChange={validator.handleValueChangeEvent}
            placeholder="Введите наименование"
            validateState={validateState}
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextEdit
                data={data}
                id="sx"
                label="Размер Х"
                onChange={validator.handleValueChangeEvent}
                placeholder="Введите размер Х"
                validateState={validateState}
              />
            </Grid>
            <Grid item xs={6}>
              <TextEdit
                data={data}
                id="sy"
                label="Размер Y"
                onChange={validator.handleValueChangeEvent}
                placeholder="Введите размер Y"
                validateState={validateState}
              />
            </Grid>
          </Grid>
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
        </>
      )}
    </EditItem>
  );
};

Edit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  entityKindList: PropTypes.object.isRequired,
  entityTypeList: PropTypes.object.isRequired,
};
Edit.defaultProps = { };
Edit.params = { showMode: 'modal', pushHistory: 1 };

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
