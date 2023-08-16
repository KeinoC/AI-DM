import React from "react";
import Link from "next/link"; // Import Link from next/link

export default function NavBar() {
    return (
        <div>
            <h4>
                <Link href="/routes/login">Login</Link>
            </h4>
        </div>
    );
}
