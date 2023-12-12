import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import Entity from '../Game/GameMap/Entity';
import GameMap from '../Game/GameMap/GameMap';
import EntityTipItem from '../Game/GameMap/EntityTipItem';
import EntityToolPanel from '../Game/GameMap/EntityToolPanel';
import SelectSkillsDialog from '../Game/GameMap/SelectSkillsDialog';
import EntityContentList from '../Game/GameMap/EntityContentList';
import EntityDetailItem from '../Game/GameMap/EntityDetailItem';

import '../Game/GameMap/Styles.scss';

const mapStateToProps = (state) => ({
  taskList: state.taskList,
  mainview: state.mainview,
  entityList: state.entityList,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

class Map extends Component {
  constructor(props) {
    super(props);
    this.doAnimateTask = this.doAnimateTask.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(Actions.skillKindList.fetchList());
    dispatch(Actions.technologyProcessList.fetchList());
    dispatch(Actions.entitySkillList.fetchList());
    dispatch(Actions.entityKindList.fetchList());
    dispatch(Actions.entityList.fetchList());
    dispatch(Actions.entityContentList.fetchList());
    dispatch(Actions.taskList.fetchList());
    requestAnimationFrame(() => {
      this.doAnimateTask();
    });
  }

  doAnimateTask() {
    const { taskList, dispatch } = this.props;
    /*
     * dispatch(Actions.mainview.set({}));
     */
    // console.log('333', taskList.items.size);
    if (taskList.items.size > 0) {
      taskList.items
        .forEach((task) => {
          if (task.step) {
            const complete = dispatch(task.step({ task }));
            if (complete) {
              // console.log('GAME LOOP task completed', task);
              dispatch(Actions.taskList.deleteItem({ item: task }));
            }
          }
        });
    }
    requestAnimationFrame(() => {
      this.doAnimateTask();
    });
  }

  render() {
    const { mainview, entityList } = this.props;
    const { preview, dialog, targetObject, selectedEntity, capturedObject } = mainview;
    // console.log(5555, capturedObject);

    return (
      <div
        className="FrontView"
        id="canvas-root"
      >
        <GameMap>
          { entityList.items.toList().map((entity) => (
            <Entity
              entity={entity}
              key={entity.id}
            />
          ))}
          {(targetObject && selectedEntity ? (<SelectSkillsDialog />) : null)}
          {(preview && preview.gameobject ? (<EntityTipItem preview={mainview.preview} />) : null)}
          {(capturedObject ? (<Entity entity={capturedObject} />) : null)}
        </GameMap>
        <div className="infopanel">
          <div>
            {'Карта: '}
            {mainview.camera.position.x}
            {' '}
            {mainview.camera.position.y}
          </div>
          {selectedEntity && (<EntityDetailItem selectedObjectId={selectedEntity.id} />)}
          {selectedEntity && (<EntityContentList entity={selectedEntity} />)}
          {selectedEntity && (<EntityToolPanel selectedEntity={selectedEntity} />)}
        </div>
        {dialog}
      </div>
    );
  }
}

Map.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entityList: PropTypes.object.isRequired,
  mainview: PropTypes.object.isRequired,
  taskList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
