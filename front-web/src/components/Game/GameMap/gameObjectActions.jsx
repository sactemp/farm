import React from 'react';
import Immutable from 'immutable';
import Actions from '../../../redux/actions';
import SelectSkillsDialog from './SelectSkillsDialog';
import SelectInventoryDialog from './SelectInventoryDialog';
import SelectTechnologyProcess from './SelectTechnologyProcess';
import { sendExecuteSkill, sendStartTechnologyProcess } from './serverActions';

// T O D O :: helpers for skill

/*
 * const calcDistanceFromPointToSegment = ({ point, segment }) => {
 * const v = new Vector(segment.x1 - segment.x0, segment.y1 - segment.y0);
 * const w = new Vector(point.xx - segment.x0, point.yy - segment.y0);
 * const c1 = w.dot(v);
 * if (c1 <= 0) {
 * return w.length();
 * }
 * const c2 = v.dot(v);
 * if (c2 <= c1) {
 * return new Vector(point.xx - segment.x1, point.yy - segment.y1).length();
 * }
 * const b = c1 / c2;
 * const p = new Vector(point.xx, point.yy);
 * const pb = v.multiply(b).add(p);
 * return new Vector(point.xx - pb.x, point.yy - pb.y).length();
 * };
 *
 * const calcDistanceFromPointToRect = ({ point, rect }) => {
 * const d1 = calcDistanceFromPointToSegment({
 * point,
 * 'segment': {
 * 'x0': rect.x0,
 * 'y0': rect.y0,
 * 'x1': rect.x0,
 * 'y1': rect.y1
 * }
 * });
 * const d2 = calcDistanceFromPointToSegment({
 * point,
 * 'segment': {
 * 'x0': rect.x0,
 * 'y0': rect.y0,
 * 'x1': rect.x1,
 * 'y1': rect.y0
 * }
 * });
 * const d3 = calcDistanceFromPointToSegment({
 * point,
 * 'segment': {
 * 'x0': rect.x1,
 * 'y0': rect.y0,
 * 'x1': rect.x1,
 * 'y1': rect.y1
 * }
 * });
 * const d4 = calcDistanceFromPointToSegment({
 * point,
 * 'segment': {
 * 'x0': rect.x0,
 * 'y0': rect.y1,
 * 'x1': rect.x1,
 * 'y1': rect.y1
 * }
 * });
 * // console.log(333, point, rect, d1, d2, d3, d4);
 * return Math.min(d1, d2, d3, d4);
 * };
 */

/*
 * https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
 * console.log(222, rect1, rect2);
 */

const startTechnologyProcess = (params) => (dispatch) => dispatch(sendStartTechnologyProcess(params));
const startExecuteSkill = ({ entity, skillKind, targetEntity, mousePos }) => (dispatch) => dispatch(sendExecuteSkill({
  entity_id: entity.id,
  skill_kind_id: skillKind.id,
  target_entity_id: targetEntity.id,
  target_xx: mousePos.x,
  target_yy: mousePos.y,
}));

const selectTechnologyProcess = ({ entity, skillKind }) => (dispatch, getState) => new Promise((resolve, reject) => {
  const { technologyProcessList, entityTechnologyProcessList } = getState();
  const appliedTechnologyProcess = entityTechnologyProcessList.items.toList()
    .filter((etp) => etp.entity_kind_id === entity.entity_kind_id)
    .map((etp) => technologyProcessList.items.get(etp.technology_process_id))
    .filter((tp) => tp.skill_kind_id === skillKind.id);

  console.log('selectTechnologyProcess:', appliedTechnologyProcess.toList().toArray());
  if (appliedTechnologyProcess.size > 1) {
    const dialog = (
      <SelectTechnologyProcess
        technologyProcessList={appliedTechnologyProcess}
      />
    );
    return dispatch(Actions.mainview.showDialog({ dialog }))
      .then((technologyProcess) => resolve({ technologyProcess }))
      .catch(() => reject());
  }
  return resolve({ technologyProcess: appliedTechnologyProcess.first() });
});

const creatableTechnologyProcess = (params) => (dispatch) => {
  const { entity } = params;
  console.log('creatableTechnologyProcess', params);
  return dispatch(selectTechnologyProcess(params))
    .then((params2) => {
      console.log('technologyProcess', params2);
      const createdEntity = {
        zone_id: entity.zone_id,
        entity_kind_id: params2.technologyProcess.produced_ek1_id,
      };
      return dispatch(Actions.mainview.waitCapturedObject({
        entity: createdEntity,
        technologyProcess: params2.technologyProcess,
      }));
    })
    .then((params3) => {
      const { mousePos } = params3;
      console.log('createdObject', params3);
      dispatch(startTechnologyProcess({
        entity_id: entity.id,
        technologyProcess_id: params3.technologyProcess.id,
        target_xx: mousePos.x,
        target_yy: mousePos.y,
      }));
    });
};

