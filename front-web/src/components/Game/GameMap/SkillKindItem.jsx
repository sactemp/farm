import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Styles.scss';

const mapStateToProps = (state) => ({ entityKindList: state.entityKindList });
const mapDispatchToProps = (dispatch) => ({ dispatch });

const SkillKindItem = (props) => {
  const { skillKind, onClick } = props;

  return (
    <div
      className="btn"
      onClick={onClick}
      role="button"
      style={{ position: 'relative' }}
      tabIndex={0}
    >
      <div>
        {skillKind.title}
      </div>
    </div>
  );
};
SkillKindItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  skillKind: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillKindItem);
