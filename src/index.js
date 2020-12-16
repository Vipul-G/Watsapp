import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import reportWebVitals from './reportWebVitals';
import FirebseSignIn from './auth/firebaseSignIn'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './App'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './auth/ForgotPassword'
import { Provider } from 'react-redux';
import Store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    	<Router>
				<Provider store={Store}>
					<Switch>
						<PrivateRoute exact path='/' app={App} />
						<Route path='/signin' component={FirebseSignIn} />
						<Route path='/forgotPassword' component={ForgotPassword} />
					</Switch>
				</Provider>
			</Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
