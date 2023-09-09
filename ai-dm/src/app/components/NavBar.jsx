"use client";
import React, {useEffect } from "react";
import Link from "next/link"; // Import Link from next/link
import { UserContext, useUser } from "../contexts/UserContext"; // Assuming this file is in the same directory
import { signOut } from "../firebase/firebase-auth";
import { NavBarOnlineStatus } from "../users/components/OnlineStatuses";

export default function NavBar() {
    const { currentUser, userStatusArray } = useUser();

    // console.log(NavBarOnlineStatus)



    return (
        <div className="flex gap-4 top-0 w-full relative z-[100] bg-slate-500 backdrop-blur-sm bg-opacity-20 h-15 justify-between p-4">
            <div className="flex">
                <a href="/" className="btn btn-ghost normal-case text-xl mr-4">
                    AI D&D
                </a>
            </div>
            <div className="flex">
                <NavBarOnlineStatus />
            </div>

            {!currentUser && (
                <div className="flex ml-auto gap-4">
                    <button className="uppercase font-thin transition ease-in-out hover:-translate-y-[2px]">
                        <Link href="/routes/login">Login</Link>
                    </button>

                    <button className="uppercase font-thin transition ease-in-out hover:-translate-y-[2px]">
                        <Link href="/routes/sign-up">Sign Up</Link>
                    </button>
                </div>
            )}

            {currentUser && (
                <div className="flex flex-row justify-around">
                    <div className="group relative">
                        <div className="flex gap-2 items-center">
                            <h2>Sup, {currentUser.username}!</h2>
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 h-10 shadow-lg  overflow-hidden rounded-full">
                                    <img
                                        src="/Default_Profile_Picture.jpeg"
                                        alt="Profile"
                                    />
                                </div>
                            </label>
                        </div>

                        <ul
                            tabIndex={0}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-0 absolute z-10 mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <button className="opacity-0 group-hover:opacity-100 duration-200 delay-100">
                                    <Link href="/users/my-profile">
                                        My Profile
                                    </Link>
                                </button>
                            </li>

                            <li>
                                <button className="opacity-0 group-hover:opacity-100 duration-300 delay-100">
                                    <Link href="/routes/grimoire">
                                        Grimoire
                                    </Link>
                                </button>
                            </li>

                            <li>
                                <button className="opacity-0 group-hover:opacity-100 duration-400 delay-100">
                                    <Link href="/adventures">
                                        Explore Adventures
                                    </Link>
                                </button>
                            </li>

                            <li>
                                <button className="opacity-0 group-hover:opacity-100 duration-500 delay-100">
                                    <Link href="/adventures/shenanigans">
                                        Current Adventure
                                    </Link>
                                </button>
                            </li>

                            <li>
                                <button
                                    className="opacity-0 group-hover:opacity-100 duration-600 delay-100 text-red-300 hover:font-bold hover:text-red-400"
                                    onClick={() => signOut()}
                                >
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
