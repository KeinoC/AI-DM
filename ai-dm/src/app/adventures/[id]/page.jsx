'use client'
import Adventure from '../shenanigans/Adventure'
import { useState, useEffect } from 'react'
import { getAdventureById } from '@/app/firebase/firebase-db-adventures'

export default function GamePage({params}) {
  const [selectedAdventure, setSelectedAdventure] = useState({})

  const id = params.id
  
  useEffect(() => {

    const adventure = async() => {
      const response = await getAdventureById(id)

      setSelectedAdventure(response)
      console.log('response ', response)
    }

    adventure()

    window.scrollTo({top: 0, left: 0})
  }, [])

  return (
    <div>
      {selectedAdventure?.name && <>
        <Adventure selectedAdventure={selectedAdventure}/></>}
    </div>
  )
}