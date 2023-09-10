import React, { useState, useRef, useEffect } from "react";
import HubZoom from "./HubZoom";
import OnlineStatus from "./OnlineStatus";
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

    // const renderOnlineUsers = () => {
    //     return userStatusArray.map((user) => {
    //         const id = user.uid
    //         const fetchUser = () => {
    //             getUserByUserId(id)
    //             .then((fetchedUser) => {
    //                 console.log(fetchedUser)

    //             }
    //             )
    //         }

    //         return (
    //             <div key={user.uid}>
    //                 {/* <p>{user.name}</p> */}
    //                 <p>{user.status}</p>
    //             </div>
    //         );
    //     });
    // };

    useEffect(() => {
        // Your existing logic to populate userStatusArray
        // After that's done, you can fetch all users

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
            <div className="flex flex-row-reverse  w-auto m-2 p-0 bg-slate-800 bg-opacity-60 rounded-full " key={index}>
                <div className="relative h-[5vh] w-[5vh] rounded-full shadow-2xl">
                    <img
                        className="rounded-full h-[5vh]"
                        src={
                            user.profileImage
                                ? user.ProfileImage
                                : "https://tinyurl.com/aidmprofileimg"
                        }
                    />
                    <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-600 shadow-2xl"></div>
                </div>
                <div className="h-[5vh] text-xs text-slate-300 flex flex-col justify-start w-[20vh] pl-5 ">
                <p className="font-medium">{user.username}</p>
                <p className={`${user.status==="online" ? "text-green-500" : "font-thin"}`}>{user.status}</p>
                <p className="font-thin">{timeAgo(user.lastSeen)}</p>
                </div>
            </div>
        ));
    };

    //** Online Status useEffect */
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

                <div className="OnlineUsers fixed right-10 top-[35vh] z-10">
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
