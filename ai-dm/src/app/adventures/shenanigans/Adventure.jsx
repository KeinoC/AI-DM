import SidebarContainer from "./sidebar/SideBarContainer";
import Grid from "../all-adventures/Grid";


export default function Adventure({selectedAdventure}) {
    return (
        <div className='flex h-screen'>
            <div className='w-full h-full m-2 p-2 inline-flex flex-col border-2 border-slate-800 rounded-lg overflow-scroll'>
                <h1 className='text-yellow-500 text-8xl '>{selectedAdventure.name}</h1>
                <Grid selectedMap={""} />
            </div>
            <div className='flex-end'>

            <SidebarContainer selectedAdventure={selectedAdventure}/>
            </div>
        </div>
    );
}
