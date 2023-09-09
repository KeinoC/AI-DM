"use client";
import React from "react";
import Top from "./Top";
import Sidebar from "./Sidebar";
import Mid2 from "./Mid2";

export default function Profile() {
    return (
        <div className="flex flex-row h-screen w-screen">
            <Sidebar />
            <div className="w-full flex flex-col m-2">
                <Top />
                <Mid2 />
            </div>
        </div>
    );
}
