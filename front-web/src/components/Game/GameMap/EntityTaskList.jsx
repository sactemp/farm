import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Progress, PopupPanel } from '../../../lib/controls';
import { duration } from '../../../lib/datehelper';
import { sendCancelTask } from './serverActions';

import './Styles.scss';

const mapStateToProps = (state) => ({
  skillKindList: state.skillKindList,
  taskList: state.taskList,
  entityKindList: state.entityKindList,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

const EntityTaskList = (props) => {
  const { float, taskList, skillKindList, entityKindList, entity, dispatch } = props;
  const ek = entityKindList.items.get(entity.entity_kind_id);
  if (!entity || !ek) {
    return null;
  }
  const width = (entity.sx ? (entity.sx - entity.xx) : ek.sx),
    dx = (entity.sx ? 0 : width / 2);
  const height = (entity.sy ? (entity.sy - entity.yy) : ek.sy);

  const tasks = taskList.items
    .filter((t) => t.entity_id === entity.id).toList();

  return (tasks.size > 0 ? (
    <div
      className="taskList"
      style={{
        position: (float ? 'absolute' : ''),
        width: (float ? '240px' : '100%'),
        bottom: (float ? `${height}px` : ''),
        marginLeft: (float ? `${dx - 100}px` : 'auto'),
      }}
    >
      {tasks.map((task) => {
        const skill = skillKindList.items.get(task.skill_kind_id);
        // const currentProgress = new Date() - new Date(task.starttime);

        // console.log(22, task, currentProgress, task.duration);

        // const progress = (task.duration ? ` - ${Math.round((task.lefttime / task.duration) * 100)}%` : '');
        const progress = (task.duration ? ` - ${duration(task.duration - task.lefttime)}c` : '');
        return (
          <PopupPanel
            key={task.id}
            onClose={() => dispatch(sendCancelTask(task))}
            position={{ position: 'static' }}
            title={`${skill.title}${progress}`}
          >
            {(task.duration ? (
              <Progress
                max={task.duration}
                value={Math.min(task.lefttime, task.duration)}
              />
            ) : null)}
          </PopupPanel>
        );
      })}
    </div>
  ) : null);
};

EntityTaskList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  entityKindList: PropTypes.object.isRequired,
  float: PropTypes.bool.isRequired,
  skillKindList: PropTypes.object.isRequired,
  taskList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityTaskList);
