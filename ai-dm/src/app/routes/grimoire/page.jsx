"use client";

import React, { useState } from "react";
import ItemsTab from "./Tabs/ItemsTab";

export default function Grimoire() {
    const [submitData, setSubmitData] = useState([]);
    const [selectedForm, setSelectedForm] = useState(0);

    // createItem(onSubmit)

    // Create API function, pass in onSubmit
// TODO - Hey Connor can you implement tabs for the grimoire? Lets start with (equipment, classes, races, spells )
    return (
        <div className="relative min-h-screen h-auto w-screen flex bg-slate-900 absolute z-[0]">
            <div className="absolute inset-0 bg-texture bg-fixed bg-center bg-cover opacity-20 absolute z-[-5]"></div>
            <ItemsTab />
            {/* <div className="tabs">
                <a className="tab tab-lifted">Tab 1</a>
                <a className="tab tab-lifted tab-active">Tab 2</a>
                <a className="tab tab-lifted">Tab 3</a>
            </div> */}
        </div>
    );
}
