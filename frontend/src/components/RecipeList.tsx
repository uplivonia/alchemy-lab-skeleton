import React from 'react'
import { useGameState } from '../game/state'
import { Recipe } from '../game/types'
import { mockIngredients } from '../game/mockData'

interface Props {
    recipes: Recipe[]
}

export const RecipeList: React.FC<Props> = ({ recipes }) => {
    const { startMiniGameForRecipe, player } = useGameState()

    const ingredientById = Object.fromEntries(
        mockIngredients.map(i => [i.id, i])
    )

    return (
        <section>
            <h2>Grimoire</h2>
            <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                All known potions in your spellbook. Choose one to brew it in the Cauldron Room.
            </p>
            <ul className="list">
                {recipes.map(recipe => {
                    const isLockedByLab =
                        recipe.requiredLabLevel !== undefined &&
                        player.lab.tableLevel < recipe.requiredLabLevel

                    return (
                        <li key={recipe.id} className="card">
                            <h3>
                                {recipe.name}
                                <span className={`badge rarity-${recipe.rarity.toLowerCase()}`}>
                                    {recipe.rarity}
                                </span>
                            </h3>

                            <p>{recipe.description}</p>

                            {recipe.requiredLabLevel !== undefined && (
                                <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                                    Requires cauldron level {recipe.requiredLabLevel}
                                </p>
                            )}

                            <p style={{ fontSize: '0.8rem' }}>
                                Ingredients{' '}
                                {recipe.ingredientIds
                                    .map(id => ingredientById[id]?.name || id)
                                    .join(', ')}
                            </p>

                            <p style={{ fontSize: '0.8rem' }}>
                                Base reward: {recipe.baseRewardPoints} AP
                            </p>

                            <button
                                disabled={isLockedByLab}
                                onClick={() => startMiniGameForRecipe(recipe.id)}
                            >
                                {isLockedByLab ? 'Locked' : 'Brew for customer'}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

