import React, { useState } from "react";
import HubSidebar from "./HubSidebar";

export default function Hub() {
    const [zoom, setZoom] = useState(100); // 100% by default

    const handleZoom = (e) => {
        setZoom(e.target.value);
    };

    const incrementZoom = () => {
        setZoom((prevZoom) => Math.min(prevZoom + 10, 200));
    };

    const decrementZoom = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 10, 50));
    };

    const bgStyle = {
        backgroundSize: `${zoom}%`,
        backgroundImage:
            "url('https://inkarnate-api-as-production.s3.amazonaws.com/FAmSMkNscB2pHJJLnPB5So')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    };

    return (
        <div>
            <div className="text-center font-bold text-xl mb-4">
                Smart Tabletop
            </div>

            <HubSidebar
                zoom={zoom}
                handleZoom={handleZoom}
                incrementZoom={incrementZoom}
                decrementZoom={decrementZoom}
            />

            <div className="w-full h-screen relative" style={bgStyle}>
                {/* Your content here */}
            </div>
        </div>
    );
}
