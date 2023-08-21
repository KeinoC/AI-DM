import React from 'react';
import { useGrimoire } from '@/app/contexts/GrimoireContext';
import { useDNDApi } from '@/app/contexts/DNDApiContext';

export default function ItemsDisplay() {
    const { displayedItems } = useGrimoire();
    const { apiItems } = useDNDApi();

    return (
        <ul>
            {displayedItems.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
}
