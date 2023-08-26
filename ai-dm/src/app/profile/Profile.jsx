'use client'
import React from 'react';

import Top from './Top';
import Left from './Left';
import Mid from './Mid';
import Right from './right';
import Bottom from './Bottom';

export default function Profile() {
    return (
        <div>
            <Top />
            <div>
                <Left />
                <Mid />
                <Right />
            </div>
            <Bottom />
        </div>
    )
}