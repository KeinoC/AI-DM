import React, {useState} from 'react';
import { addPlayerToAdventure } from '@/app/firebase/firebase-db-adventures';


export default function AdvCommands() {
    const buttonStyle =
        "button bg-slate-600 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-full";
        const [inviteUsername, setInviteUsername] = useState("")

    const showModal = (modalId) => {
        const modal = document.getElementById(modalId);
        modal && modal.showModal();
    };

    const commandButtons = [
        {
            name: "invite",
            type: "button",
            text: "Invite",
            onClick: () => showModal("invite-modal"),
            modal: (
                <dialog
                    id="invite-modal"
                    className="modal modal-bottom sm:modal-middle h-auto"
                >
                    <form method="dialog" className="modal-box">
                        <p className="py-1 text-slate-500 font-thin ">
                            *ESC to cancel
                        </p>
                        <h3 className="font text-md">Enter username of the user you would like to invite</h3>
                        <label className="form-label">Enter Username: </label>
                        <input onChange={(e)=>setInviteUsername(e.target.value)}></input>
                        <div className="modal-action">
                            <button type="button" className={buttonStyle}>Close</button>
                        </div>
                    </form>
                </dialog>
            ),
        },
    ];

    return (
        <div className="border-2 border-slate-800 rounded-lg w-auto flex flex-row justify-around shadow-lg bg-slate-900 py-1 my-1 w-full">
            {commandButtons.map((button) => (
                <>
                    <button
                        key={button.name}
                        className={buttonStyle}
                        onClick={button.onClick}
                    >
                        {button.text}
                    </button>
                    {button.modal}
                </>
            ))}
        </div>
    );
}
