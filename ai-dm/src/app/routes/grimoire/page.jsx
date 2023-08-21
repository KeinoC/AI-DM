"use client";

import React, { useState } from "react";
import Form from "../../components/Form";
import { createItem } from "@/app/firebase/firebase-db-items";
import ItemsDisplay from './Items/ItemsDisplay';
import formData from "./forms/FormData";

export default function Grimoire() {
    const [submitData, setSubmitData] = useState([]);
    const [selectedForm, setSelectedForm] = useState(0);

    const formFields = formData[selectedForm].inputFields;

    console.log(submitData);

    // createItem(onSubmit)

    // Create API function, pass in onSubmit

    return (
        <>
            <br />
            Welcome to the Grimoire
            <br />
            <br />
            <label for="formTypes" className="bg-black">
                Add New:
            </label>
            <select
                id="formSelector"
                name="formTypes"
                onChange={(e) => setSelectedForm(e.target.value)}
                className="font-black bg-black"
            >
                {formData.map((formObj) => {
                    return (
                        <option key={formObj.id - 1} value={formObj.id - 1}>
                            {formObj.label}
                        </option>
                    );
                })}
            </select>
            <Form
                formFields={formFields}
                submitData={submitData}
                setSubmitData={setSubmitData}
            />
            <ItemsDisplay />
        </>
    );
}
