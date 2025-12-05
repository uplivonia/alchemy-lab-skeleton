import React from 'react'
import { useGameState } from '../game/state'

export const HudBar: React.FC = () => {
  const { player } = useGameState()
  return (
    <div className="hud-bar">
      <span>{player.name}</span>
      <span>Lv. {player.level}</span>
      <span>AP: {player.alchemyPoints}</span>
      <span>XP: {player.xp}</span>
    </div>
  )
}
