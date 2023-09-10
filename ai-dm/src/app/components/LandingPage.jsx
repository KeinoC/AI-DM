"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedLogo.css";
import "react-tooltip/dist/react-tooltip.css";
import { navToLogin } from '../utils/helpers/navigation'

export default function LandingPage() {
    return (
        <motion.div className="homepage flex flex-col max-w-full scroll-snap-align-start h-full min-h-screen items-center bg-gradient-to-r from-gray-900 to-black-900">
            <AnimatePresence>
                <motion.div
                    key="logo"
                    initial={{ opacity: .5, x: "-80vw" }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        opacity: 1,
                        duration: 2,
                        type: "spring",
                        bounce: 0.25,
                    }}
                    exit={{ opacity: 0, x: "-100vw", delay: 0 }} // Delay the exit animation by 2 seconds
                    className="doppelganger max-w-[90vw]"
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
                    initial={{ opacity: .5, x: "80vw" }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        opacity: 1,
                        duration: 2,
                        type: "spring",
                        bounce: 0.25,
                    }}
                    exit={{ opacity: 0, x: "100vw", delay: 0 }}
                >
                    An AI.Table Top Production
                </motion.div>

                <motion.div
                key="button"
                    // className="text-lg text-gray-300 bg-gray-900 hover:bg-yellow-700 "
                    initial={{ opacity: 0, y: 0, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        opacity: { duration: 2.5, delay: 1.5, ease: "easeInOut" },
                        scale: { duration: 2.5, delay: 1.5, ease: "easeInOut" },
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
                        <div className="tooltip w-[120px]">If you dare.. 😈</div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
