'use client';
import React, { useState } from "react";

export default function SortFilter() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("relevance");
    const [keywords, setKeywords] = useState("");
    const [newPlayers, setNewPlayers] = useState(false);
    const [matureContent, setMatureContent] = useState(false);
    const [type, setType] = useState("");
    const [publicAdventure, setPublicAdventure] = useState(false);

    return (
        <div className="bg-slate-800 p-3 flex flex-col md:flex-row items-start md:items-center md:justify-around">
            <h2 className="text-yellow-500 font-bold text-xl mb-4 md:mb-0 md:mr-6">
                Find Adventures to Join
            </h2>

            <div className="flex flex-wrap items-center space-x-6 mb-4 md:mb-0">
                <a href="#" className="text-yellow-500 underline">
                    Advanced Search Options »
                </a>

                <div>
                    <label className="mr-2 text-slate-200 font-semibold">
                        Sort By:
                    </label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 text-slate-800 bg-slate-400 rounded border border-slate-400 focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                    >
                        <option value="relevance">Relevance</option>
                        <option value="date">Date</option>
                    </select>
                </div>

                <div className="mt-4 md:mt-0">
                    <label className="mr-2 text-slate-200 font-semibold">
                        Search:
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. evil, late night"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        className="px-3 py-2 text-slate-800 bg-slate-400 rounded border border-slate-400 focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                    />
                </div>
            </div>

            <div className="flex flex-wrap items-center mt-4 md:mt-0 space-x-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="newPlayers"
                        checked={newPlayers}
                        onChange={() => setNewPlayers(!newPlayers)}
                    />
                    <label htmlFor="newPlayers" className="ml-2 text-slate-200">
                        New Players
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="matureContent"
                        checked={matureContent}
                        onChange={() => setMatureContent(!matureContent)}
                    />
                    <label htmlFor="matureContent" className="ml-2 text-slate-200">
                        18+ Content
                    </label>
                </div>

                <div>
                    <label className="mr-2 text-slate-200 font-semibold">
                        Type:
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="px-3 py-2 text-slate-800 bg-slate-400 rounded border border-slate-400 focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                    >
                        <option value="type1">Type 1</option>
                        <option value="type2">Type 2</option>
                        {/* Add more types if needed */}
                    </select>
                </div>

                <div className="flex items-center ml-4">
                    <input
                        type="checkbox"
                        id="publicAdventure"
                        checked={publicAdventure}
                        onChange={() => setPublicAdventure(!publicAdventure)}
                    />
                    <label htmlFor="publicAdventure" className="ml-2 text-slate-200">
                        Public
                    </label>
                </div>
            </div>
        </div>
    );
}
