import React, { useState } from "react";
import { signIn } from "../../firebase/firebase-auth";
import LoginSignUpForm from "@/app/components/LoginSignUpForm";
import { AnimatePresence, motion } from "framer-motion";

const Login = () => {
    const [usernameValue, setUsername] = useState("");
    const [emailValue, setEmail] = useState("");
    const [passwordValue, setPassword] = useState("");
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
        <div className="flex justify-center items-center min-h-screen bg-invisible bg-opacity-0">
            <motion.div
                key="button"
                // className="text-lg text-gray-300 bg-gray-900 hover:bg-yellow-700 "
                initial={{ opacity: 0, y: 0, scale: .8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    opacity: { duration: .7, delay: 0, ease: "easeInOut" },
                    scale: { duration: .7, delay: 0, ease: "easeInOut" },
                }}
                exit={{ opacity: 0, y: "100vh", delay: 0 }}
            >
                <LoginSignUpForm
                    setEmail={setEmail}
                    setPassword={setPassword}
                    handleSubmit={handleSubmit}
                    isLoginMode={true}
                    error={error}
                    emailValue={emailValue}
                    passwordValue={passwordValue}
                    setUsername={setUsername}
                    usernameValue={usernameValue}
                />
            </motion.div>
        </div>
    );
};

export default Login;
