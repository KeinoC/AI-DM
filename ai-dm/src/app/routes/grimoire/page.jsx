"use client";

import React, { useState } from "react";
import ItemsTab from "./Tabs/ItemsTab";

export default function Grimoire() {
    const [submitData, setSubmitData] = useState([]);
    const [selectedForm, setSelectedForm] = useState(0);

    // createItem(onSubmit)

    // Create API function, pass in onSubmit

    return (
        <>
        <ItemsTab />
        </>
    );
}
