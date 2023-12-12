import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Actions from 'redux/actions';
import EntityContent from './EntityContent';
import { executeSkill } from './gameObjectActions';

import './Styles.scss';

const mapStateToProps = ({ entityContentList }) => ({ entityContentList });
const mapDispatchToProps = (dispatch) => ({ dispatch });

const EntityContentList = (props) => {
  const { entityContentList, entity, dispatch } = props;
  const entityContents = entityContentList.items.filter((t) => t.parent_entity_id === entity.id).toList();

  return (entityContents.size > 0 ? (
    <div
      className="toolpanel"
    >
      {entityContents.map((entityContent) => (
        <EntityContent
          entityContent={entityContent}
          key={entityContent.id}
          onClick={() => {
            dispatch(executeSkill({
              entity_id: entity.id,
              targetEntity: entityContent,
              skillKind: { id: 5 },
            }));
          }}
        />
      ))}
    </div>
  ) : null);
};

EntityContentList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  entityContentList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityContentList);
