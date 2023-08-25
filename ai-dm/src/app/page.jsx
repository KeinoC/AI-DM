"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-tooltip/dist/react-tooltip.css";
import { navToLogin } from "./utils/helpers/navigation";
import LandingPage from "./components/LandingPage";
import WaterdeepMap from "./routes/maps/waterdeep/page";
import Hub from "./components/Hub/Hub";
import { useUser } from "./contexts/UserContext";
import RainParticleOverlay from "./components/Weather/rain";

export default function Home() {

    const { currentUser } = useUser();

    return (
        <layout>
            <div>
                {!!currentUser ?
                <div>
                    {/* moved Rain to Circle Menu to cover entire component -Drew */}
{/* <RainParticleOverlay />  */}
                    <Hub />
                </div>
                :
                <LandingPage />
                }
            </div>
        </layout>
    );
}