import React from 'react'
import { useGameState } from '../game/state'
import { Recipe } from '../game/types'

interface Props {
  recipes: Recipe[]
}

export const RecipeList: React.FC<Props> = ({ recipes }) => {
  const { player, startMiniGameForRecipe } = useGameState()

  const handleCraft = (recipeId: string) => {
    startMiniGameForRecipe(recipeId)
  }

  return (
    <section>
      <h2>Recipes</h2>
      <ul className="list">
        {recipes.map(r => (
          <li key={r.id} className="card">
            <h3>{r.name}</h3>
            <p>{r.description}</p>
            <p>Rarity: {r.rarity}</p>
            <p>Ingredients: {r.ingredientIds.join(', ')}</p>
            <button onClick={() => handleCraft(r.id)}>Craft</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
