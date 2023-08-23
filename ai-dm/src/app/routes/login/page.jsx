"use client";

import React from "react";
import Login from "./Login";
import { UserProvider } from "../../contexts/UserContext";
import { AnimatePresence, motion } from "framer-motion";

export default function LoginPage() {
    return (
        <UserProvider>
                <Login />
        </UserProvider>
    );
}
