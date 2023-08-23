import React, { useState } from "react";
import { signUp } from '../../firebase/firebase-auth';
import LoginSignUpForm from "@/app/components/LoginSignUpForm";


const SignUp = () => {
    const [usernameValue, setUsername] = useState("");
    const [emailValue, setEmail] = useState("");
    const [passwordValue, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signUp(emailValue, passwordValue, usernameValue);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-black-900">
             <LoginSignUpForm setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} isLoginMode={false} error={error} emailValue={emailValue} passwordValue={passwordValue} setUsername={setUsername} usernameValue={usernameValue} />
        </div>
    );
};


export default SignUp;
