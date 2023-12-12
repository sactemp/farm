import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { duration } from '../../../lib/datehelper';
// import { Badge } from '../../../lib/controls';

import './Styles.scss';

const mapStateToProps = (state) => ({ entityKindList: state.entityKindList });
const mapDispatchToProps = (dispatch) => ({ dispatch });

const TechnologyProcess = (props) => {
  const { entityKindList, technologyProcess, onClick } = props;
  const pek1 = entityKindList.items.get(technologyProcess.produced_ek1_id);
  if (!pek1) {
    console.log('ERROR', technologyProcess);
  }
  const spended = [
    {
      kind: { id: -1, title: 'Запуск' },
      count: `${duration(technologyProcess.executor_duration)}c`,
    },
    (technologyProcess.duration ? {
      kind: { id: -2, title: 'Время' },
      count: `${duration(technologyProcess.duration)}c`,
    } : null),
    {
      kind: entityKindList.items.get(technologyProcess.spended_ek1_id),
      count: `${technologyProcess.spended_ek1_count}шт`,
    },
    {
      kind: entityKindList.items.get(technologyProcess.spended_ek2_id),
      count: `${technologyProcess.spended_ek2_count}шт`,
    },
    {
      kind: entityKindList.items.get(technologyProcess.spended_ek3_id),
      count: technologyProcess.spended_ek3_count,
    },
    {
      kind: entityKindList.items.get(technologyProcess.spended_ek4_id),
      count: technologyProcess.spended_ek4_count,
    },
    {
      kind: entityKindList.items.get(technologyProcess.spended_ek5_id),
      count: technologyProcess.spended_ek5_count,
    },
  ].filter((item) => item && item.kind);

  return (
    <div
      className="btn"
      onClick={onClick}
      role="button"
      style={{
        backgroundColor: `${pek1.gcolor}`,
        position: 'relative',
      }}
      tabIndex={0}
    >
      <img
        alt={pek1.gicon}
        height={64}
        src={`/images/${pek1.gicon}`}
        style={{ marginLeft: 'auto' }}
        width={64}
      />
      <div>
        {pek1.title}
        {' '}
        -
        {' '}
        {technologyProcess.produced_ek1_count}
        шт
      </div>
      <div style={{ fontWeight: 'bold' }}>
        Требуется:
      </div>
      {spended.map((item) => (
        <div key={item.kind.id}>
          {item.kind.title}
          {' - '}
          {item.count}
        </div>
      ))}
    </div>
  );
};
TechnologyProcess.propTypes = {
  entityKindList: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  technologyProcess: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TechnologyProcess);
