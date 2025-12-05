import React from 'react'
import { LabView } from '../components/LabView'
import { MiniGameContainer } from '../components/MiniGameContainer'

export const LabPage: React.FC = () => {
  return (
    <section>
      <LabView />
      <MiniGameContainer />
    </section>
  )
}
