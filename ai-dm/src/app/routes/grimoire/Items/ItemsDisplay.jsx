import React from 'react';
import { useGrimoire } from '@/app/contexts/GrimoireContext';

export default function ItemsDisplay() {
    const { displayedItems } = useGrimoire();
    console.log(displayedItems);

    return (
        <ul>
            {displayedItems.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
}
