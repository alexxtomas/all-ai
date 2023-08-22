'use client'

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export default function CrispChat() {
  useEffect(() => {
    Crisp.configure('fa5f81cb-af6f-44ad-9312-eee779454cca')
  }, [])

  return null
}
