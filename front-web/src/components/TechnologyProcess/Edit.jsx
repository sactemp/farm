import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { isStringNotEmpty } from 'lib/validator';
import { TextEdit, EditItem, ComboBox, GroupPanel } from '../../lib/controls';
import Actions from '../../redux/actions';

const mapStateToProps = (state) => ({
  skillKindList: state.skillKindList,
  technologyProcessList: state.technologyProcessList,
  entityKindList: state.entityKindList,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

class TechnologyProcessListEdit extends Component {
  constructor(props) {
    super(props);

    this.defaultItem = { };
    this.validateRules = { };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(Actions.entityKindList.fetchList());
    dispatch(Actions.skillKindList.fetchList());
  }

  render() {
    const { technologyProcessList, skillKindList, entityKindList, dispatch, route } = this.props;
    const { itemToChange } = technologyProcessList;
    const { data, validator } = itemToChange;

    const validateState = itemToChange.validateState || {};
    const groupGokPanel = (type, num) => (
      <GroupPanel title={`объект ${num}`}>
        <div>
          <div>
            <ComboBox
              data={data}
              fieldId="id"
              fieldValue="title"
              id={`${type}_gok${num}_id`}
              label="Вид"
              onChange={validator.handleValueChangeEvent}
              options={entityKindList.items.toList().toArray()}
              placeholder="Выберите вид"
              validateState={validateState}
            />
          </div>
          <div>
            <TextEdit
              data={data}
              id={`${type}_gok${num}_count`}
              label="Количество"
              onChange={validator.handleValueChangeEvent}
              placeholder="Введите количество"
              validateState={validateState}
            />
          </div>
        </div>
      </GroupPanel>
    );

    return (
      <EditItem
        defaultItem={this.defaultItem}
        dispatch={dispatch}
        itemList={technologyProcessList}
        route={route}
        validateRules={this.validateRules}
      >
        { data && (
          <div>
            <GroupPanel title="Параметры для субъекта процесса">
              <div>
                <div>
                  <ComboBox
                    data={data}
                    fieldId="id"
                    fieldValue="title"
                    id="skill_kind_id"
                    label="Вид действия"
                    onChange={validator.handleValueChangeEvent}
                    options={skillKindList.items.toList().toArray()}
                    placeholder="Выберите вид"
                    validateState={validateState}
                  />
                </div>
                <div>
                  <TextEdit
                    data={data}
                    id="action_duration"
                    label="Продолжительность"
                    onChange={validator.handleValueChangeEvent}
                    placeholder="Введите продолжительность"
                    validateState={validateState}
                  />
                </div>
              </div>
            </GroupPanel>
            <GroupPanel title="Параметры процесса">
              <div>
                <div>
                  <TextEdit
                    data={data}
                    id="duration"
                    label="Продолжительность"
                    onChange={validator.handleValueChangeEvent}
                    placeholder="Введите продолжительность"
                    validateState={validateState}
                  />
                </div>
                <div>
                  <TextEdit
                    data={data}
                    id="primecost"
                    label="Стоимость"
                    onChange={validator.handleValueChangeEvent}
                    placeholder="Введите стоимость"
                    validateState={validateState}
                  />
                </div>
              </div>
            </GroupPanel>

            <GroupPanel title="Произведеные объекты">
              {groupGokPanel('produced', '1')}
              {groupGokPanel('produced', '2')}
            </GroupPanel>
            <GroupPanel title="Затраченные объекты">
              {groupGokPanel('spended', '1')}
              {groupGokPanel('spended', '2')}
              {groupGokPanel('spended', '3')}
              {groupGokPanel('spended', '4')}
              {groupGokPanel('spended', '5')}
            </GroupPanel>
          </div>
        )}
      </EditItem>
    );
  }
}

TechnologyProcessListEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entityKindList: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  skillKindList: PropTypes.object.isRequired,
  technologyProcessList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TechnologyProcessListEdit);
