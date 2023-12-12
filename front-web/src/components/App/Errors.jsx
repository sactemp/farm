import React from 'react';
import PropTypes from 'prop-types';
// import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(3) },
  label: { padding: theme.spacing(1) },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Error = ({ item }) => {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert key={item.id} severity="error" className={classes.root}>
        {' '}
        {item.code || ''}
        {item.message}
      </Alert>

    </Snackbar>
  );
};

Error.propTypes = { item: PropTypes.object.isRequired };

const Errors = (props) => {
  const { errors } = props;

  return (
    <>
      { errors.items.map((item) => (
        <Error
          key={item.id}
          item={item}
        />
      ))}
    </>
  );
};

Errors.propTypes = { errors: PropTypes.object.isRequired };

export default Errors;
