'use client'
import Adventure from './Adventure'
import { useState, useEffect } from 'react'
import { getAdventureById } from '@/app/firebase/firebase-db-adventures'
import { useAdventure } from '@/app/contexts/AdventureContext'

export default function GamePage({params}) {
  const {selectedAdventure, setSelectedAdventure} = useAdventure()

  const id = params.id

  useEffect(() => {
    const adventure = async() => {
      const response = await getAdventureById(id)
      setSelectedAdventure(response)
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