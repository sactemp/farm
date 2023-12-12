import Models from '../models';
import { modelActions, auth, errors, filetransfer, settings, websocket } from '../lib/redux';
import config from '../config';
import makeDS from '../lib/dataSourceLBRestApi';
import mainview from './mainview';

const modelActionsAll = modelActions(Models, config.restapi, makeDS);

const result = {
  ...modelActionsAll,
  auth: auth.actions,
  errors: errors.actions,
  filetransfer: filetransfer.actions,
  mainview: mainview.actions(modelActionsAll),
  settings: settings.actions,
  websocket: websocket.actions,
};
export default result;
