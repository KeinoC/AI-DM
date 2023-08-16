"use client"

import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext"; // Assuming this file is in the same directory

const LoginSignUp = () => {
    const { signIn, signUp, loading } = useUser();
    const [isLoginMode, setLoginMode] = useState(true); // True for Login, False for Signup
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous errors

        try {
            if (isLoginMode) {
                await signIn(email, password);
            } else {
                await signUp(email, password);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    {isLoginMode ? "Login" : "Sign Up"}
                </button>
            </form>

            <button onClick={() => setLoginMode(!isLoginMode)}>
                {isLoginMode ? "Switch to Sign Up" : "Switch to Login"}
            </button>
        </div>
    );
};

export default LoginSignUp;
