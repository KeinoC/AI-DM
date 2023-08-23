"use client";
import React, { useContext } from "react";
import Link from "next/link"; // Import Link from next/link
import { UserContext, useUser } from "../contexts/UserContext"; // Assuming this file is in the same directory
import { signOut } from "../firebase/firebase-auth";

export default function NavBar() {
    const { currentUser } = useUser();

    return (
        <div className="flex gap-4 top-0 w-full z-[50] bg-slate-500 backdrop-blur-sm bg-opacity-20 h-12 justify-between p-4">
            <div className="flex items-center">
                <a href="/" className="btn btn-ghost normal-case text-xl mr-4">
                    AI D&D
                </a>

                {!currentUser && (
                    <div className="flex gap-4">
                        <button className="flex-right uppercase font-thin transition ease-in-out hover:-translate-y-[2px]">
                            <Link href="/routes/login">Login</Link>
                        </button>

                        <button className="uppercase font-thin transition ease-in-out hover:-translate-y-[2px]">
                            <Link href="/routes/sign-up">Sign Up</Link>
                        </button>
                    </div>
                )}
            </div>

            {currentUser && (
                <div className="dropdown dropdown-end">
                    <div className="flex gap-2 items-center">
                        <h2>{currentUser.username}</h2>
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 h-10 shadow-lg  overflow-hidden rounded-full">
                                <img src="/Default_Profile_Picture.jpeg" alt="Profile" />
                            </div>
                        </label>
                    </div>

                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <button onClick={() => signOut()}>Sign Out</button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
