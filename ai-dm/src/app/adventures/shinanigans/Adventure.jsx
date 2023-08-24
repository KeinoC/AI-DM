import SidebarContainer from "./sidebar/SideBarContainer";
import Grid from "@/app/components/Grid";


export default function Adventure() {
    return (
        <div className='flex h-screen'>
            <div className='w-full h-full border-2 m-2 p-2 inline-flex flex-col border-2 border-slate-800 rounded-lg'>
                <h1 className='text-yellow-500 text-8xl '>Game Board Container</h1>
                <Grid />
            </div>
            <div className='flex-end'>

            <SidebarContainer />
            </div>
        </div>
    );
}
