import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
// import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import Profile from './Profile';

const useStyles = makeStyles((theme) => ({
  grow: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
}));

const mapStateToProps = (state) => ({ auth: state.auth });

const Header = (props) => {
  const { auth } = props;
  const classes = useStyles();

  // console.log(auth);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.menuButton} component={RouterLink} to="/">
            Ферма-онлайн
          </Typography>
          <Button color="inherit" component={RouterLink} to="/news">
            Новости
          </Button>
          <Button color="inherit" component={RouterLink} to="/downloads">
            Программное обеспечение
          </Button>
          <div className={classes.grow} />
          {auth.user && (
            <Button color="inherit" component={RouterLink} to="/admin">
              Администрирование
            </Button>
          )}
          <div>
            <Profile />
          </div>
          {/* <Button color="inherit">Login</Button> */}

        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = { auth: PropTypes.object.isRequired };

export default connect(mapStateToProps)(Header);
