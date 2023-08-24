import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function AdvCharCards() {
    // **** Dummy Characters data should be replaced with characters for this adventure via getCharactersByAdventureId
    const [advChars, setAdvChars] = useState([]);
    const charObjs = [
        {
            id: "char1",
            name: "Connor",
            adventureId: "adv1",
            avatar: "https://s-media-cache-ak0.pinimg.com/736x/71/e0/f3/71e0f341773285379e4a544865ea3528--yuyu-hakusho-hiei.jpg",
        },
        {
            id: "char2",
            name: "Drew",
            adventureId: "adv1",
            avatar: "https://i.redd.it/6qczhmulydh51.png",
        },
        {
            id: "char3",
            name: "Keino",
            adventureId: "adv1",
            avatar: "https://i.pinimg.com/564x/5f/02/51/5f0251e7aaa8f80b8488c6c4c885ed2b.jpg",
        },
    ];

    useEffect(() => {
        setAdvChars(charObjs);
        console.log("character state set to: ", advChars);
    }, []);

    const CharCards = () => {
        return (
            <div className="flex flex-row hover:shadow-md z-20">
                {advChars.map((char) => (
                    <div
                        key={char.id}
                        className="text-center w-25 bg-yellow-500 m-3 p-2 shadow-md rounded-md transform transition-transform duration-300 hover:scale-105"
                    >
                        <h3 className="text-lg text-slate-800 font-semibold mb-2">{char.name}</h3>
                        <img
                            src={char.avatar}
                            alt={char.name}
                            className="w-20 h-20 flex justify-center object-cover rounded-full hover:opacity-80"
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='border-2 border-slate-800 rounded-lg w-auto flex flex-row justify-around shadow-lg bg-slate-900'>
            <CharCards />
        </div>
    );
    }