import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Premium from "./PremiumContent";
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { getBitcoinArticles } from "./api";

//save for later incase I want to put link back on home page
//<NavLink activeclassname="active" to="/premium-content">Profile Homepage</NavLink>



import {getUser, getToken, setUserSession, resetUserSession} from "./service/AuthService";
import axios from "axios";

//login session token experation timining
const verifyTokenAPIUrl = 'https://a7ge2c27jc.execute-api.us-east-1.amazonaws.com/prod/verify'


function App() {
  getBitcoinArticles();//news api
  const [isAuthenicating, setAuthenicating] = useState(true);

  useEffect(() => {
    //checks if token exists
    const token = getToken();
    if(token === 'undefined' || token  === undefined || token === null || !token) {
      return;
    }
    //calls api to check if token is valid
    const requestConfig = {
      headers: {
        'x-api-key': 'wJx5kw3rZ39P1f5MXGB6y4PcyHdvjK6S2CcrejnB' // might wanna make enviroment variable  
      }
    }
    const resquestBody ={
      user: getUser(),
      token: token
    }

    axios.post(verifyTokenAPIUrl, resquestBody, requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token);
      setAuthenicating(false);
    }).catch(() => {
      resetUserSession();
      setAuthenicating(false);
    })
  }, []);

const token = getToken();
if(isAuthenicating && token) {
  return <div className="content">Authenicating.....</div>
}



  return (
    <div className="App">
      <BrowserRouter>
      <div className="header">
        <NavLink exact activeclass="active" to="/">Home</NavLink>
        <NavLink activeclassname="active" to="/register">Register</NavLink>
        <NavLink activeclassname="active" to="/login">Login</NavLink>
        
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <PublicRoute path="/register" component={Register}/>
          <PublicRoute path="/login" component={Login}/>
          <Route path="/premium-content" component={Premium}/>
        </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
