import React, {useState, useEffect} from 'react';
import { useUser } from '@/app/contexts/UserContext';
import { useAdventure } from '@/app/contexts/AdventureContext';
import { useParams } from 'next/navigation';
import Draggable from 'react-draggable';
import { getAdventureById } from '@/app/firebase/firebase-db-adventures';
import { getRealtimeAdventure, updateRealtimeAdventure } from '@/app/firebase/firebase-db-adventures';

export default function GridV2() {


const params = useParams()
const adventureId = params.id
const [ adventure, setAdventure ] = useState({})

useEffect(() => {
    try {
        console.log(adventureId)
        const refreshGame = async () => {
            const adventure = await getRealtimeAdventure(adventureId)
            setAdventure(adventure)
            updateRealtimeAdventure(adventureId, adventure)
        }
        refreshGame()
    } catch(e) {
        console.error(e)
    }
},[])






    return (
        <div className='border rounded-md h-full w-full'>Grid v2
        <Draggable>
            <div>
            <img></img>
            </div>
        </Draggable>
        </div>
    )
}
