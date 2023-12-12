import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { Button, TableView } from '../../lib/controls';
import Actions from '../../redux/actions';
import Edit from './Edit';

const mapStateToProps = ({ rolesList }) => ({ rolesList });
const mapDispatchToProps = (dispatch) => ({ dispatch });

const List = (props) => {
  const { rolesList, dispatch, route } = props;

  const makeRow = ({ title }) => ({ title });

  const headers = [
    { id: 'title', label: 'Наименование', minWidth: 170 },
  ];

  const params = {
    item: { title: 'Новая роль' },
    showMode: 'modal',
    route,
  };

  return (
    <div>
      <Typography variant="h6" style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
        Список ролей
      </Typography>
      <Button
        style={{ margin: '10px 0' }}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => dispatch(Actions.rolesList.createStart(params))}
      >
        Новая роль
      </Button>
      <TableView
        headers={headers}
        makeRow={makeRow}
        dispatch={dispatch}
        itemList={rolesList}
        route={route}
        viewForEditItem={Edit}
      />
    </div>
  );
};

List.propTypes = {
  dispatch: PropTypes.func.isRequired,
  rolesList: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
