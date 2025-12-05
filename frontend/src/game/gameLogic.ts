import { PlayerState, Recipe } from './types'
import { mockRecipes } from './mockData'


export function gainXp(player: PlayerState, xp: number): PlayerState {
  const nextXp = player.xp + xp
  // Simple level curve: 100 XP per level
  const levelUps = Math.floor(nextXp / 100) - Math.floor(player.xp / 100)
  return {
    ...player,
    xp: nextXp,
    level: player.level + Math.max(0, levelUps)
  }
}

export function grantAlchemyPoints(player: PlayerState, amount: number): PlayerState {
  return { ...player, alchemyPoints: player.alchemyPoints + amount }
}

export function spendAlchemyPoints(player: PlayerState, amount: number): PlayerState {
  if (player.alchemyPoints < amount) return player
  return { ...player, alchemyPoints: player.alchemyPoints - amount }
}

export function addIngredient(player: PlayerState, ingredientId: string, amount: number): PlayerState {
  const current = player.ingredients[ingredientId] ?? 0
  return {
    ...player,
    ingredients: {
      ...player.ingredients,
      [ingredientId]: current + amount
    }
  }
}

export function consumeIngredientsForRecipe(player: PlayerState, recipe: Recipe): PlayerState {
  const newIngredients = { ...player.ingredients }
  for (const id of recipe.ingredientIds) {
    newIngredients[id] = Math.max(0, (newIngredients[id] ?? 0) - 1)
  }
  return { ...player, ingredients: newIngredients }
}

export function getRecipeById(id: string): Recipe | undefined {
  return mockRecipes.find(r => r.id === id)
}

export function canClaimDailyReward(player: PlayerState, now: Date = new Date()): boolean {
    if (!player.lastDailyClaim) return true
    const last = new Date(player.lastDailyClaim)
    // если даты отличаются по календарю — можно снова забирать
    return last.toDateString() !== now.toDateString()
}

export function applyDailyReward(player: PlayerState, now: Date = new Date()): PlayerState {
    if (!canClaimDailyReward(player, now)) return player

    let next: PlayerState = { ...player }

    // простая награда: +25 AP, +10 XP
    next = {
        ...next,
        alchemyPoints: next.alchemyPoints + 25
    }
    // используем уже готовую gainXp, если она экспортируется сверху
    // но чтобы не городить зависимость, можно просто:
    next.xp += 10

    next.lastDailyClaim = now.toISOString()
    return next
}