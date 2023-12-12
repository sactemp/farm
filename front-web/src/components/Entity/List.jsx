import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from '@material-ui/core/Link';
import { Button, ListView, ListViewItemField } from '../../lib/controls';
import Actions from '../../redux/actions';
import Edit from './Edit';

const mapStateToProps = (state) => ({
  entityList: state.entityList,
  entityKindList: state.entityKindList,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

class EntityList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(Actions.entityKindList.fetchList());
    dispatch(Actions.entityList.fetchList());
  }

  render() {
    const { entityList, entityKindList, dispatch, route } = this.props;

    const Item = ({ item }) => {
      const ec = entityKindList.items.get(item.entity_kind_id) || {};

      return (
        <div className="Item">
          <img
            alt={`/images/${ec.gicon}`}
            height={64}
            src={`/images/${ec.gicon}`}
            width={64}
          />
          <ListViewItemField
            label="ID:"
            value={item.id}
          />
          <ListViewItemField
            label="Наименование:"
            value={ec.title}
          />
          <ListViewItemField
            label="Цвет:"
            value={ec.gcolor}
          />
          <ListViewItemField
            label="Размер X:"
            value={item.sx}
          />
          <ListViewItemField
            label="Размер Y:"
            value={item.sy}
          />
          <div>
            <ListViewItemField
              label="Иконка:"
              value={ec.gicon}
            />
          </div>
        </div>
      );
    };

    return (
      <div className="GameobjectTypeList">
        <Link to={`${route.match.url}/create`}>
          <Button>
            Новый игровой объект
          </Button>
        </Link>
        <ListView
          dispatch={dispatch}
          itemList={entityList}
          route={route}
          viewForEditItem={Edit}
        >
          <Item />
        </ListView>
      </div>
    );
  }
}
EntityList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entityKindList: PropTypes.object.isRequired,
  entityList: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityList);
