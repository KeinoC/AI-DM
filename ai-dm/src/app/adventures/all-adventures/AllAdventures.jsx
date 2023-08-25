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
        <div>
            <RenderAdventureCards />
        </div>
    );
}