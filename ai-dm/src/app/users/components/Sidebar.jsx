import React from 'react';
import { CenterTW } from './profile.utils';
import { FaHome, FaMap, FaBook } from 'react-icons/fa';  // Import new icons

export default function Sidebar() {

    const sidebarIcons = [
        {
            name: "Home",
            icon: FaHome,
            link: "/",
        },
        {
            name: "Adventures",
            icon: FaMap,
            link: "/adventures",
        },
        {
            name: "Grimoire",
            icon: FaBook,
            link: "/routes/grimoire",
        },
    ];

    const sideBarStyle = "left-0 flex flex-col flex-start border-2 m-2 rounded-lg h-[87.5vh]";

    return (
        <div className={`${sideBarStyle} p-2`}>
            {sidebarIcons.map((icon, index) => {  // Added index as key
                const { name, icon: Icon, link } = icon;
                return (
                    <div key={index} className="flex flex-col items-center justify-center w-full h-16">
                        <a href={link}>
                            <Icon className="text-2xl text-slate-300" />
                        </a>
                        <span className="text-xs text-slate-300">{name}</span>
                    </div>
                );
            })}
        </div>
    );
}
