import React from 'react'

import CircleMenu from '../CircleMenu'

import hubData from './HubData'

export default function Hub() {

  const linksData = hubData

  return (
    <>

      {linksData.map((linkObj) => {
        return(
          <div 
            key={linkObj.id}
            className="hub__link-box"
            >
              <CircleMenu linksData={linksData[linkObj.id]}/>
          </div>
        )
      })}


    </>
  )
}