'use client'
import AdvCharCards from "./AdvCharCards";
import ChatWindow from "@/app/components/ChatWindow";
import AdvCommands from "./AdvCommands";

export default function SideBarContainer({selectedAdventure}) {
    return (
        <div className='m-2 p-2 inline-flex flex-col border-2 border-slate-800 rounded-lg h-full w-auto '>
                {/* Characters/Players presen in Game */}
                {/* roll20 uses a Player Profile with game-specific nickname input */}
                <AdvCharCards />
                <AdvCommands />

                {/* {console.log('testing for Game ID in SideBarContainer', )} */}
                <ChatWindow roomId={String(selectedAdventure.id.toString())} />
        </div>
    );
}