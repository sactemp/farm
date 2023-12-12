import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Popover } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  list: { width: 350 },
  paper: { padding: theme.spacing(1) },
  title: { padding: theme.spacing(1) },
  value: { paddingLeft: theme.spacing(2) },
}));

const Logined = (props) => {
  const { user, onLogout } = props;

  const classes = useStyles();
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
        Профиль пользователя
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
        <div className={clsx(classes.list)}>
          <Typography variant="button" className={classes.title}>
            Ф.И.О.:
          </Typography>
          <Typography variant="subtitle1" className={classes.title}>
            <Link to={`/users/edit/${user.id}`}>
              { user.surname }
              {' '}
              {' '}
              { user.name }
              {' '}
              {' '}
              { user.patronymic }
            </Link>
          </Typography>
          <div className="text-center">
            <Button
              variant="contained"
              onClick={onLogout}
            >
              Выйти
            </Button>
          </div>
        </div>
      </Popover>
    </>
  );
};

Logined.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

Logined.defaultProps = { user: null };

export default Logined;
