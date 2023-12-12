import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../../../redux/actions';
// import { Vector } from 'lib/vector';
import { PopupPanel } from '../../../lib/controls';
import EntityDetailItem from './EntityDetailItem';

import './Styles.scss';

const mapStateToProps = ({ mainview }) => ({ mainview });
const mapDispatchToProps = (dispatch) => ({ dispatch });

const SelectSkillsDialog = (props) => {
  const { targetEntity, appliedSkills, mousePos, mainview, dispatch } = props;
  // const gok = entityKindList.items.get(selectedGameObject.entity_kind_id) || {};

  // const targetGok = entityKindList.items.get(targetObject.entity.entity_kind_id) || {};

  const onPreventDefault = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  const position = {
    x: mousePos.x - mainview.camera.position.x,
    y: mousePos.y - mainview.camera.position.y,
    sx: 250,
    sy: 200,
  };
  return (
    <PopupPanel
      onClose={(event) => {
        event.stopPropagation();
        dispatch(Actions.mainview.closeDialog());
      }}
      position={position}
      title="Действия"
    >
      <EntityDetailItem selectedEntity={targetEntity} />
      { appliedSkills.map((skillKind) => (
        <div
          className="skillButton"
          key={skillKind.id}
          onClick={() => {
            dispatch(Actions.mainview.closeDialog(skillKind));
            dispatch(Actions.mainview.setTargetObject(null));
          }}
          onMouseDown={onPreventDefault}
        >
          <div className="title">
            {skillKind.title}
          </div>
        </div>
      ))}
    </PopupPanel>
  );
};
SelectSkillsDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  targetEntity: PropTypes.object.isRequired,
  appliedSkills: PropTypes.object.isRequired,
  mousePos: PropTypes.object.isRequired,
  mainview: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectSkillsDialog);
