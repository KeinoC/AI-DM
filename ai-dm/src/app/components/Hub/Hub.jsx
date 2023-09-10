import React, { useState, useRef, useEffect } from "react";
import HubZoom from "./HubZoom";
import OnlineStatus from "./OnlineStatus"; // i had the status bubbles built here but was getting error so i built it in Hub, it should work because HubZoom works just fine
import ProfilePreviewModal from "./ProfilePreviewModal";
import CircleMenu from "../CircleMenu";
import { useChat } from "@/app/contexts/ChatContext";
import { useUser } from "@/app/contexts/UserContext";
import { ref, onValue } from "firebase/database";
import { updateUserStatus } from "@/app/firebase/firebase-online-status";
import { realtimeDB } from "@/app/firebase/firebase-config";
import { getUserByUserId } from "@/app/firebase/firebase-auth";
import { timeAgo } from "@/app/utils/helpers/timestamp";

export default function Hub() {
    const { setUserStatusArray, userStatusArray } = useUser();
    const [combinedUsers, setCombinedUsers] = useState([]);

    // pardon this junk, just a self reminder to track online status better.
    // import { getDatabase, ref, onValue, push, onDisconnect, set, serverTimestamp } from "firebase/database";
    // Since I can connect from multiple devices or browser tabs, we store each connection instance separately
    // any time that connectionsRef's value is null (i.e. has no children) I am offline
    // const db = getDatabase();
    // const myConnectionsRef = ref(db, 'users/joe/connections');

    // // stores the timestamp of my last disconnect (the last time I was seen online)
    // const lastOnlineRef = ref(db, 'users/joe/lastOnline');

    // const connectedRef = ref(db, '.info/connected');
    // onValue(connectedRef, (snap) => {
    //   if (snap.val() === true) {
    //     // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
    //     const con = push(myConnectionsRef);

    //     // When I disconnect, remove this device
    //     onDisconnect(con).remove();

    //     // Add this device to my connections list
    //     // this value could contain info about the device or a timestamp too
    //     set(con, true);

    //     // When I disconnect, update the last time I was seen online
    //     onDisconnect(lastOnlineRef).set(serverTimestamp());
    //   }
    // });

    //** Online Status useEffect */

    useEffect(() => {
        const fetchAllUsers = async () => {
            const allFetchedUsers = await Promise.all(
                userStatusArray.map((user) => getUserByUserId(user.uid))
            );
            const combinedUserArray = userStatusArray.map(
                (userStatus, index) => ({
                    username: allFetchedUsers[index].username, // Or whatever the field is
                    status: userStatus.status,
                    lastSeen: userStatus.lastSeen,
                })
            );

            setCombinedUsers(combinedUserArray);
        };

        fetchAllUsers();
    }, [userStatusArray]);

    const renderOnlineUsers = () => {
        return combinedUsers.map((user, index) => (
            <div className="group flex flex-row-reverse ">
                <div
                    className="statusBubble flex flex-row-reverse  w-auto m-2 p-0 bg-slate-800 bg-opacity-60 rounded-full hover:bg-opacity-80 transition-bg-opacity duration-[1s] ease-out cursor-pointer trace-border "
                    key={index}
                >
                    <div className="relative h-[7vh] w-[7vh] rounded-full shadow-2xl">
                        <img
                            className="rounded-full h-[7vh]"
                            src={
                                user.profileImage
                                    ? user.ProfileImage
                                    : "https://tinyurl.com/aidmprofileimg"
                            }
                        />
                        <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-600 shadow-2xl"></div>
                    </div>
                    <div className="h-[7vh] text-xs text-slate-300 flex flex-col justify-center w-[20vh] pl-5 overflow-hidden ">
                        <p className="font-medium">{user.username}</p>
                        <p
                            className={`${
                                user.status === "online"
                                    ? "text-green-500"
                                    : "font-thin"
                            }`}
                        >
                            {user.status}
                        </p>
                        <p className="font-thin">{timeAgo(user.lastSeen)}</p>
                    </div>
                </div>
                <div className="buttonsContainer opacity-0 group-hover:opacity-100 transition-all duration-300 h-[7vh] text-slate-200 justify-between m-2">
                    <button className="h-full w-[7vh] shadow-sm rounded-2xl bg-purple-700 text-xs mx-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-12 transition-all duration-500 ease-in-out delay-200">
                        Preview Profile
                    </button>
                    <button className="h-full w-[7vh] shadow-sm rounded-2xl bg-purple-700 text-xs mx-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-12 transition-all duration-600 ease-in-out delay-300">
                        View Full Profile
                    </button>
                    <button className="h-full w-[7vh] shadow-sm rounded-2xl bg-purple-700 text-xs mx-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-12 transition-all duration-700 ease-in-out delay-400">
                        Send Message
                    </button>
                </div>
            </div>
        ));
    };

    useEffect(() => {
        const userStatusDatabaseRef = ref(realtimeDB, "users/status");

        // Setup a listener for any changes on /users/status path
        const userStatusListener = onValue(
            userStatusDatabaseRef,
            (snapshot) => {
                const value = snapshot.val();
                const updatedUserStatusArray = [];
                // console.log(value)

                for (const uid in value) {
                    if (value.hasOwnProperty(uid)) {
                        // console.log(uid)
                        const userData = value[uid];
                        updatedUserStatusArray.push({
                            uid,
                            ...userData,
                        });
                    }
                }
                console.log(updatedUserStatusArray);

                setUserStatusArray(updatedUserStatusArray);
            }
        );

        return () => {
            // Detach the listener when the component is unmounted
            userStatusListener();
        };
    }, []);

    //** map zoom logic */
    const [zoom, setZoom] = useState(100); // 100% by default
    const hubRef = useRef(null);

    const handleMouseDown = (e) => {
        console.log("MouseDown");
        const pos = {
            left: hubRef.current.scrollLeft,
            top: hubRef.current.scrollTop,
            x: e.clientX,
            y: e.clientY,
        };

        const handleMouseMove = (e) => {
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;
            hubRef.current.scrollTop = pos.top - dy;
            hubRef.current.scrollLeft = pos.left - dx;
        };

        const handleMouseUp = () => {
            console.log("MouseUp");
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    // zoom logic
    const handleZoom = (e) => {
        setZoom(e.target.value);
    };

    const incrementZoom = () => {
        setZoom((prevZoom) => Math.min(prevZoom + 5));
    };

    const decrementZoom = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 5));
    };

    const { hubArea, setHubArea } = useChat();

    function handleGlobalHubMeasurement() {
        const zoomRate = zoom / 100;
        const clientWidth = hubRef.current?.clientWidth;
        const clientHeight = hubRef.current?.clientHeight;
        const widthInVw = (clientWidth / window.innerWidth) * 100;
        const heightInVh = (clientHeight / window.innerHeight) * 100 * 2;

        const hubMeasurement = {
            width: widthInVw.toString() + "vw",
            height: heightInVh.toString() + "vh",
        };
        setHubArea(hubMeasurement);
        console.log("HUB measurement: ", hubMeasurement);
        console.log(zoom);
    }

    // console.log(hubMeasurement)

    useEffect(() => {
        handleGlobalHubMeasurement();
    }, []);

    const bgStyle = {
        backgroundSize: `${zoom}%`,
        backgroundImage:
            "url('https://inkarnate-api-as-production.s3.amazonaws.com/FAmSMkNscB2pHJJLnPB5So')",
        backgroundRepeat: "no-repeat",
        width: `${hubArea.width}`, // Extend the width and height to allow panning
        height: `${hubArea.height}`,
        // minWidth: "100vw",
    };

    return (
        <div>
            <CircleMenu className="z-10" />
            <div className="HUB-SIDEBAR-CONTAINER">
                <HubZoom
                    zoom={zoom}
                    handleZoom={handleZoom}
                    incrementZoom={incrementZoom}
                    decrementZoom={decrementZoom}
                    className="z-10"
                />

                <div className="OnlineUsers max-h-[30vh] fixed right-10 top-[25vh] z-10 overflow-y-scroll">
                    {renderOnlineUsers()}
                </div>
            </div>
            <div
                className="overflow-auto relative"
                style={{
                    width: `${hubArea.width}`,
                    height: `${hubArea.height}`,
                }}
            >
                <div
                    ref={hubRef}
                    // onMouseDown={handleMouseDown}
                    className="w-screen h-screen z-50"
                    style={bgStyle}
                >
                    {/* Your content here */}
                </div>
            </div>
        </div>
    );
}
