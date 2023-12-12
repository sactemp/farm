import genConstNames from '../lib/redux/genConstNames';
import Websocket from '../lib/redux/websocket';

const constantsDefines = {
    gameMode: '',
    mouseEvent: {
      subscribe: '',
      unsubscribe: '',
    },
    camera: {
      setPosition: '',
      setCalcWorldMousePos: '',
    },
    selectedEntity: { set: '' },
    targetObject: { set: '' },
    capturedObject: { set: '' },
    scrolling: { set: '' },
    preview: { set: '' },
    toolAction: { set: '' },
    dialog: { set: '' },
    set: '',
    clear: '',
  },
  constants = genConstNames(constantsDefines, 'mainview'),
  defaultState = {
    gameMode: null,
    scrolling: null,
    camera: {
      position: {
        x: 0,
        y: 0,
      },
      calcWorldMousePos: () => (true),
    },
    toolAction: null,
    subscribersMouseEvent: null,
    selectedEntity: null,
    targetObject: null,
    capturedObject: null,
    dialog: null,
    preview: null,
  },
  onConnect = (auth, resolve) => (dispatch) => dispatch(Websocket.actions.send({
    command: 'auth-signin',
    loginCredentials: { login: auth.user.login, password: auth.user.password },
  }))
    .then(() => {
      dispatch(Websocket.actions.send({ command: 'enter-in-zone' }));
    })
    .then(() => {
      dispatch(({ type: constants.gameMode, payload: 1 }));
      resolve();
    }),
  actions = (modelActions) => ({
    requestOnlineGameMode: (url, auth) => (dispatch) => new Promise((resolve) => dispatch(Websocket.actions.connect({
      url,
      onConnect: () => dispatch(onConnect(auth, resolve)),
      messageHandler: ({ action, item, repository }) => {
        if (action === 'create') {
          dispatch(modelActions[`${repository}List`].createItem({ item, doNotSaveToDS: 1 }));
        } else if (action === 'update') {
          dispatch(modelActions[`${repository}List`].updateItem({ item, doNotSaveToDS: 1 }));
        } else if (action === 'delete') {
          dispatch(modelActions[`${repository}List`].deleteItem({ item, doNotSaveToDS: 1 }));
        }
      },
    }))),
    requestOfflineGameMode: () => (dispatch) => new Promise((resolve) => {
      dispatch(Websocket.actions.send({ command: 'leave-zone' }))
        .then(() => {
          dispatch(Websocket.actions.send({ command: 'auth-signout' }));
        })
        .then(() => {
          dispatch(({ type: constants.gameMode, payload: 0 }));
          resolve();
        });
    }),
    // setGameMode: (payload) => ({ type: constants.gameMode, payload }),
    set: (payload) => ({
      type: constants.set,
      payload,
    }),
    setCameraPosition: (payload) => ({
      type: constants.camera.setPosition,
      payload,
    }),
    setCameraCalcWorldMousePos: (payload) => ({
      type: constants.camera.setCalcWorldMousePos,
      payload,
    }),
    setScrolling: (payload) => ({
      type: constants.scrolling.set,
      payload,
    }),
    setToolAction: (payload) => ({
      type: constants.toolAction.set,
      payload,
    }),
    setSelectedObject: (payload) => ({
      type: constants.selectedEntity.set,
      payload,
    }),
    setTargetObject: (payload) => ({
      type: constants.targetObject.set,
      payload,
    }),
    waitCapturedObject: (payload) => (dispatch) => new Promise((resolve) => {
      dispatch({
        type: constants.capturedObject.set,
        payload: {
          ...payload,
          resolve,
        },
      });
    }),
    updateCapturedObject: (payload) => ({
      type: constants.capturedObject.set,
      payload,
    }),
    processCapturedObject: (params) => (dispatch, getState) => {
      const { mainview } = getState();
      const { capturedObject } = mainview;
      capturedObject.resolve(params);
      return dispatch({
        type: constants.capturedObject.set,
        payload: null,
      });
    },
    showPreview: (params) => (dispatch, getState) => {
      dispatch({
        type: constants.preview.set,
        payload: { show: 1 },
      });
      setTimeout(() => {
        const state = getState();
        const { mainview } = state;
        if (mainview.preview && mainview.preview.show) {
          // console.log(222, params);
          dispatch(dispatch({
            type: constants.preview.set,
            payload: params,
          }));
          setTimeout(() => {
            dispatch({
              type: constants.preview.set,
              payload: null,
            });
          }, 10000);
        }
      }, 100);
    },
    hidePreview: () => (dispatch) => {
      dispatch({
        type: constants.preview.set,
        payload: null,
      });
    },
    showDialog: (payload) => (dispatch) => new Promise((resolve, reject) => {
      dispatch({
        type: constants.dialog.set,
        payload: {
          ...payload,
          resolve,
          reject,
        },
      });
    }),
    closeDialog: (result) => (dispatch, getState) => {
      const { mainview } = getState();
      const { dialog } = mainview;
      if (!dialog) return;
      dispatch({
        type: constants.dialog.set,
        payload: null,
      });
      if (result && dialog.resolve) dialog.resolve(result);
      else if (dialog.reject) dialog.reject();
    },
    waitMouseEvent: (payload) => (dispatch) => new Promise((resolve) => {
      dispatch({
        type: constants.mouseEvent.subscribe,
        payload: {
          ...payload,
          resolve,
        },
      });
    }),
    processMouseEvent: (params) => (dispatch, getState) => {
      const { mainview } = getState();
      if (params.event) {
        const { resolve } = mainview.subscribersMouseEvent;
        resolve(params);
        dispatch({ type: constants.mouseEvent.unsubscribe });
      }
    },
    unsubscribeMouseEvent: () => ({ type: constants.mouseEvent.unsubscribe }),
    clear: () => ({ type: constants.clear }),
  }),

  // ----------------------------------------------------------------------------------------------------------------

  reducer = (state = defaultState, action) => {
    // console.log(999999999, action);
    switch (action.type) {
    case constants.gameMode:
      return {
        ...state,
        gameMode: action.payload,
      };
    case constants.mouseEvent.subscribe:
      return {
        ...state,
        subscribersMouseEvent: action.payload,
      };
    case constants.mouseEvent.unsubscribe:
      return {
        ...state,
        subscribersMouseEvent: null,
      };
    case constants.set:
      return {
        ...state,
        ...action.payload,
      };
    case constants.camera.setPosition:
      return {
        ...state,
        camera: {
          ...state.camera,
          position: action.payload,
        },
      };
    case constants.camera.setCalcWorldMousePos:
      return {
        ...state,
        camera: {
          ...state.camera,
          calcWorldMousePos: action.payload,
        },
      };
    case constants.scrolling.set:
      return {
        ...state,
        scrolling: action.payload,
      };
    case constants.preview.set:
      return {
        ...state,
        preview: action.payload,
      };
    case constants.toolAction.set:
      return {
        ...state,
        toolAction: action.payload,
      };
    case constants.selectedEntity.set:
      return {
        ...state,
        selectedEntity: action.payload,
      };
    case constants.targetObject.set:
      return {
        ...state,
        targetObject: action.payload,
      };
    case constants.capturedObject.set:
      return {
        ...state,
        capturedObject: action.payload,
      };
    case constants.dialog.set:
      return {
        ...state,
        dialog: action.payload,
      };
    case constants.clear:
      return defaultState;
    default:
      return state;

    }
  };

export default {
  constants,
  actions,
  reducer,
};
