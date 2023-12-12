import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../../../redux/actions';
// import { isServer } from '../../../lib/utils';

import Entity from './Entity';
import GameMap from './GameMap';
import EntityTipItem from './EntityTipItem';
import EntityToolPanel from './EntityToolPanel';
// import EntityContentList from './EntityContentList';
import EntityDetailItem from './EntityDetailItem';

import './Styles.scss';

const mapStateToProps = (state) => ({
  auth: state.auth,
  mainview: state.mainview,
  entityList: state.entityList,
  entityKindList: state.entityKindList,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

const Map = (props) => {
  const { dispatch, mainview, entityList, entityKindList } = props;
  const { preview, dialog, selectedEntity, capturedObject } = mainview;

  useEffect(() => {
    dispatch(Actions.skillKindList.fetchList());
    dispatch(Actions.technologyProcessList.fetchList());
    dispatch(Actions.entitySkillList.fetchList());
    dispatch(Actions.entityKindList.fetchList());
    dispatch(Actions.entityTechnologyProcessList.fetchList());
    console.log('use effect');
  }, [dispatch]);

  // dispatch(Actions.entityList.fetchList());
  // dispatch(Actions.entityContentList.fetchList());
  // dispatch(Actions.taskList.fetchList());

  // const doAnimateTask = () => {
  //   const { taskList } = props;
  //   /*
  //    * dispatch(Actions.mainview.set({}));
  //    */
  //   // console.log('333', taskList.items.size);
  //   if (taskList.items.size > 0) {
  //     taskList.items
  //       .forEach((task) => {
  //         if (task.step) {
  //           const complete = dispatch(task.step({ task }));
  //           if (complete) {
  //             // console.log('GAME LOOP task completed', task);
  //             dispatch(Actions.taskList.deleteItem({ item: task }));
  //           }
  //         }
  //       });
  //   }
  //   requestAnimationFrame(() => {
  //     doAnimateTask();
  //   });
  // };

  // if (!isServer()) {
  //   requestAnimationFrame(() => {
  //     doAnimateTask();
  //   });
  // }

  // console.log(5555, capturedObject);

  const partition = (array, callback) => array.reduce((result, element, i) => {
    if (callback(element, i, array)) {
      result[0].push(element);
    } else { result[1].push(element); }

    return result;
  }, [[], []]);

  const [ground, others] = partition(entityList.items.toList(), (entity) => {
    const ec = entityKindList.items.get(entity.entity_kind_id) || {};
    return ec.entity_type_id === 1 || ec.entity_type_id === 2 || ec.entity_type_id === 3;
  });

  // {targetObject && selectedEntity && false && (<SelectSkillsDialog />)}
  return (
    <div
      id="canvas-root"
      className="FrontView"
      onContextMenu={(e) => {
        // console.log('index - onContextMenu event');
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <GameMap>
        { ground.map((entity) => (
          <Entity
            entity={entity}
            key={entity.id}
          />
        ))}
        { others.map((entity) => (
          <Entity
            entity={entity}
            key={entity.id}
          />
        ))}
        {preview && preview.entity && false && (<EntityTipItem />)}
        {capturedObject && (<Entity entity={capturedObject.entity} />)}
      </GameMap>
      <div className="infopanel">
        <div>
          {`Карта: ${mainview.camera.position.x} ${mainview.camera.position.y}`}
        </div>
        {selectedEntity && (<EntityDetailItem selectedEntity={selectedEntity} />)}
        {selectedEntity && (<EntityToolPanel selectedEntity={selectedEntity} />)}
      </div>
      {dialog && dialog.dialog}
    </div>
  );
};

Map.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entityList: PropTypes.object.isRequired,
  entityKindList: PropTypes.object.isRequired,
  mainview: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
