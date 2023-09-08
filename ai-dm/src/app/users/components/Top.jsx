import React from 'react';
import { topContainerStyle } from './profile.utils';
import { useUser } from '@/app/contexts/UserContext';


export default function Top() {

    // ** STATES and VARS -------------------------------->

    const { selectedUser, currentUser, setSelectedUser } = useUser();

    const userId = selectedUser?.id || "--"
    const username = selectedUser?.username || "--"

    // ** Styles -------------------------------->
    const paneStyle = "h-full border-2 item-center w-1/5 m-2 rounded-lg p-2 justify-center flex "

    return (
        <div className={`${topContainerStyle} p-2 `}>
            <div className={paneStyle}> Pane1 </div>
            <div className={paneStyle}> Pane2 </div>
            <div className={paneStyle}> Pane3 </div>
        </div>
    )
}