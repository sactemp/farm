import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PopupPanel } from '../../../lib/controls';
import Actions from '../../../redux/actions';

import './Styles.scss';

const mapStateToProps = (state) => ({
  mainview: state.mainview,
  entityKindList: state.entityKindList,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

const EntityTipItem = (props) => {
  const { entityKindList, mainview, dispatch } = props;
  const { entity, mousePos } = mainview.preview;
  const got = entityKindList.items.get(entity.entity_kind_id) || {};

  // console.log('ToolTipItem', viewPosition, mousePos);
  const hide = () => {
    // console.log(mainview);
    dispatch(Actions.mainview.hidePreview());
  };

  // setTimeout(hide, 4000);

  const position = {
    x: mousePos.x - mainview.camera.position.x,
    y: mousePos.y - mainview.camera.position.y,
    sx: 150,
    sy: 100,
  };

  return (
    <PopupPanel
      onMouseDown={hide}
      onMouseOut={hide}
      position={position}
      title="Информация"
    >
      <div>
        {got.title}
      </div>
    </PopupPanel>
  );
};

EntityTipItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entityKindList: PropTypes.object.isRequired,
  mainview: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityTipItem);
