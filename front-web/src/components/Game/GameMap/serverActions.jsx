import Actions from '../../../redux/actions';

const sendExecuteSkill = (params) => (dispatch) => dispatch(Actions.websocket.send({
  command: 'executeSkill',
  params,
}));

const sendStartTechnologyProcess = (params) => (dispatch) => dispatch(Actions.websocket.send({
  command: 'startTechnologyProcess',
  params,
}));

const sendCancelTask = (params) => (dispatch) => dispatch(Actions.websocket.send({
  command: 'cancelTask',
  params,
}));

export { sendExecuteSkill, sendStartTechnologyProcess, sendCancelTask };
