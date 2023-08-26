import React, { useState } from 'react';
import { addPlayerToAdventure } from '@/app/firebase/firebase-db-adventures';

export default function AdvCommands() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [inviteUsername, setInviteUsername] = useState("");

    const showModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await addPlayerToAdventure("BZTLOi63fHB9nYC43T5u", inviteUsername);
            console.log("player successfully added to game");
            setInviteUsername("");
            closeModal();
        } catch (error) {
            console.error("Error adding player to game:", error);
        }
    }

    return (
        <div className="border-2 border-slate-800 rounded-lg w-auto flex flex-row justify-around shadow-lg bg-slate-900 py-1 my-1 w-full">
            <button
                className="button bg-green-800 hover:bg-green-700 hover:scale-105 text-slate-200 transition-all transition-200 py-2 px-4 rounded-full"
                onClick={showModal}
            >
                Invite Player
            </button>

            {isModalOpen && (
                <dialog open className="modal modal-bottom sm:modal-middle h-auto">
                    <form method="dialog" className="modal-box">
                        <p className="py-1 text-slate-500 font-thin">
                            *ESC to cancel
                        </p>
                        <h3 className="font text-md text-slate-300">Enter username of the user you would like to invite</h3>
                        <input placeholder="Enter player's username" className=" absolute bottom-6 mt-2 p-2 text-center rounded-full" onChange={(e) => setInviteUsername(e.target.value.toLowerCase())} />
                        <div className="flex flex-row justify-end p-0 modal-action">
                            <button value={inviteUsername} type="button" onClick={handleSubmit} className="button bg-green-800 hover:bg-green-700 hover:scale-105 text-slate-200 transition-all transition-200 py-2 px-4 rounded-full">
                                Add To Adventure
                            </button>
                            <button type="button" onClick={closeModal} className='text-slate-300 w-10 text-slate-400 rounded-full bg-red-700 bg-opacity-90 hover:bg-red-400 hover:text-slate-600 hover:scale-105 transition-all transition-200'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </form>
                </dialog>
            )}
        </div>
    );
}
