'use client'
import React, {useContext} from "react";
import Link from "next/link"; // Import Link from next/link
import { UserContext, useUser } from "../contexts/UserContext"; // Assuming this file is in the same directory
import { signOut } from "../firebase/firebase-auth";

export default function NavBar() {
    // const { signOut } =  useContext(UserContext);
    const { currentUser } = useUser();

    return (
    <div className="navbar bg-base-300">

        <div className="flex-1">
            <a href="/" className="btn btn-ghost normal-case text-xl">AI D&D</a>
        </div>


        { !currentUser &&
            <button>
                <Link href="/routes/login">Login</Link>
            </button>
        }

        { currentUser &&
        <div className="dropdown dropdown-end">

            <div className=" flex gap-2 items-center">
                <h2>{currentUser.username}</h2>
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src="/Default_Profile_Picture.jpeg" />
                    </div>
                </label>
            </div>
 

            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

              <li>
                <button onClick={()=>signOut()}>
                    Sign Out
                </button>
              </li>

            </ul>
        </div>
        }
    </div>
    );
}


// <div>
// { !currentUser ?
// <button>
//     <Link href="/routes/login">Login</Link>
// </button>
// :
// <>
// <button onClick={()=>signOut()}>
//     Sign Out
// </button>
// <h2>Hello {currentUser.username}</h2>
// </>
// }
// </div>