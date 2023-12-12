import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { Button, TableView } from '../../lib/controls';
import Actions from '../../redux/actions';
import Edit from './Edit';

const mapStateToProps = ({ zoneList }) => ({ zoneList });
const mapDispatchToProps = (dispatch) => ({ dispatch });

const List = (props) => {
  const { zoneList, dispatch, route } = props;

  const headers = [
    { id: 'title', label: 'Наименование', minWidth: 170 },
  ];

  const makeRow = ({ title }) => ({ title });

  return (
    <div>
      <Typography variant="h6" style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
        Список локаций
      </Typography>
      <Button
        style={{ margin: '10px 0' }}
        startIcon={<AddIcon />}
        onClick={() => dispatch(Actions.zoneList.createStart({ item: { title: 'Новая локация' }, pushHistory: Edit.params.pushHistory, route }))}
      >
        Новая локация
      </Button>
      <TableView
        headers={headers}
        makeRow={makeRow}
        dispatch={dispatch}
        itemList={zoneList}
        route={route}
        ViewForEditItem={Edit}
      />
    </div>
  );
};

List.propTypes = {
  zoneList: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
