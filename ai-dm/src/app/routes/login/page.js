"use client"

import React from 'react';
import LoginSignUp from './LoginSignUp';
import { UserProvider } from '../../contexts/UserContext';

export default function LoginPage() {
    return (
        <UserProvider>
            <LoginSignUp />
        </UserProvider>
    );
}
