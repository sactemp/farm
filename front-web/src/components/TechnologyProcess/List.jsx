import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { Button, TableView } from '../../lib/controls';
import Actions from '../../redux/actions';
import { duration } from '../../lib/datehelper';
import Edit from './Edit';

const mapStateToProps = ({
  technologyProcessList,
  skillKindList,
  entityKindList,
}) => ({ technologyProcessList, skillKindList, entityKindList });
const mapDispatchToProps = (dispatch) => ({ dispatch });

const List = (props) => {
  const { technologyProcessList, entityKindList, skillKindList, dispatch, route } = props;

  const headers = [
    { id: 'skill_kind_title', label: 'Умение', minWidth: 70 },
    { id: 'duration', label: 'Длительность', minWidth: 70 },
    { id: 'result1', label: 'Результат', minWidth: 70 },
    { id: 'spended', label: 'Затраты', minWidth: 70 },
  ];

  const tc = (title, count) => (title ? `${title} - ${count} шт` : undefined);

  const makeRow = (item) => {
    const skillKind = skillKindList.items.get(item.skill_kind_id);
    const pek1 = entityKindList.items.get(item.produced_gok1_id) || {};
    const sek1 = entityKindList.items.get(item.spended_gok1_id) || {};
    const sek2 = entityKindList.items.get(item.spended_gok2_id) || {};

    return {
      skill_kind_title: skillKind.title,
      duration: duration(item.duration),
      result1: tc(pek1.title, item.produced_gok1_count),
      spended: [tc(sek1.title, item.spended_gok1_count), tc(sek2.title, item.spended_gok2_count)].filter((i) => i).join(', '),
    };
  };

  const params = {
    item: { title: 'Новый процесс' },
    showMode: 'modal1',
    route,
  };

  return (
    <div>
      <Typography variant="h6" style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
        Список технологических процессов
      </Typography>
      <Button
        style={{ margin: '10px 0' }}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => dispatch(Actions.technologyProcessList.createStart(params))}
      >
        Новый процесс
      </Button>
      <TableView
        headers={headers}
        makeRow={makeRow}
        dispatch={dispatch}
        itemList={technologyProcessList}
        route={route}
        viewForEditItem={Edit}
      />
    </div>
  );
};

List.propTypes = {
  dispatch: PropTypes.func.isRequired,
  technologyProcessList: PropTypes.object.isRequired,
  skillKindList: PropTypes.object.isRequired,
  entityKindList: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
