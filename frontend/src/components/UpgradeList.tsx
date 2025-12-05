import React from 'react'
import { useGameState } from '../game/state'
import { Upgrade } from '../game/types'

interface Props {
  upgrades: Upgrade[]
}

export const UpgradeList: React.FC<Props> = ({ upgrades }) => {
  const { player, upgradeStation } = useGameState()

  const handleUpgrade = (id: string, cost: number) => {
    if (player.alchemyPoints < cost) return
    upgradeStation(id)
  }

  return (
    <section>
      <h2>Upgrades</h2>
      <ul className="list">
        {upgrades.map(u => (
          <li key={u.id} className="card">
            <h3>{u.name}</h3>
            <p>{u.description}</p>
            <p>Effect: {u.effectDescription}</p>
            <p>Cost: {u.baseCostPoints}</p>
            <button
              onClick={() => handleUpgrade(u.id, u.baseCostPoints)}
              disabled={player.alchemyPoints < u.baseCostPoints}
            >
              Upgrade
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
