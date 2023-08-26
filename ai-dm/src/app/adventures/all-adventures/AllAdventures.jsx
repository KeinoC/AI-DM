'use client'
import React from 'react';
import { useAdventure } from '@/app/contexts/AdventureContext';
import { createAdventureCard } from './AdvCardTemplate';

export default function AllAdventures() {

    const {allAdventures} = useAdventure();

    const RenderAdventureCards = () => allAdventures.map((adventure) => {
        return createAdventureCard(adventure);
    })


    return (
        <div className="flex justify-center">
            <div className="flex flex-wrap gap-7 pt-10 max-w-screen-xl">
                <RenderAdventureCards />
            </div>
        </div>
    );
    
    
    
}