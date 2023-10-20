"use client";

import React from "react";
import Login from "./Login";
import { UserProvider } from "../../contexts/UserContext";

export default function LoginPage() {
    return (
        <UserProvider>
                <Login />
        </UserProvider>
    );
}
