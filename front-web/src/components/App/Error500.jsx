import React from 'react';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
  label: { padding: theme.spacing(1) },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Typography variant="h6" className={classes.root}>
      На сервере произошла ошибка.
    </Typography>
  );
}
