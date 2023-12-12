import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../../../redux/actions';
import { selectSkillOrTechnologyProcess } from './gameObjectActions';
import TechnologyProcess from './TechnologyProcess';

import './Styles.scss';

const mapStateToProps = (state) => ({
  mainview: state.mainview,
  skillKindList: state.skillKindList,
  taskList: state.taskList,
  entityKindList: state.entityKindList,
  entitySkillList: state.entitySkillList,
  technologyProcessList: state.technologyProcessList,
  entityTechnologyProcessList: state.entityTechnologyProcessList,
  entityList: state.entityList,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

const ToolButtonPanel = (props) => {
  const { dispatch, mainview } = props;
  // const { requestMouseEvent } = mainview;
  const {
    selectedEntity, skillKindList,
    entitySkillList,
    entityTechnologyProcessList, technologyProcessList, taskList,
  } = props;
  const appliedTechnologyProcess = entityTechnologyProcessList.items.toList()
    .filter((etp) => etp.entity_kind_id === selectedEntity.entity_kind_id)
    .map((etp) => technologyProcessList.items.get(etp.technology_process_id));
    // .toArray();
  // const ek = entityKindList.items.get(selectedEntity.entity_kind_id) || {};
  const allowedEntitySkills = entitySkillList.items.toList()
    .filter((it) => it.entity_kind_id === selectedEntity.entity_kind_id)
    .filter((it) => it.usecase === 1 || it.usecase === 3)
    .map((itp) => skillKindList.items.get(itp.skill_kind_id));

  const executedTasks = taskList.items.toList().filter((task) => task.entity_id === selectedEntity.id);

  // console.log('ToolButtonPanel', appliedTechnologyProcess.toArray(), allowedEntitySkills.toArray());

  return (allowedEntitySkills.size > 0 && (
    <div className="toolpanel">
      { allowedEntitySkills.map((skillKind) => {
        // const skillKind = skillKindList.items.get(entitySkill.id);
        const task = executedTasks.filter((t) => t.skill_kind_id === skillKind.id).first();
        // const btnType = (entitySkill.allowedTechnologyProcesses.size > 0 ? 'group' : 'btn');
        const active = (task || (mainview.toolAction && mainview.toolAction.id === skillKind.id) ? ' active' : '');
        // console.log(444, executedTasks, task);

        // const handler = actionHandlers[item.skill_kind_id];
        return (
          <div
            className={`skillButton ${active}`}
            key={skillKind.id}
            onClick={() => {
              console.log(222, skillKind);
              dispatch(Actions.mainview.setToolAction(skillKind));
              dispatch(Actions.mainview.unsubscribeMouseEvent());
              dispatch(selectSkillOrTechnologyProcess({ entity: selectedEntity, skillKind }))
                .then(() => dispatch(Actions.mainview.setToolAction(null)))
                .catch((err) => {
                  console.log('canceled', err);
                  dispatch(Actions.mainview.setToolAction(null));
                });
            }}
          >
            <div>
              {skillKind.title}
            </div>
            {
              false && appliedTechnologyProcess
                .filter((tp) => tp.skill_kind_id === skillKind.id)
                // .filter((tp) => entityTechnologyProcessIds.indexOf(tp.id) > 0)
                .map((technologyProcess) => (
                  <TechnologyProcess
                    key={technologyProcess.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(selectSkillOrTechnologyProcess({
                        entity: selectedEntity,
                        skill_kind_id: skillKind.id,
                        technologyProcess,
                      }));
                      // dispatch(startTechnologyProcess({
                      //   entity: selectedEntity,
                      //   technologyProcess,
                      // }));
                    }}
                    technologyProcess={technologyProcess}
                  />
                ))
            }
          </div>
        );
      })}
    </div>
  )
  );
};
ToolButtonPanel.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // entityKindList: PropTypes.object.isRequired,
  entitySkillList: PropTypes.object.isRequired,
  mainview: PropTypes.object.isRequired,
  selectedEntity: PropTypes.object.isRequired,
  skillKindList: PropTypes.object.isRequired,
  entityTechnologyProcessList: PropTypes.object.isRequired,
  taskList: PropTypes.object.isRequired,
  technologyProcessList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolButtonPanel);
