import React from 'react'
import { useGameState } from '../game/state'

export const LabView: React.FC = () => {
  const { player } = useGameState()
  const lab = player.lab
  return (
    <section className="lab-view">
      <h2>Laboratory</h2>
      <ul>
        <li>Table level: {lab.tableLevel}</li>
        <li>Furnace level: {lab.furnaceLevel}</li>
        <li>Shelves level: {lab.shelvesLevel}</li>
        <li>Lighting level: {lab.lightingLevel}</li>
        <li>Tools level: {lab.toolsLevel}</li>
      </ul>
      <p>Imagine a ruined lab becoming more impressive with each upgrade.</p>
    </section>
  )
}
