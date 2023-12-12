import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from '@material-ui/core/Link';
import { Button, ListView, ListViewItemField } from '../../lib/controls';
import Actions from '../../redux/actions';
import Edit from './Edit';

import './Styles.scss';

const mapStateToProps = (state) => ({ unittypeList: state.unittypeList });

const mapDispatchToProps = (dispatch) => ({ dispatch });

class UserList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(Actions.unittypeList.fetchList());
  }

  render() {
    const { unittypeList, dispatch, route } = this.props;
    const Item = ({ item }) => (
      <div className="Item">
        <ListViewItemField
          label="Наименование:"
          value={item.title}
        />
        <ListViewItemField
          label="Здоровье:"
          value={item.health}
        />
        <ListViewItemField
          label="Скорость:"
          value={item.speed}
        />
        <ListViewItemField
          label="Защита:"
          value={item.defence}
        />
        <ListViewItemField
          label="Время для постройки:"
          value={item.timetobuild}
        />
        <div>
          <ListViewItemField
            label="Полное описание:"
            value={item.description}
          />
        </div>
      </div>
    );

    return (
      <div className="UserList">
        <Link to={`${route.match.url}/create`}>
          <Button>
            Новый тип юнита
          </Button>
        </Link>
        <ListView
          dispatch={dispatch}
          itemList={unittypeList}
          route={route}
          viewForEditItem={Edit}
        >
          <Item />
        </ListView>
      </div>
    );
  }
}

UserList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  unittypeList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
