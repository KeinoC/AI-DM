"use client"
import React from 'react';
import NavBar from './components/NavBar';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center"> Welcome to our AI D&D Project</h1>
      <NavBar />
    </main>
  )
}
