import React, { useState } from "react";
import { signIn } from '../../firebase/firebase-auth';
import LoginSignUpForm from "@/app/components/LoginSignUpForm";


const Login = () => {
    const [usernameValue, setUsername] = useState("KeinoC");
    const [emailValue, setEmail] = useState("hello@keino.dev");
    const [passwordValue, setPassword] = useState("abc123");
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signIn(emailValue, passwordValue, usernameValue);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-black-900">
            <LoginSignUpForm setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} isLoginMode={true} error={error} emailValue={emailValue} passwordValue={passwordValue} setUsername={setUsername} usernameValue={usernameValue} />
        </div>
    );
};


export default Login;

