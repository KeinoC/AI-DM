'use client'
import React, { useState } from "react";
import { useAdventure } from "@/app/contexts/AdventureContext";
import Link from 'next/link';
import { navToFullRoute } from "@/app/utils/helpers/navigation";
import { createAdventure } from "@/app/firebase/firebase-db-adventures";

export function CreateAdventureForm() {

    const [formData, setFormData] = useState({
        profileImg: null,
        name: "",
        type: "",
        description: "",
    });

    const [urlOption, setUrlOption] = useState(true);

    const { newAdventureData, createAdventureMode, setCreateAdventureMode } = useAdventure();

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "file" ? target.files[0] : target.value;
        const name = target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const ProfileImageToggle = () => {
        setUrlOption(prevUrlOption => !prevUrlOption);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            if (window.confirm("Are you sure you want to create this adventure?")) {
                const newAdventureId = await createAdventure(formData);
                await addPlayerToAdventure(newAdventureId, auth.currentUser.uid);
            } else {
                setUrlOption(true);
                console.log("User canceled the action.");
            }
        } catch (error) {
            console.error("Error handling submit: ", error);
        }
    };
    


    return (
        <div className=" w-screen bg-slate-900 border-transparent border-2 hover:border-yellow-500 hover:border-2 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 max-w-sm mx-auto my-4 p-4">


        <form
            onSubmit={handleSubmit}
            
        >
            <div className="relative mb-4">
                <label
                    htmlFor="profileImg"
                    className="text-slate-300 font-semibold mb-2 flex flex-row"
                >
                    Adventure Image:{  <button type="button" className=" bg-slate-800 rounded-full px-3 py-1 text-xs font-thin text-yellow-500 hover:font-bold " onClick={ProfileImageToggle}>toggle img type</button>}
                </label>
              
                <input
                    type={urlOption ? "text" : "file"}
                    placeholder={urlOption ? "Enter image url" : "Attach File"}
                    id="profileImg"
                    name="profileImg"
                    className="w-full px-3 py-2 text-slate-300 bg-slate-800 rounded border border-slate-700 focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                    onChange={handleInputChange}
                />
            </div>
            <div className="relative mb-4">
                <label
                    htmlFor="name"
                    className="block text-slate-300 font-semibold mb-2"
                >
                    Adventure Name:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter adventure name"
                    className="w-full px-3 py-2 text-slate-300 bg-slate-800 rounded border border-slate-700 focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                    onChange={handleInputChange}
                />
            </div>
            <div className="relative mb-4">
                <label
                    htmlFor="type"
                    className="block text-slate-300 font-semibold mb-2"
                >
                    Adventure Type:
                </label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    placeholder="Enter adventure type"
                    className="w-full px-3 py-2 text-slate-300 bg-slate-800 rounded border border-slate-700 focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                    onChange={handleInputChange}
                />
            </div>
            <div className="relative mb-4">
                <label
                    htmlFor="description"
                    className="block text-slate-300 font-semibold mb-2"
                >
                    Description:
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows="3"
                    placeholder="Enter a description for the adventure"
                    className="w-full px-3 py-2 text-slate-300 bg-slate-800 rounded border border-slate-700 focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                    onChange={handleInputChange}
                ></textarea>
            </div>
            <div className="mt-4">
    <button
        type="submit"
        className="w-full shadow-lg bg-green-900 hover:bg-green-500 text-slate-300 font-semibold my-1 py-2 px-4 rounded-full"
    >
        Create Adventure
    </button>

</div>
        </form>
    <div >
        <button onClick={()=>navToFullRoute('./adventures')} className="w-full shadow-lg bg-slate-800 hover:cursor-pointer hover:bg-yellow-500 hover:text-slate-800 text-slate-300 font-semibold my-1 py-2 px-4 rounded-full">
            Search For New Adventure
        </button>
    </div>
        </div>
    );
}
