import React, { useState, useRef, useEffect } from "react";
import HubSidebar from "./HubSidebar";
import CircleMenu from "../CircleMenu";
import { useChat } from "@/app/contexts/ChatContext";

export default function Hub() {
    const [zoom, setZoom] = useState(100); // 100% by default
    const hubRef = useRef(null);

    const handleMouseDown = (e) => {
      console.log("MouseDown")
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
          console.log("MouseUp")
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

    const {hubArea, setHubArea} = useChat()


    function handleGlobalHubMeasurement() {
        const zoomRate = zoom / 100
        const clientWidth = hubRef.current?.clientWidth
        const clientHeight = hubRef.current?.clientHeight
        const widthInVw = clientWidth / window.innerWidth * 100 
        const heightInVh = clientHeight / window.innerHeight * 100 *2

        const hubMeasurement = {
            width: widthInVw.toString()+"vw",
            height: heightInVh.toString()+"vh",
        }
        setHubArea(hubMeasurement)
        console.log("HUB measurement: ", hubMeasurement)
        console.log(zoom)
    }

    // console.log(hubMeasurement)

    useEffect(() => {
        handleGlobalHubMeasurement() 
    },[])

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
            {/* <div className="text-center font-bold text-xl mb-4 z-20">
                Smart Tabletop
            </div> */}
            <CircleMenu className="z-10" />
            <HubSidebar
                zoom={zoom}
                handleZoom={handleZoom}
                incrementZoom={incrementZoom}
                decrementZoom={decrementZoom}
                className="z-10"
            />
            <div className="overflow-auto relative" style={{ width: `${hubArea.width}`, height: `${hubArea.height}` }}>
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
