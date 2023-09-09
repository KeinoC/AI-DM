import React from 'react';
import { useUser } from '@/app/contexts/UserContext';

export function renderProfileSummary(user) {

    if (user) {
        const username = user.username
        const email = user.email
        const profileImage = user.profileImage
    
        return (
            <div className="flex flex-col items-center justify-center">
                <h3>Profile Summary</h3>
                <img src={profileImage} alt="profile image" className="h-40 w-40 rounded-full" />
                <h3>{username}</h3>
            </div>
        )

    }

}