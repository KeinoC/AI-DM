'use client'
import React, {useContext} from "react";
import Link from "next/link"; // Import Link from next/link
import { UserContext, useUser } from "../contexts/UserContext"; // Assuming this file is in the same directory


export default function NavBar() {
    // const { signOut } =  useContext(UserContext);
    const { signOut, currentUser } = useUser();

    return (
        <div>
            { !currentUser ?
            <button>
                <Link href="/routes/login">Login</Link>
            </button>
            :
            <button onClick={()=>signOut()}>
                Sign Out
            </button>
        }
        </div>
    );
}
