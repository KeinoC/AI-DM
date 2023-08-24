import React, { useState, useEffect } from 'react'

import './circle-menu.css'
import hubData from './Hub/HubData'

export default function CircleMenu() {
  return (
    <div className="circle__page">

      {/* Menu 1. Adventures */}
      <div className="circle">

        <span className="circle__span">
          <span className="circle__span">Adventures</span>
        </span>
        <div className="circle__wrap">
          {/* 

            Link Order
            1. Top Left
            2. Top Right
            3. Bottom Left
            4. Bottom Right
            5. Center 

            Images used should be perfect square shape for best result

          */}

          {hubData[0].links.map((linkObj) => {
            return (
              <a 
                key={linkObj.id}
                className="circle__link" 
                href={linkObj.link}>
              <div>
                <img src={linkObj.img} />
              </div></a>
            )
          })}

        </div>

        

      </div>

      {/* Menu 2. Grimoire */}

      <div className="circle">

        <span className="circle__span">
          <span className="circle__span">Grimoire</span>
        </span>
        <div className="circle__wrap">
          {/* 

            Link Order
            1. Top Left
            2. Top Right
            3. Bottom Left
            4. Bottom Right
            5. Center 

            Images used should be perfect square shape for best result

          */}

          {hubData[1].links.map((linkObj) => {
            return (
              <a 
                key={linkObj.id}
                className="circle__link" 
                href={linkObj.link}>
              <div>
                <img src={linkObj.img} />
              </div></a>
            )
          })}

        </div>



        </div>
    </div>
  )
}