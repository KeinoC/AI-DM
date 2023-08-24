import AdvCharCards from "./AdvCharCards";
import ChatWindow from "@/app/components/ChatWindow";

export default function SideBarContainer() {
    return (
        <div className='m-2 p-2 inline-flex flex-col border-2 border-slate-800 rounded-lg h-full w-auto '>
 
                <AdvCharCards />
                <ChatWindow />
        </div>
    );
}
