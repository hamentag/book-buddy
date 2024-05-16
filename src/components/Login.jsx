
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api";
import {setCookie} from '../cookie/cookie'

export default function Login({ token, setToken, setMsg, nextPath}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (email && password) {
            try {
                const APIData = await loginRequest(email, password);
                if (APIData.token) {
                    setToken(APIData.token)
                    // storing token in cookie (expires in 3 days)
                    setCookie("token", APIData.token, 3);                    
                    
                    setMsg({
                        msgTxt: APIData.message,
                        propo: <button
                                onClick={() => {  navigate('/account'); setMsg(null) }}
                                >See Account
                                </button>,
                    });

                    // Clear inpu fields
                    setError(null);
                    setEmail("");
                    setPassword("");

                    // Go to the page you came from
                    navigate(nextPath);

                }
                else {
                    setError(APIData.message)
                }
            } catch (err) {
                console.error(err)
            }
        }
        else if (!email && !password){
            setError("Please fill out both the email and password fields to proceed.");
        }
        else if (!email){
            setError("Kindly fill out the email field to continue.");
        }
        else{
            setError("Password is required to proceed.");            
        }
    }

    return (
        <div className="login-card">
            {!token &&
                <>
                    <h3>Sign in</h3>
                    <form onSubmit={handleSubmit}>
                        
                        <div className="login-fields">
                           
                                <input value={email}
                                    type="email"
                                    name="email"
                                    placeholder="*Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                        
                                <input value={password}
                                    type="text"
                                    name="password"
                                    placeholder="*Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                        </div>
                        <button>Log In</button>
                        <div>
                        <p style={{fontSize: '12px',}}>Don't have an account? <span className="register-key" onClick={() => { navigate(`/register`); }}>Register</span></p>
                    </div>
                    </form>
                    {error && <p className="error">{error}</p>}
                    
                </>
            }
        </div>
    );
}