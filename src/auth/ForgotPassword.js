import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CustomizedAlert from '../CustomizedAlert'; 

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function ForgotPassword() {
    const emailRef = React.useRef();
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');

    const classes = useStyles();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setMessage('');
            // await resetPassword(emailRef.current.value);
            setMessage('Check you inbox for further instructions');
        } catch(err) {
            setError(err.message);
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Container maxWidth="sm">
                    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                        <TextField id="filled-basic" label="Enter Email" variant="outlined" required fullWidth
                        inputRef={emailRef}/>
                        <Button type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit} size="large">
                            Send Password Reset Link
                        </Button>
                    </form>
                </Container>
            </div>
            <CustomizedAlert error={error} message={message}/>
        </Container>
    )
}

export default ForgotPassword
