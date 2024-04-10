import React from 'react';
import { useNavigate } from 'react-router-dom';
import register from './register.js'
import './register.css';

function Register() {
    const navigate = useNavigate();

    function jsx_register() {
        register(navigate);
    }

    return (
        <>
            <div className="register">
                <h2>Register</h2>
                <div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="username" name="username" placeholder="" required/>
                            <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" required/>
                            <label htmlFor="email">Email Address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" required/>
                            <label htmlFor="password">Password</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Password" required/>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" onClick={ jsx_register }>Register</button>
                </div>
            </div>
        </>
    )
}

export default Register