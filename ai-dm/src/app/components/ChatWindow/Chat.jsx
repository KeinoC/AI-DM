// components/Chat.js
import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../../contexts/UserContext";
// import { db } from '../../firebase/firebase-config'
import { db } from "./firebase";
import { limit } from "firebase/firestore";
import { formatShortDateAndTime } from "@/app/utils/helpers/timestamp";


import {
    collection,
    addDoc,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";



const Chat = ({ roomId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");
    const scrollRef = useRef(null);
    const [chatIsOpen, setChatIsOpen] = useState(false);

    // console.log(messages)

    var currentUser = useUser();
    // console.log(currentUser.currentUser.username)


    const toggleMinimize = () => {
        setChatIsOpen(!chatIsOpen);
    }

    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where("roomId", "==", roomId),
            orderBy("createdAt", "desc"),
            limit(10) // limit initial fetch to 10
        );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            // console.log(messages);
            setMessages(messages.reverse());
        });

        return () => unsuscribe();
    }, [roomId]);

    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newMessage === "") return;
        await addDoc(messagesRef, {
            message: newMessage,
            createdAt: serverTimestamp(),
            username: currentUser.currentUser.username,
            profileImage: currentUser.currentUser.profileImage,
            roomId,
        });
        console.log("message sent successfully")
        setNewMessage("");
        setChatIsOpen(true);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className=" w-[400px] h-auto z-20 bg-slate-800 p-5 round-md bg-opacity-60">
            <button
                onClick={toggleMinimize}
                className="bg-purple-700 text-white px-2 py-1 rounded flex flex-end w-full justify-center"
            >
                {chatIsOpen ? "Minimize" : "View Chat History"}
            </button>
            {chatIsOpen && (
                <div
                    ref={scrollRef}
                    className=" flex flex-col z-20 gap-2 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600"
                >
                    <div className="z-20 bg-opacity-10  sm:w-[400px] sm:h-[400px] bg-slate-800 p-6 rounded-lg text-salmon flex-end">
                        {messages.map((message, index) => (
                            <div
                                key={parseInt(index)}
                                className="bg-slate-800 bg-opacity-80 text-slate-white p-1 m-1 h-auto rounded-lg shadow-md flex"
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
                                            {message.username}
                                        </span>
                                    <span className="text-[.6rem] mr-5 font-thin">
                                        {formatShortDateAndTime(message.createdAt) && formatShortDateAndTime(message.createdAt)}
                                    </span>
                                    </div>
                                    <li className=" list-none mt-1 text-xs text-slate-300 break-words">
                                        {message.message}
                                    </li>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex mt-4">
                <input
                    id="smh"
                    name="smh"
                    type="text"
                    onChange={(event) => setNewMessage(event.target.value)}
                    value={newMessage}
                    placeholder="Type a message..."
                    className="flex-grow border-none outline-none rounded-l p-2 bg-slate-900"
                />

                <button className="bg-purple-700 text-white px-4 py-2 rounded-r">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
