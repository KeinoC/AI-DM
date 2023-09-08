import React from "react";
import { CenterTW } from "./profile.utils";

export default function Mid() {
    return (
        <div className={`${CenterTW} border-2 h-2/3 my-4 rounded-lg`}>
            <div className="tabs">
                <a className="tab tab-lifted">Tab 1</a>
                <a className="tab tab-lifted tab-active">Tab 2</a>
                <a className="tab tab-lifted">Tab 3</a>
            </div>
        </div>
    );
}
