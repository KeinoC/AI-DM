import React, { useState, useEffect } from 'react'

import './circle-menu.css'
import hubData from './Hub/HubData'

export default function CircleMenu() {
  return (
    <div className="circle__page">



      {/* Menu 1. Adventures */}
      <div className="circle circle--1">

        <span className="circle__span circle__span--1">
          <span className="circle__span font-circle">Adventures</span>
        </span>
        <div className="circle__wrap">

          {hubData[0].links.map((linkObj) => {
            return (
              <a 
                key={linkObj.id}
                className="circle__link" 
                href={linkObj.link}>
                  <span className="font-circle">{linkObj.name}</span>
              <div>
                <img src={linkObj.img} />
              </div></a>
            )
          })}

        </div>
      </div>

      {/* Menu 2. Grimoire */}

      <div className="circle circle--2">

        <span className="circle__span circle__span--2">
          <span className="circle__span font-circle">Grimoire</span>
        </span>
        <div className="circle__wrap">

          {hubData[1].links.map((linkObj) => {
            return (
              <a 
                key={linkObj.id}
                className="circle__link" 
                href={linkObj.link}>
                  <span className="font-circle">{linkObj.name}</span>
              <div>
                <img className="circle__link-img" src={linkObj.img} />
              </div></a>
            )
          })}

        </div>
      </div>

    </div>
  )
}