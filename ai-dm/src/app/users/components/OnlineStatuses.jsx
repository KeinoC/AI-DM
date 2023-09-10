import React, {useState} from 'react';
import { useUser } from '@/app/contexts/UserContext';
import { getUserByUserId } from '@/app/firebase/firebase-auth';


export function NavBarOnlineStatus() {
    const { userStatusArray } = useUser();
    const count = userStatusArray.length;

    return (
        <div>
            { userStatusArray.length < 1 &&
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





