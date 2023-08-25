"use client";
import React, { useEffect, useState } from "react";
import SortFilter from "./SortFilter";
import { CreateAdventureForm } from "./CreateAdventureForm";
import { useAdventure } from "@/app/contexts/AdventureContext";

export default function TopBar() {
    const { createAdventureMode, setCreateAdventureMode } = useAdventure();

    const toggleTopBarMode = () =>
        setCreateAdventureMode((prevMode) => !prevMode);

    const conditionalRenderButton = () => {
        return (
            <button
                onClick={() => toggleTopBarMode()}
                className="
                m-2
                px-2
                rounded-full
                text-slate-800
                bg-yellow-500
                max-h-1/8
                shadow-xl"
            >
<h1>Create Your Own Adventure</h1>
            </button>
        )
    }

    return (
        <div className="flex flex justify-center row bg-slate-800 w-full">
            {
                createAdventureMode ?
                    null
                    :
                    conditionalRenderButton()
            }

            <div >

            {createAdventureMode ? (
                <div className="w-full">
                    <CreateAdventureForm />
                </div>
            ) : (
                <div>
                    <SortFilter />
                </div>
            )}
            </div>
        </div>
    );
}
