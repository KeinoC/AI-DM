import React, { useEffect, useState } from "react";
import { ref, onValueChange } from "firebase/database";
import { realtimeDB } from "@/app/firebase/firebase-config";
import { useUser } from "@/app/contexts/UserContext";
import { updateUserStatus } from "@/app/firebase/firebase-online-status";

export default function OnlineStatus() {
    const { setUserStatusArray, userStatusArray } = useUser();

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



    return (
    <div></div>
    );
}
