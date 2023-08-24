import React from 'react'

import CircleMenu from '../CircleMenu'

import hubData from './HubData'
import './hub.css'

export default function Hub() {

  const linksData = hubData

  return (
    <div className="hub">

        <CircleMenu />

    </div>
  )
}