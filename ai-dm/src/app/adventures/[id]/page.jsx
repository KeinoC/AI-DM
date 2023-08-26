'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Adventure from '../shenanigans/Adventure'
// import { adventureContext } from '@/app/contexts/AdventureContext'

// const { allAdventures, setAllAdventures } = useContext(adventureContext)

// export const getStaticPaths = async () => {
//   // const response = await fetch('')
//   // const data = await res.json()
 
  
//   console.log('testing dynamic routes', allAdventures)
// }

export default function GamePage() {
  // const router = useRouter()
  // const adventureId = router.query.id
  return (
    <div>
      {/* {adventureId} */}
      <Adventure />
    </div>
  )
}