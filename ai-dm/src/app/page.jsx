"use client";
import React from "react";
import NavBar from "./components/NavBar";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import "./AnimatedLogo.css";
import "react-tooltip/dist/react-tooltip.css";
import { navToLogin } from "./utils/helpers/navigation";

function AnimatedLogo() {
    return (
        <motion.div className="homepage scroll-snap-align-start h-full min-h-screen  items-center justify-center bg-gradient-to-r from-gray-900 to-black-900">
            <AnimatePresence>
                <motion.div
                key="logo"
                    initial={{ opacity: 0, x: "-100vw" }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        opacity: 1,
                        duration: 2.5,
                        type: "spring",
                        bounce: 0.25,
                    }}
                    exit={{ opacity: 0, x: "-100vw", delay: 0 }} // Delay the exit animation by 2 seconds
                    className="doppelganger"
                >
                    <span className="letters">A</span>
                    <span className="letters">I</span>
                    <span className="letters"> </span>
                    <span className="letters">D</span>
                    <span className="letters">&</span>
                    <span className="letters">D</span>
                </motion.div>
            </AnimatePresence>
            <AnimatePresence>
                <motion.div
                key="tag"
                    className="tag"
                    initial={{ opacity: 0, x: "100vw" }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        opacity: 1,
                        duration: 2.5,
                        type: "spring",
                        bounce: 0.25,
                    }}
                    exit={{ opacity: 0, x: "100vw", delay: 0 }}
                >
                    A Big DCK Energy Production
                </motion.div>

                <motion.div
                key="button"
                    // className="text-lg text-gray-300 bg-gray-900 hover:bg-yellow-700 "
                    initial={{ opacity: 0, y: 0, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        opacity: { duration: 3, delay: 2, ease: "easeInOut" },
                        scale: { duration: 3, delay: 2, ease: "easeInOut" },
                    }}
                    exit={{ opacity: 0, y: "100vh", delay: 0 }}
                >
                    <div className="relative">
                        <button
                            onClick={() => navToLogin()}
                            className="text-lg text-gray-300 bg-gray-900 hover:bg-yellow-700 transition duration-300 ease-in py-2 px-4 rounded"
                        >
                            ENTER
                        </button>
                        <div className="tooltip">If you dare.. 😈</div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

export default function Home() {
    return (
        <layout>
            <div>
                {/* <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1 className="text-4xl font-bold text-center"> Welcome to our AI D&D Project</h1>
                </div> */}
                <AnimatedLogo />
            </div>
        </layout>
    );
}
