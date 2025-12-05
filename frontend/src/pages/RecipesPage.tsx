import React from 'react'
import { RecipeList } from '../components/RecipeList'
import { mockRecipes } from '../game/mockData'

export const RecipesPage: React.FC = () => {
  return <RecipeList recipes={mockRecipes} />
}
