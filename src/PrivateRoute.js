import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUserState.currentUser
    }
}

function PrivateRoute({app: App, currentUser, ...rest}) {
    return (
        <Route
        {...rest}
        render={props => {
           return currentUser ? <App {...props}/> : <Redirect to="/signin" />
        }}
        ></Route>
    )
}

export default connect(mapStateToProps)(PrivateRoute)
