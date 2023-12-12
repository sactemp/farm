import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSkillOrTechnologyProcess } from './gameObjectActions';
import Actions from '../../../redux/actions';
import { Badge } from '../../../lib/controls';
import EntityTaskList from './EntityTaskList';
// import SelectTechnologyProcess from './SelectTechnologyProcess';

import './Styles.scss';

const mapStateToProps = (state) => ({
  skillKindList: state.skillKindList,
  technologyProcessList: state.technologyProcessList,
  entityTechnologyProcessList: state.entityTechnologyProcessList,
  entitySkillList: state.entitySkillList,
  mainview: state.mainview,
  entityKindList: state.entityKindList,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

const Entity = (props) => {
  const { entityKindList, entity, dispatch, mainview } = props;
  const ek = entityKindList.items.get(entity.entity_kind_id);
  if (!entity || !ek) {
    return null;
  }
  const { selectedEntity, targetObject, capturedObject, preview, camera } = mainview;

  const onPreventDefault = (e) => {
    e.preventDefault();
    return false;
  };
  const checkGokIsLandscape = () => ([
    1,
    2,
    3,
  ].includes(ek.entity_type_id));

  const onLeftClick = (event) => {
    // dispatch(Actions.mainview.setTargetObject(null));
    dispatch(Actions.mainview.closeDialog());
    if (mainview.capturedObject) {
      return;
    }
    if (mainview.subscribersMouseEvent) {
      const params = {
        ...mainview.subscribersMouseEvent,
        event,
        targetEntity: entity,
        mousePos: mainview.camera.calcWorldMousePos(mainview, event),
      };
      console.log(4441, params);
      event.stopPropagation();
      dispatch(Actions.mainview.processMouseEvent(params));
      return;
    }
    if (checkGokIsLandscape()) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    dispatch(Actions.mainview.unsubscribeMouseEvent());
    dispatch(Actions.mainview.setSelectedObject(entity));
    dispatch(Actions.mainview.setToolAction(null));
  };
  const onRightClick = (event) => {
    dispatch(Actions.mainview.closeDialog());
    if (!selectedEntity) {
      return;
    }
    const mousePos = camera.calcWorldMousePos(mainview, event);
    event.preventDefault();
    event.stopPropagation();

    dispatch(selectSkillOrTechnologyProcess({ entity: selectedEntity, targetEntity: entity, mousePos }))
      .then((params) => {
        // if (!appliedSkills) return;
        console.log('WARN appliedSkills', params);
      })
      .catch((err) => console.log('canceled, err', err));
  };
  const width = (entity.x2 ? (entity.x2 - entity.xx) : ek.sx),
    dx = (entity.x2 ? 0 : width / 2);
  const height = (entity.y2 ? (entity.y2 - entity.yy) : ek.sy),
    dy = (entity.y2 ? 0 : height / 2);

  const tilex = (ek.tilex ? `${ek.tilex}px` : '100%'),
    tiley = (ek.tiley ? `${ek.tiley}px` : '100%');
  const style = {
    transform: `translate(${entity.xx - mainview.camera.position.x - dx}px, ${entity.yy - mainview.camera.position.y - dy}px)`,
    // 'left': item.xx - mainview.camera.position.x - dx,

    // 'top': item.yy - mainview.camera.position.y - dy,
    cursor: (mainview.subscribersMouseEvent ? 'pointer' : 'default'),
    width,
    height,
    backgroundImage: `url('/images/${ek.gicon}')`,
    backgroundSize: `${tilex} ${tiley}`,
  };
  const selectedEntityClassName = (selectedEntity && selectedEntity.id === entity.id ? 'entity-selected' : '');
  const targetEntityClassName = (targetObject && targetObject.entity.id === entity.id ? 'entity-target' : '');
  const disableEntityClassName = (entity.state > 0 ? 'entity-disabled' : '');

  if (Number.isNaN(style.transform)) {
    // console.log(__filename, 'game logic error', style);
  }
  return (
    <div
      className={`entity ${selectedEntityClassName} ${targetEntityClassName} ${disableEntityClassName}`}
      onContextMenu={onPreventDefault}
      // onClick={onLeftClick}
      onKeyDown={(event) => {
        console.log(event.key);
        if (event.key === 'Escape') {
          dispatch(Actions.mainview.setToolAction(null));
          dispatch(Actions.mainview.clearSelectedObject());
        }
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        if (event.button === 0) {
          onLeftClick(event);
        } else if (event.button === 2) {
          onRightClick(event);
        }
        return false;
      }}
      onMouseEnter={(event) => {
        if (checkGokIsLandscape()) {
          return;
        }
        dispatch(Actions.mainview.showPreview({
          mousePos: camera.calcWorldMousePos(mainview, event),
          entity,
        }));
      }}
      onMouseLeave={() => {
        if (checkGokIsLandscape()) {
          return;
        }
        if (preview && !preview.entity) {
          dispatch(Actions.mainview.hidePreview());
        }
      }}
      onMouseMove={(event) => {
        if (capturedObject) {
          const mousePos = camera.calcWorldMousePos(mainview, event);
          dispatch(Actions.mainview.updateCapturedObject({
            ...capturedObject,
            entity: {
              ...capturedObject.entity,
              xx: Math.round(mousePos.x),
              yy: Math.round(mousePos.y),
            },
          }));
        }
      }}
      style={style}
    >
      {(entity.count > 1) && (
        <div
          className="badge-label"
          style={{
            top: '-12px',
            right: '-12px',
          }}
        >
          <Badge>
            {entity.count}
          </Badge>
        </div>
      )}
      <EntityTaskList
        entity={entity}
        float
      />
    </div>
  );
};

Entity.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  entityKindList: PropTypes.object.isRequired,
  mainview: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Entity);
