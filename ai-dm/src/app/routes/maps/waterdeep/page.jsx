'use client'
import React from 'react';
import ChatWindow from '@/app/components/ChatWindow';
import NavBar from '@/app/components/NavBar';
import Grid from '@/app/components/Grid';


export default function WaterdeepMap() {
    return (
        <div className="h-screen overflow-y-none">
            <h1>Welcome to Waterdeep</h1>
            <Grid />
            <ChatWindow />
        </div>
    )
}