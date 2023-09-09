import React, { useState, useEffect } from "react";
import { useUser } from "@/app/contexts/UserContext";
import { createAdventureCard } from "@/app/adventures/all-adventures/AdvCardTemplate";
import { advCardDesign } from "@/app/adventures/all-adventures/AdvCardTemplate";

export default function Mid() {
    const [activeTab, setActiveTab] = useState("profileInfo");
    const { currentUser, advUserIsIn, advCreatedByUser } = useUser();

    console.log(advUserIsIn, advCreatedByUser);

    const renderContent = () => {
        switch (activeTab) {
            case "profileInfo":
                return <div>Profile Information</div>;
            case "adventuresIn":
                return <div className='flex flex-wrap  gap-7 pt-10 max-w-screen-xl overflow-hidden overflow-y-scroll'>{advUserIsIn.map((adv) => createAdventureCard(adv))}</div>
            case "adventuresCreated":
                return <div className='flex w-full flex-wrap  gap-7 pt-10 max-w-screen-xl overflow-hidden overflow-y-scroll'>{advCreatedByUser.map((adv) => createAdventureCard(adv))}</div>
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <div className={`border-2 h-2/3 my-4 w-full rounded-lg overflow-hidden overflow-y-scroll`}>
            <div className="tabs">
                <a
                    className={`tab tab-lifted ${
                        activeTab === "profileInfo" ? "tab-active" : ""
                    }`}
                    onClick={() => setActiveTab("profileInfo")}
                >
                    Profile Info
                </a>

                <a
                    className={`tab tab-lifted ${
                        activeTab === "adventuresIn" ? "tab-active" : ""
                    }`}
                    onClick={() => setActiveTab("adventuresIn")}
                >
                    Adventures I'm In
                </a>

                <a
                    className={`tab tab-lifted ${
                        activeTab === "adventuresCreated" ? "tab-active" : ""
                    }`}
                    onClick={() => setActiveTab("adventuresCreated")}
                >
                    Adventures I Created
                </a>
            </div>
            <div className="tab-content flex flex-wrap overflow-hidden overflow-y-scroll p-2">{renderContent()}</div>
        </div>
    );
}
