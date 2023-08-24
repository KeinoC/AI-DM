import React from 'react'

import './circle-menu.css'

export default function CircleMenu() {

  let grimoireLinks = [
    {
      id: 1,
      name: "Weapons",
      link: "#",
      img: "https://i.imgur.com/4bcksON.png"
    },
    {
      id: 2,
      name: "Magical Items",
      link: "#",
      img: "https://i.imgur.com/ewaDfo6.png"
    },
    {
      id: 3,
      name: "Armor",
      link: "#",
      img: "https://i.imgur.com/b3piMtY.png"
    },
    {
      id: 4,
      name: "Trinkets",
      link: "#",
      img: "https://i.imgur.com/hOBddrP.png"
    },
    {
      id: 5,
      name: "All Items",
      link: "#",
      img: "https://i.imgur.com/wIqJvSr.png"
    }
  ]
  return (
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

        {grimoireLinks.map((linkObj) => {
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
  )
}