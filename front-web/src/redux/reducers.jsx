import { combineReducers } from 'redux';
// import { connectRouter } from 'connected-react-router';
import Models from '../models';
import { modelReducers, auth, errors, settings, websocket } from '../lib/redux';
import mainview from './mainview';
// Import requestReducer from './requestReducer';

const result = () => combineReducers({
  ...modelReducers(Models),
  auth: auth.reducer,
  settings: settings.reducer,
  websocket: websocket.reducer,
  mainview: mainview.reducer,
  errors: errors.reducer,
});
export default result;
