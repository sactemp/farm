import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EntityTaskList from './EntityTaskList';

import './Styles.scss';

const mapStateToProps = ({ entityKindList }) => ({ entityKindList });

const EntityDetailItem = (props) => {
  const { entityKindList, selectedEntity } = props;
  const ek = entityKindList.items.get(selectedEntity.entity_kind_id) || {};

  return (
    <div>
      <div className="detail">
        <img
          alt={`/images/${ek.gicon}`}
          src={`/images/${ek.gicon}`}
        />
        {(selectedEntity.title && (
          <div className="text">
            {'Ник: '}
            {selectedEntity.title}
          </div>
        ))}
        <div>
          {`Вид: ${ek.id}-${ek.title}`}
        </div>
        <div>
          {`Состояние: ${selectedEntity.state}`}
        </div>
        <div>
          {`Координаты: ${selectedEntity.xx}:${selectedEntity.yy}`}
        </div>
        {(selectedEntity.count > 1) && (
          <div>
            {`Кол-во: ${selectedEntity.count}`}
          </div>
        )}
      </div>
      <EntityTaskList
        entity={selectedEntity}
        float={false}
      />
    </div>
  );
};
EntityDetailItem.propTypes = {
  entityKindList: PropTypes.object.isRequired,
  selectedEntity: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(EntityDetailItem);
