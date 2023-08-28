import React from "react";
import Link from "next/link";
import { addPlayerToAdventure } from "@/app/firebase/firebase-db-adventures";
import { useUser } from "@/app/contexts/UserContext";
import { useAdventure } from "@/app/contexts/AdventureContext";

export const cardDesign =
    "bg-slate-900 border border-transparent border-2 hover:border-yellow-500 hover:border-2 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 max-w-sm mx-2 my-2";

// TODO: Add other functionality to individual chat history and window here.

export function renderChatHistoryWindow(chatHistoryArray) {
    // ******* STATES AND VARIABLES ******* ------------------------->

    const { currentUser } = useUser();
    const { setSelectedAdventure } = useAdventure();

    const chatHistory = () => {
        return chatHistoryArray.map((message) => {
            return (
                <div
                    key={parseInt(message?.timestamp)}
                    className="bg-slate-800 bg-opacity-80 text-slate-white p-1 m-1 h-auto rounded-lg shadow-md flex "
                >
                    <img
                        src={
                            message.profileImage
                                ? message.profileImage
                                : "https://tinyurl.com/aidmprofileimg"
                        }
                        alt="Profile"
                        className="w-5 h-5 rounded-full mr-3"
                    />

                    <div className="flex-1">
                        <div className="flex justify-between">
                            <span className="font-medium text-xs text-slate-400">
                                {message.sender}
                            </span>
                            <span className="text-xs text-slate-400">
                                [{message.timeStamp}]
                            </span>
                        </div>
                        <li className=" list-none mt-1 text-xs text-slate-300 break-words">
                            {message.message}
                        </li>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="z-20 bg-opacity-10  sm:w-[400px] sm:h-[400px] bg-slate-800 p-6 rounded-lg text-salmon flex-end">
            {chatHistory()}
        </div>
    );
}
