import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function getAlert(error, message) {
  if(error !== '') {
    return <Alert severity="error">{error}</Alert>;
  }
  else if(message !== '') {
    return <Alert severity="success">{message}</Alert>;
  }
}

export default function CustomizedAlert({error, message}) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{marginTop: "10px"}}>
      {
        getAlert(error, message)}
      
    </div>
  );
}
