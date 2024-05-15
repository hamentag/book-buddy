/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useState } from "react";
import { createAccount } from "../api";

export default function Register({setToken}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        if (email && password) {

            try {
                const APIData = await createAccount(firstName, lastName, email, password);
                console.log(APIData)
                console.log(APIData.message)
                console.log(APIData.token)
                if (APIData.token) {
                    setToken(APIData.token);


                    setError(null);
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                }
                else {
                    setError(APIData.message);
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        else {
            setError("All fields marked with an asterisk (*) are mandatory.");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>New User</h3>
                {error && <p className="error">{error}</p>}
                <div className="fields">
                    <label>First Name
                        <input
                            value={firstName}
                            type="text"
                            name="firstName"
                            placeholder="--First Name--"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <label>Last Name
                        <input
                            value={lastName}
                            type="text"
                            name="lastName"
                            placeholder="--Last Name--"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <label>Email*
                        <input
                            value={email}
                            type="email"
                            name="email"
                            placeholder="--Email--"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>Password*
                        <input
                            value={password}
                            type="text"
                            name="password"
                            placeholder="--Password--"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button>Submit</button>
            </form>
        </>
    )
}