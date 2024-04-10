import React from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './login.css'


function Login() {
    const navigate = useNavigate();

    function logIn() {

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
    
        let users_credentials = {
            email: email,
            password: password
        };
    
        db_user_login(users_credentials, navigate);
    }

    return (
        <>
            <div className="log_in">
                <h2>Welcome</h2>
                <div className="form-floating">
                    <div className="form-floating">
                        <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" required />
                        <label htmlFor="email">Email Address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" name="email" placeholder="Password" required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" onClick={logIn}>Log In</button>
                </div>
            </div>
        </>
    )
}

export default Login

async function db_user_login(users_credentials, navigate) {

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(users_credentials),
    });

    if (response.ok) {
        console.log(users_credentials.email);
        const user = await fetch(`/api/user/${users_credentials.email}`, {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        });

        let userinfo = await user.json();

        localStorage.setItem('userName', userinfo.username);

        navigate("/plan-event");

    } else {
        const body = await response.json()
        alert(`⚠ Error: ${body.msg}`)
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    }
}