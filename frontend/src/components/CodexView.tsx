import React from 'react'
import { useGameState } from '../game/state'
import { mockRecipes, mockIngredients } from '../game/mockData'

export const CodexView: React.FC = () => {
  const { player } = useGameState()
  return (
    <section>
      <h2>Codex</h2>
      <h3>Unlocked recipes</h3>
      <ul className="list">
        {mockRecipes
          .filter(r => player.unlockedRecipeIds.includes(r.id))
          .map(r => (
            <li key={r.id} className="card">
              <h4>{r.name}</h4>
              <p>{r.description}</p>
            </li>
          ))}
      </ul>
      <h3>Ingredients</h3>
      <ul className="list">
        {mockIngredients.map(i => (
          <li key={i.id} className="card">
            <h4>{i.name}</h4>
            <p>{i.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
