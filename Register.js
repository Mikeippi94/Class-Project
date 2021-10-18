import React, {useState} from 'react';
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';
import './index.css';
import { AWS_API_KEY } from "./config";
import Validator  from 'email-validator';
import { Redirect } from 'react-router';


const registerUrl = 'https://a7ge2c27jc.execute-api.us-east-1.amazonaws.com/prod/register'; //change to enviromental variable
const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setrePassword] = useState('');
    const [message, setMessage] = useState(null);
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);
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

    const styles = {
        wrap: {
          width: 150,
        },
        input: {
          display: 'block',
          width: '100%',
          height: 38,
          padding: '6px 10px',
          borderRadius: 2,
          border: 'solid 1px #ccc',
          boxShadow: 'inset 0 1px 1px rgba(0,0,0,.1)',
          fontSize: 16,
          outline: '0',
          boxSizing: 'border-box',
        },
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
    const errorMessage = {
        color: 'red',
        fontSize: '15px'
      
      };
      //

    const submitHandler = (event) => {
        event.preventDefault();

        if(username.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === '')//checks to see if all fields are filled out
        {
            setMessage('All feilds are required');
            return;
        }
        setMessage(null);;
        
        

        const requestConfig = {
            headers: {
                'x-api-key':AWS_API_KEY // AWS bearer token
                
            }
        }
        
        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password

        }

        
        

        //checks to see if passwords match
        if(password === repassword) {
        axios.post(registerUrl, requestBody, requestConfig).then(response => {
            setMessage('Registeration Successful');

        }).catch(error=> {
            if(error.response.status === 403){
                setMessage(error.response.data.message);

            }else{
                setMessage('sorry there is an issue with the server try again later');
            }
        })
    
        }else {
            setMessage('Password does not match');
            return;
        }
        setMessage(null);
        
        
         
    }   
   
      
    return (
        <div  className="form">
            <div style={appStyle}>
            

            <form style={formStyle} onSubmit={submitHandler}>
                <h2>Register</h2>
                Name: <br/><input style={inputStyle}  type="text" value={name} onChange={event => setName(event.target.value)} /> <br/>
                Email: <br/><input style={inputStyle}  type="email" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
                Username: <br/><input style={inputStyle} type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
                Password: <br/><input style={inputStyle} type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                <PasswordStrengthBar style={inputStyle} password={password} minLength={5} onChangeScore={(score, feedback) => {console.log(score, feedback);}} />
                Confirm Password:<br/> <input style={inputStyle} type="password" value={repassword} onChange={event => setrePassword(event.target.value)} /> <br/>
                <input style={submitStyle} type="submit" value="Register" /> 
                {message && <p style={errorMessage} classname="message" > {message} </p>}
            </form>
           
            </div>
        </div>

    )
}

export default Register;