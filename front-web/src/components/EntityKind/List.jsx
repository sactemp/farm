import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import { Button, TableView } from '../../lib/controls';
import Actions from '../../redux/actions';
import Edit from './Edit';

const mapStateToProps = ({
  skillKindList,
  entitySkillList,
  entityTypeList,
  entityKindList,
}) => ({
  skillKindList,
  entitySkillList,
  entityTypeList,
  entityKindList,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

const List = (props) => {
  const { skillKindList, entitySkillList, entityTypeList, entityKindList, dispatch, route } = props;

  const headers = [
    { id: 'type', label: 'Тип', minWidth: 10 },
    { id: 'icon', label: 'Иконка', minWidth: 40 },
    { id: 'title', label: 'Наименование', minWidth: 40 },
    { id: 'allowedSkills', label: 'Умения может совершать', minWidth: 50 },
    { id: 'appliedSkills', label: 'Умения можно применить', minWidth: 50 },
    { id: 'sxsy', label: 'Размеры', minWidth: 50 },
  ];

  const makeRow = (item) => {
    const entityType = entityTypeList.items.get(item.entity_type_id) || {};
    const skillList = entitySkillList.items.toList().toArray().filter((enSkill) => enSkill.entity_kind_id === item.id);

    return {
      title: `${item.id} : ${item.title}`,
      type: entityType.title,
      sxsy: `${item.sx || 'нет'}X${item.sy || 'нет'}`,
      allowedSkills: skillList.filter((sk) => sk.usecase === 1 || sk.usecase === 3).map((sk) => {
        const sk2 = skillKindList.items.get(sk.skill_kind_id);
        return `${sk2.id}:${sk2.title}`;
      }).join(', '),
      appliedSkills: skillList.filter((sk) => sk.usecase === 2 || sk.usecase === 3).map((sk) => {
        const sk2 = skillKindList.items.get(sk.skill_kind_id);
        return `${sk2.id}:${sk2.title}`;
      }).join(', '),
      icon: (
        <Avatar src={`/assets/images/${item.gicon}`} alt={item.gicon} />
      ),
    };
  };

  return (
    <div>
      <Typography variant="h6" style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
        Список видов игровых объектов
      </Typography>
      <Button
        style={{ margin: '10px 0' }}
        startIcon={<AddIcon />}
        onClick={() => dispatch(Actions.entityKindList.createStart({ item: { title: 'Новый вид' }, pushHistory: Edit.params.pushHistory, route }))}
      >
        Новый вид
      </Button>
      <TableView
        headers={headers}
        makeRow={makeRow}
        dispatch={dispatch}
        itemList={entityKindList}
        route={route}
        ViewForEditItem={Edit}
      />
    </div>
  );
};

List.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entityKindList: PropTypes.object.isRequired,
  skillKindList: PropTypes.object.isRequired,
  entitySkillList: PropTypes.object.isRequired,
  entityTypeList: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
