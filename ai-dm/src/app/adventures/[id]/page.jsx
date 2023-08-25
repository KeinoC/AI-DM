'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Adventure from '../shenanigans/Adventure'

export default function GamePage() {
  const router = useRouter()
  const adventureId = router.query.id
  return (
    <div>
      {adventureId}
      <Adventure />
    </div>
  )
}