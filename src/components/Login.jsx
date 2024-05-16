import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api";

export default function Login({ token, setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (email && password) {
            try {
                const APIData = await loginRequest(email, password);
                if (APIData.token) {
                    console.log(APIData.token)
                    setToken(APIData.token)

                    setSuccessMsg(APIData.message);

                    setError(null);
                    setEmail("");
                    setPassword("");

                }
                else {
                    setError(APIData.message)
                }
            } catch (err) {
                console.error(err)
            }
        }
        else {
            setError("All fields marked with an asterisk (*) are mandatory.");
        }
    }


    return (
        <>
            <h3>Login</h3>
            {token && !successMsg &&
                <>
                    <p>You already login</p>
                    <button onClick={() => { setToken(null) }}>Log In as another User</button>
                </>
            }

            {!token &&
                <>
                    <form onSubmit={handleSubmit}>
                        {error && <p className="error">{error}</p>}
                        <div className="fields">
                            <label>Email*
                                <input value={email}
                                    type="email"
                                    name="email"
                                    placeholder="--Email--"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <label>Password*
                                <input value={password}
                                    type="text"
                                    name="password"
                                    placeholder="--Password--"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                        </div>
                        <button>Log In</button>
                    </form>
                    <div>
                        <p>Don't have an acount? <span className="register-key" onClick={() => { navigate(`/register`); }}>Register</span></p>
                    </div>

                </>
            }
            {successMsg &&
                <div>
                    <p>{successMsg}</p>
                    <button onClick={() => { navigate(`/`); }}>Home</button>
                </div>
            }

        </>
    );
}