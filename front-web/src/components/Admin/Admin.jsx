import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link as RouterLink } from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Home from './Home';
import Error404 from '../App/Error404';
import SkillKind from '../SkillKind';
import User from '../User';
import Role from '../Role';
import Zone from '../Zone';
import Entity from '../Entity';
import EntityKind from '../EntityKind';
import TechnologyProcess from '../TechnologyProcess';

const Admin = ({ match }) => {
  const menuItems = [
    {
      id: 1,
      title: 'Локации',
      component: Zone,
    },
    {
      id: 3,
      title: 'Виды игровых объектов',
      component: EntityKind,
    },
    {
      id: 4,
      title: 'Технологические процессы',
      component: TechnologyProcess,
    },
    {
      id: 5,
      title: 'Виды умений',
      component: SkillKind,
    },
    {
      id: 6,
      title: 'Пользователи',
      component: User,
    },
    {
      id: 7,
      title: 'Роли',
      component: Role,
    },
    {
      id: 2,
      title: 'Игровые объекты (экземпляры)',
      component: Entity,
    },
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          { menuItems.map((item) => (
            <Button
              key={item.id}
              variant="contained"
              color="primary"
              component={RouterLink}
              to={item.component.baseUrl(match.url)}
            >
              {item.title}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      <Switch>
        <Route
          exact
          path={`${match.url}`}
          render={(params) => (<Home {...params} />)}
        />
        { menuItems.map((item) => {
          const Component = item.component;
          return (
            <Route
              key={item.title}
              path={Component.baseUrl(match.url)}
              render={(params) => (<Component {...params} />)}
            />
          );
        })}
        <Route component={Error404} />
      </Switch>
    </div>
  );
};

Admin.propTypes = { match: PropTypes.object.isRequired };

export default Admin;
