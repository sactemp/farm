import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DialogView } from '../../../lib/controls';
import Actions from '../../../redux/actions';
import EntityContent from './EntityContent';

import './Styles.scss';

const mapStateToProps = (state) => ({
  mainview: state.mainview,
  entityKindList: state.entityKindList,
  entityList: state.entityList,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

const SelectContentDialog = (props) => {
  const { dispatch, entity, entityList } = props;
  const contents = entityList.items.filter((t) => t.parent_entity_id === entity.id).toList();
  return (
    <DialogView
      handleCancel={() => {
        dispatch(Actions.mainview.closeDialog());
      }}
      handleOk={() => {
        dispatch(Actions.mainview.closeDialog(contents.filter((ec) => ec.isSelected).map((ec) => ec)));
      }}
      showMode="modal"
      title="Передача"
    >
      <div
        className="toolpanel"
      >
        <div>
          <div>
            <div className="text-center">
              Имеющиеся
            </div>
            {contents.filter((ec) => !ec.isSelected)
              .map((entityContent) => (
                <EntityContent
                  entityContent={entityContent}
                  key={entityContent.id}
                  onClick={() => {
                    dispatch(Actions.entityContentList.updateItem({
                      item: {
                        ...entityContent,
                        isSelected: true,
                      },
                      doNotSaveToDS: 1,
                    })).then(() => {
                      console.log(444, contents.toArray());
                    });
                  }}
                />
              ))}
          </div>
          <div>
            <div>
              Что отдать
            </div>
            {contents.filter((ec) => ec.isSelected)
              .map((entityContent) => (
                <EntityContent
                  entityContent={entityContent}
                  key={entityContent.id}
                  onClick={() => {
                    dispatch(Actions.entityContentList.updateItem({
                      item: {
                        ...entityContent,
                        isSelected: false,
                      },
                      doNotSaveToDS: 1,
                    })).then(() => {
                      console.log(444, contents.toArray());
                    });
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </DialogView>
  );
};
SelectContentDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  entityList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectContentDialog);
