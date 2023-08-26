import React, { useState } from "react";


const LoginSignUpForm = ( { setEmail, setPassword, handleSubmit, isLoginMode, error, emailValue, passwordValue, setUsername, usernameValue } ) => {
    return (
        <div className="w-full max-w-xs p-7 bg-yellow-500 bg-opacity-80 rounded-lg  shadow-lg ">

            <h2 className="text-2xl mb-4 text-gray-800">
                {isLoginMode ? "Login" : "Sign Up"}
            </h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className=" flex flex-col">

                { !isLoginMode &&
                    <>
                        <div className="block mb-1 text-gray-800">Username:</div>
                        <div className="mb-4">
                            <input
                            className="w-full px-3 py-2 text-gray-900 bg-gray-400 rounded shadow-lg focus:yellow-700"
                            value={usernameValue}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            />
                        </div>
                    </>
                }


                <div className="block mb-1 text-gray-800">Email:</div>
                <div className="mb-4">
                    <input
                        className="w-full px-3 py-2 text-gray-900 bg-gray-400 rounded shadow-lg focus:yellow-700"
                        value={emailValue}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div> 
                
                <div className="block mb-1 text-gray-800">Password:</div>
                <div className="mb-4">
                    <input
                            type="password"
                            className="w-full px-3 py-2 text-gray-900 bg-gray-400 rounded shadow-lg focus:yellow-700"
                            value={passwordValue}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                </div>

                <button className="w-full bg-gray-900 hover:bg-green-900 shadow-xl text-gray-300 hover:text-gray-900 py-2 my-4 rounded transition duration-300">
                    {isLoginMode ? "Login" : "Sign Up"}
                </button>

            </form>

            {/* <button
                onClick={() => setLoginMode(!isLoginMode)}
                className="text-gray-900 flex justify-center mt-2 hover:text-green-700"
            >
                {isLoginMode ? "Switch to Sign Up" : "Switch to Login"}
            </button> */}

        </div>
    );
};


export default LoginSignUpForm;