const appliedTechnologyProcess = (params) => (dispatch) => (params.targetEntity ? Promise.resolve(params) :
  dispatch(Actions.mainview.waitMouseEvent(params))
).then((params2) => dispatch(selectTechnologyProcess({ ...params, entity: params2.targetEntity }))
  .then(({ technologyProcess }) => {
    console.log(technologyProcess);
    if (technologyProcess) {
      dispatch(sendStartTechnologyProcess({
        entity_id: params2.entity.id,
        technologyProcess_id: technologyProcess.id,
        target_entity_id: params2.targetEntity.id,
        target_xx: params2.mousePos.x,
        target_yy: params2.mousePos.y,
      }));
    }
  }));

const handlers = {
  1: (params) => (dispatch) => (params.targetEntity ? Promise.resolve(params) :
    dispatch(Actions.mainview.waitMouseEvent(params))
  ).then(({ skillKind, entity, targetEntity, mousePos }) => {
    dispatch(startExecuteSkill({ skillKind, entity, targetEntity, mousePos }));
  }),
  4: ({ entity }) => (dispatch) => {
    const dialog = (
      <SelectInventoryDialog
        entity={entity}
      />
    );
    return dispatch(Actions.mainview.showDialog({ dialog }))
      .then((contents) => {
        console.log(contents);
        // Promise.all(contents.map((item) => dispatch(moveContentToEntity({
        //   entityContent: item,
        //   entity,
        // }))));
      });
  },
  6: (params) => (dispatch) => dispatch(appliedTechnologyProcess(params)),
  7: (params) => (dispatch) => dispatch(appliedTechnologyProcess(params)),
  8: (params) => (dispatch) => dispatch(appliedTechnologyProcess(params)),
  11: (params) => (dispatch) => dispatch(appliedTechnologyProcess(params)),
  // 5: (params) => (dispatch) => dispatch(dropContentToWorld(params)),
  14: (params) => (dispatch) => dispatch(creatableTechnologyProcess(params)),
  16: (params) => (dispatch) => dispatch(creatableTechnologyProcess(params)),
  21: (params) => (dispatch) => dispatch(creatableTechnologyProcess(params)),
  23: (params) => (dispatch) => dispatch(appliedTechnologyProcess(params)),
};

const executeSkill = (params) => (dispatch) => {
  console.log('executeSkill', params);
  const handler = handlers[params.skillKind.id];
  if (!handler) {
    throw new Error('handler not found');
  }
  return dispatch(handler(params)).catch((e) => console.log('execute skill canceled', params, e));
};

const selectSkill = ({ entity, targetEntity, appliedSkills, mousePos }) => (dispatch) => new Promise((resolve, reject) => {
  console.log('selectSkill:', appliedSkills.toArray());
  if (appliedSkills.size === 0) {
    return reject();
  }
  if (appliedSkills.size === 1) {
    return resolve(appliedSkills.first());
  }
  const dialog = (
    <SelectSkillsDialog entity={entity} targetEntity={targetEntity} appliedSkills={appliedSkills} mousePos={mousePos} />
  );
  return dispatch(Actions.mainview.showDialog({ dialog }))
    .then((tp) => resolve(tp))
    .catch(() => reject());
});

const selectSkillOrTechnologyProcess = (params) => (dispatch, getState) => new Promise((resolve, reject) => {
  const { entity, targetEntity, mousePos } = params;
  const { entitySkillList, skillKindList } = getState();

  const allowedEntitySkills = entitySkillList.items.toList()
    .filter((it) => it.entity_kind_id === entity.entity_kind_id)
    .filter((it) => it.usecase === 1 || it.usecase === 3);
  const appliedSkills = (targetEntity ? entitySkillList.items.toList()
    .filter((it) => it.entity_kind_id === targetEntity.entity_kind_id)
    .filter((it) => it.usecase === 2 || it.usecase === 3)
    .filter((it) => allowedEntitySkills.filter((al) => it.skill_kind_id === al.skill_kind_id).size > 0)
    .map((es) => skillKindList.items.get(es.skill_kind_id)) : new Immutable.List([params.skillKind]));
  // const result = { ...params, appliedSkills };
  console.log('selectSkillOrTechnologyProcess, appliedSkills', appliedSkills.toArray());

  if (appliedSkills.size === 0) {
    return resolve();
  }

  return dispatch(selectSkill({ entity, targetEntity, appliedSkills, mousePos }))
    .then((skillKind) => dispatch(executeSkill({
      entity,
      skillKind,
      targetEntity,
      mousePos,
    }))
      .then((res) => resolve(res))
      .catch((err) => reject(err)))
    .catch((err) => reject(err));
});

export { executeSkill, selectSkillOrTechnologyProcess, startTechnologyProcess };
