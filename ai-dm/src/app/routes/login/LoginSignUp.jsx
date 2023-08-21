import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext"; // Assuming this file is in the same directory
import { signIn, signUp } from '../../firebase/firebase-auth';

const LoginSignUp = () => {
    const [isLoginMode, setLoginMode] = useState(true);
    const [email, setEmail] = useState("hello@keino.dev");
    const [password, setPassword] = useState("abc123");
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

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

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-black-900">
            <div className="w-full max-w-xs p-7 bg-yellow-500 bg-opacity-80 rounded-lg  shadow-lg">
                <h2 className="text-2xl mb-4 text-gray-800">
                    {isLoginMode ? "Login" : "Sign Up"}
                </h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form
                onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-900">Email:</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 text-gray-900 bg-gray-400 rounded shadow-lg focus:yellow-700"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-800">Password:</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 text-gray-900 bg-gray-400 rounded shadow-lg focus:yellow-700"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-green-900 text-gray-300 hover:text-gray-900 py-2 my-4 rounded transition duration-300"
                    >
                        {isLoginMode ? "Login" : "Sign Up"}
                    </button>
                </form>

                <button
                    onClick={() => setLoginMode(!isLoginMode)}
                    className="text-gray-900 flex justify-center mt-2 hover:text-green-700"
                >
                    {isLoginMode ? "Switch to Sign Up" : "Switch to Login"}
                </button>
            </div>
        </div>
    );
};

export default LoginSignUp;
