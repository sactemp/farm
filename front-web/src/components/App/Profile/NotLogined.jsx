import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, TextField, Popover, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: { maxWidth: '310px' },
  paper: { padding: theme.spacing(1) },
  loginForm__input: {
    margin: theme.spacing(1),
    width: '300px',
  },
}));

const LoginForm = ({ handleLogin }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        color="inherit"
        onClick={handlePopoverOpen}
        // onMouseLeave={handlePopoverClose}
      >
        Войти
      </Button>
      <Popover
        className={classes.popover}
        id="mouse-over-popover"
        classes={{ paper: classes.paper }}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableRestoreFocus
      >
        <Grid container direction="column" alignItems="center" className={classes.root}>
          <Typography variant="body1">
            Для входа в систему введите имя пользователя и пароль
          </Typography>
          <TextField
            id="outlined-search"
            label="Логин"
            type="text"
            variant="outlined"
            className={classes.loginForm__input}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            className={classes.loginForm__input}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => handleLogin({ username, password })}
          >
            Войти
          </Button>
        </Grid>
      </Popover>
    </>
  );
};

LoginForm.propTypes = { handleLogin: PropTypes.func.isRequired };

export default LoginForm;
