"use client";
import React from "react";

import Top from "./Top";
import Sidebar from "./Sidebar";
// import Left from './Left';
// import Mid from "./Mid";
// import Right from './right';
// import Bottom from './Bottom';

export default function Profile() {
    return (
        <div className="flex flex-row h-screen w-screen">
            <Sidebar />
            <div className="w-full flex flex-col m-2">
                <Top />
                {/* <Mid /> */}
            </div>
        </div>
    );
}
