import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { Button, TableView } from '../../lib/controls';
import Actions from '../../redux/actions';
import Edit from './Edit';

const mapStateToProps = ({ skillKindList }) => ({ skillKindList });
const mapDispatchToProps = (dispatch) => ({ dispatch });

const List = (props) => {
  const { skillKindList, dispatch, route } = props;

  const makeRow = (item) => ({ title: `${item.id} - ${item.title}` });

  const headers = [
    { id: 'title', label: 'Наименование', minWidth: 170 },
  ];

  const params = {
    item: { TITLE: 'Новое умение' },
    showMode: 'modal1',
    route,
  };

  return (
    <div>
      <Typography variant="h6" style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
        Список умений
      </Typography>
      <Button
        style={{ margin: '10px 0' }}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => dispatch(Actions.skillKindList.createStart(params))}
      >
        Новое умение
      </Button>
      <TableView
        headers={headers}
        makeRow={makeRow}
        dispatch={dispatch}
        itemList={skillKindList}
        route={route}
        viewForEditItem={Edit}
      />
    </div>
  );
};

List.propTypes = {
  dispatch: PropTypes.func.isRequired,
  skillKindList: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
