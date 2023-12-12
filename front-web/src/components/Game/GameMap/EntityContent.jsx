import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Actions from 'redux/actions';
import { Badge } from '../../../lib/controls';

import './Styles.scss';

const mapStateToProps = (state) => ({
  entitySkillList: state.entitySkillList,
  entityKindList: state.entityKindList,
});

const EntityContent = (props) => {
  const { onClick, entityKindList, entityContent } = props;
  const ec = entityKindList.items.get(entityContent.entity_kind_id);
  if (!entityContent || !ec) {
    return null;
  }
  return (
    <div
      className="btn"
      onClick={onClick}
      style={{ position: 'relative' }}
    >
      <div className="badge-label">
        <Badge>
          {entityContent.entity_count}
        </Badge>
      </div>
      <img
        alt={ec.gicon}
        height={32}
        src={`images/${ec.gicon}`}
        style={{ marginLeft: 'auto' }}
        width={32}
      />
      <div>
        {ec.title}
      </div>
    </div>
  );
};

EntityContent.propTypes = {
  entityContent: PropTypes.object.isRequired,
  entityKindList: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(EntityContent);
