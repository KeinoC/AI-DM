"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-tooltip/dist/react-tooltip.css";
import { navToLogin } from "./utils/helpers/navigation";
import LandingPage from "./components/LandingPage";
// import WaterdeepMap from "./routes/maps/waterdeep/page";
import Hub from "./components/Hub/Hub";
import { useUser } from "./contexts/UserContext";
import RainParticleOverlay from "./components/Weather/rain";
import Chat from "./components/ChatWindow/Chat";




export default function Home() {

    const { currentUser } = useUser();


    return (
        <layout>
            <div>
                {currentUser ?
                <div>
                    <Hub />

                <div className=" fixed left-0 bottom-0 z-50">
                    <Chat className="" roomId={"Global"} />
                </div>

                </div>
                :
                <LandingPage />
                }
            </div>


        </layout>
    );
}