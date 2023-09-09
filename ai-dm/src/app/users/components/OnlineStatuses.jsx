import React, {useState} from 'react';
import { useUser } from '@/app/contexts/UserContext';
import { getUserByUserId } from '@/app/firebase/firebase-auth';


export function NavBarOnlineStatus() {
    const { userStatusArray } = useUser();
    const count = userStatusArray.length;

    // Check if userStatusArray is an array and not empty
    if (!Array.isArray(userStatusArray) || userStatusArray.length === 0) {
        console.error("userStatusArray should be a non-empty array. Received:", userStatusArray);
        return null;
    }

    return (
        <div>
            { 
                userStatusArray.map((user, index) => {
                    console.log(user)
                    return (
                        <div key={index} className={`w-3 h-3 rounded-full`}>
                            <h3>{user.status}({count})</h3>
                        </div>
                    );
                }) 
            }
        </div>
    );
}





