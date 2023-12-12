import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DialogView } from '../../../lib/controls';
import Actions from '../../../redux/actions';

import TechnologyProcess from './TechnologyProcess';
import './Styles.scss';

const mapStateToProps = (state) => ({
  mainview: state.mainview,
  skillKindList: state.skillKindList,
  entityList: state.entityList,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

const SelectTechnologyProcess = (props) => {
  const { technologyProcessList, skillKindList, dispatch } = props;
  const tp = technologyProcessList.first();
  const sk = skillKindList.items.get(tp.skill_kind_id);
  return (
    <DialogView
      handleCancel={() => {
        dispatch(Actions.mainview.closeDialog());
      }}
      showMode="modal"
      title={`${sk.title} - выбор`}
    >
      <div className="toolpanel">
        { technologyProcessList.map((technologyProcess) => (
          <TechnologyProcess
            key={technologyProcess.id}
            onClick={() => {
              dispatch(Actions.mainview.closeDialog(technologyProcess));
            }}
            technologyProcess={technologyProcess}
          />
        ))}
      </div>
    </DialogView>
  );
};
SelectTechnologyProcess.propTypes = {
  skillKindList: PropTypes.object.isRequired,
  technologyProcessList: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTechnologyProcess);
