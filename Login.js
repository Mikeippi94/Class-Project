import React, {useState} from 'react';
import axios from 'axios';
import { setUserSession } from './service/AuthService';
import { AWS_API_KEY } from "./config";

const loginAPIUrl = 'https://a7ge2c27jc.execute-api.us-east-1.amazonaws.com/prod/login';


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

      //style
    const appStyle = {
        height: '250px',
        display: 'flex'
    };

    const formStyle = {
        margin: 'auto',
        padding: '10px',
        border: '1px solid #c9c9c9',
        borderRadius: '5px',
        background: '#f5f5f5',
        width: '220px',
        display: 'block'
    };
    const labelStyle = {
        margin: '10px 0 5px 0',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '15px',
    };

    const inputStyle = {
        margin: '5px 0 10px 0',
        padding: '5px', 
        border: '1px solid #bfbfbf',
        borderRadius: '3px',
        boxSizing: 'border-box',
        width: '100%'
    };

      const submitStyle = {
        margin: '10px 0 0 0',
        padding: '7px 10px',
        border: '1px solid #efffff',
        borderRadius: '3px',
        background: '#3085d6',
        width: '100%', 
        fontSize: '15px',
        color: 'white',
        display: 'block'
    };
    //

    const submitHandler = (event) => {
        event.preventDefault();
        if(username.trim() === '' || password.trim() === ''){
            setErrorMessage('Both username and password are required');
            return;
        }
        setErrorMessage(null);
        const requestConfig = {
            headers: {
                'x-api-key': AWS_API_KEY // AWS bearer token
                
            }
        }
        const requestBody = {
            username: username,
            password: password
        }
        axios.post(loginAPIUrl, requestBody, requestConfig).then((response)=> {
            setUserSession(response.data.user, response.data.token);
            props.history.push('/premium-content'); // personal homepage
        }).catch((error) => {
            if(error.response.status === 401 || error.response.status === 403) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('server is down');
            }
        })
    }
    return (
        <div style={appStyle}>
            <form style={formStyle} onSubmit ={submitHandler}>
                <h2>Login</h2>
                username: <input style={inputStyle} type="text" value={username} onChange={event => setUsername(event.target.value)}/> <br />
                password: <input style={inputStyle} type="password" value={password} onChange={event => setPassword(event.target.value)}/> <br />
                <p style={{ textAlign: "center" }}>Not a member? <a href="./register">Sign Up</a></p>
                <p style={{ textAlign: "center" }}> <a href="./forgotpw">Forgot Password</a></p>
                <input style={submitStyle} type="submit" value="Login" />

            </form>
            {errorMessage && <p className="message">{errorMessage}</p>}
        </div>

    ) 
}

export default Login;