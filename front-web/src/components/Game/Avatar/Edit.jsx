import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { omitBy } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Avatar from '@material-ui/core/Avatar';
// import MenuItem from '@material-ui/core/MenuItem';

import { ComboBox, TextEdit, EditItem } from '../../../lib/controls';

// import { TextEdit } from '../../../lib/controls';
// import { isStringNotEmpty } from '../../../lib/validator';
// import Actions from '../../../redux/actions';

const mapStateToProps = ({ entityList, zoneList, entityKindList }) => ({ entityList, zoneList, entityKindList });
const mapDispatchToProps = (dispatch) => ({ dispatch });

const useStyles = makeStyles((theme) => ({ root: { flexGrow: 1, minWidth: '800px', padding: theme.spacing(1) } }));

const Edit = (props) => {
  const { entityList, dispatch, zoneList, entityKindList, route } = props,
    { itemToChange } = entityList,
    { data, validator } = itemToChange;
  // const entityKinds = entityKindList.items.toList().filter((item) => item.entity_type_id === 4);
  const classes = useStyles();
  const validateRules = {};
  const validateState = itemToChange.validateState || {};

  console.log(1111, data, zoneList.itemToChange);

  return (
    <EditItem
      className={classes.root}
      dispatch={dispatch}
      itemList={entityList}
      route={route}
      params={Edit.params}
      validateRules={validateRules}
    >
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <TextEdit
            data={data}
            id="title"
            label="Ник"
            onChange={validator.handleValueChangeEvent}
            placeholder="Введите ник"
            validateState={validateState}
          />
        </Grid>
        <Grid item xs={12}>
          <ComboBox
            data={data}
            fieldId="id"
            fieldValue="title"
            id="entity_kind_id"
            label="Вид"
            onChange={validator.handleValueChangeEvent}
            options={entityKindList.items.toList().toArray().filter((item) => (item.entity_type_id === 10))}
            placeholder="Выберите вид"
            validateState={validateState}
          />
        </Grid>
        <Grid item xs={12}>
          <ComboBox
            data={data}
            fieldId="id"
            fieldValue="title"
            id="zone_id"
            label="Локация"
            onChange={validator.handleValueChangeEvent}
            options={zoneList.items.toList().toArray()}
            placeholder="Выберите локация"
            validateState={validateState}
          />
        </Grid>
        {/* <TextField
        select
        label="Персонаж"
        variant="outlined"
        value={data.title}
        fullWidth
        onChange={handleValueChanged}
      >
        {entityKinds.map((ek) => (
          <MenuItem key={ek.id} value={ek.id} className={classes.root}>
            <Avatar src={`/public/assets/images/${ek.gicon}`} alt={ek.gicon} />
            {ek.title}
          </MenuItem>
        ))}
      </TextField> */}
        {/* <TextField
        select
        label="Локация"
        variant="outlined"
        value={data.title}
        className="organization--dialog-input"
        fullWidth
        onChange={handleValueChanged}
      >
        {startlocationList.items.toList().map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.zone_id}
            {item.x}
            {item.y}
          </MenuItem>
        ))}
      </TextField> */}
      </Grid>
    </EditItem>
  );
};

Edit.propTypes = {
  route: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  entityList: PropTypes.object.isRequired,
  entityKindList: PropTypes.object.isRequired,
  zoneList: PropTypes.object.isRequired,
};
Edit.defaultProps = { route: null };

Edit.params = { showMode: 'modal', pushHistory: 0 };

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
