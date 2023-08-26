'use client'
import Adventure from '../shenanigans/Adventure'
import { useAdventure } from '@/app/contexts/AdventureContext'

export default function GamePage({params}) {
  const {allAdventures} = useAdventure()
  const id = params.id

  const keyToFind = 'id';
  const valueToFind = id;

  const foundIndex = allAdventures.find(item => item[keyToFind] === valueToFind)
  console.log('found index: ', foundIndex)

  return (
    <div>
      <Adventure foundIndex={foundIndex}/>
    </div>
  )
}