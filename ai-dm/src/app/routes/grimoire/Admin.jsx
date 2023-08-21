"use client";

import { React, useState } from "react";
import Form from "../../components/Form";

import formData from "./forms/FormData";
import { createItem } from "@/app/firebase/firebase-db-items";

export default function Admin() {
    const [submitData, setSubmitData] = useState([]);
    const [selectedForm, setSelectedForm] = useState(0);

    const formFields = formData[selectedForm].inputFields;

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
            <Form formFields={formFields} onSubmit={createItem(submitData)} />
        </>
    );
}
