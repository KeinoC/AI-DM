"use client"

import React from 'react';
import SignUp from './SignUp';
import { UserProvider } from '../../contexts/UserContext';


export default function LoginPage() {
    return (
        <UserProvider>
            <SignUp />
        </UserProvider>
    );
}
