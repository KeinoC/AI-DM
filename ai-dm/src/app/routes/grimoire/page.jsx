"use client";

import React, { useState } from "react";
import ItemsTab from "./Tabs/ItemsTab";

export default function Grimoire() {
    const [submitData, setSubmitData] = useState([]);
    const [selectedForm, setSelectedForm] = useState(0);

    // createItem(onSubmit)

    // Create API function, pass in onSubmit

    return (
<div className="relative h-auto w-screen flex bg-slate-900 absolute z-[0]">
    <div className="absolute inset-0 bg-texture bg-fixed bg-center bg-cover opacity-20 absolute z-[-5]"></div>
    <ItemsTab />
</div>
    );
}
