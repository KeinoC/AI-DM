'use client'
import AdvCharCards from "./AdvCharCards";
import AdvCommands from "./AdvCommands";
import Chat from "@/app/components/ChatWindow/Chat";

// import AdvChatComponent from "../../[id]/components/sidebar-components/AdvChatComponent";

export default function SideBarContainer({selectedAdventure}) {
    const roomId = selectedAdventure.id.toString()
    console.log(roomId)

    return (
        <div className='m-2 p-2 inline-flex flex-col border-2 border-slate-800 rounded-lg h-full w-auto '>
                {/* Characters/Players presen in Game */}
                {/* roll20 uses a Player Profile with game-specific nickname input */}
                {/* <AdvCharCards /> */}
                <AdvCommands />
                {/* <AdvChatComponent /> */}
                {/* {console.log('testing for Game ID in SideBarContainer', )} */}
                {(roomId !== undefined) &&
                    <Chat roomId={roomId} />
                }
        </div>
    );
}