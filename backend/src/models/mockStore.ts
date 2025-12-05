import { PlayerState, Quest, Recipe, Upgrade, ReferralMilestone } from './types'

const playerStates: Record<string, PlayerState> = {}

export const mockIngredients = ['herb', 'crystal', 'water', 'fire']

export const mockRecipes: Recipe[] = [
  {
    id: 'spark_potion',
    name: 'Potion of Sparks',
    description: 'Emits harmless sparks.',
    ingredientIds: ['herb', 'crystal'],
    baseRewardPoints: 15,
    rarity: 'COMMON'
  },
  {
    id: 'healing_draft',
    name: 'Healing Draft',
    description: 'Simple healing potion.',
    ingredientIds: ['herb', 'water'],
    baseRewardPoints: 20,
    rarity: 'COMMON'
  }
]

export const mockUpgrades: Upgrade[] = [
  {
    id: 'table_1',
    name: 'Sturdy Table',
    category: 'TABLE',
    description: 'A stable crafting surface.',
    baseCostPoints: 100,
    effectDescription: '+10% potion rewards'
  }
]

export const mockQuests: Quest[] = [
  {
    id: 'daily_brew_3',
    type: 'DAILY',
    title: 'Brew 3 potions',
    description: 'Complete any brewing mini-game 3 times.',
    targetCount: 3,
    currentCount: 0,
    reward: { points: 30, xp: 10 },
    isCompleted: false,
    isClaimed: false
  }
]

export const mockReferralMilestones: ReferralMilestone[] = [
  {
    id: 'ref_3',
    requiredInvites: 3,
    reward: { recipeId: 'spark_potion' }
  }
]

export function getOrCreatePlayerState(userId: string): PlayerState {
  if (!playerStates[userId]) {
    playerStates[userId] = {
      id: userId,
      name: 'Apprentice',
      level: 1,
      xp: 0,
      alchemyPoints: 100,
      premiumCrystals: 0,
      ingredients: { herb: 3, crystal: 2, water: 2 },
      unlockedRecipeIds: ['spark_potion', 'healing_draft'],
      lab: {
        tableLevel: 1,
        furnaceLevel: 1,
        shelvesLevel: 1,
        lightingLevel: 1,
        toolsLevel: 1
      },
      completedQuestIds: [],
      claimedQuestIds: [],
      referralCount: 0,
      unlockedReferralRewardIds: [],
      miniGame: {
        activeType: 'NONE'
      }
    }
  }
  return playerStates[userId]
}

export function savePlayerState(userId: string, state: PlayerState): void {
  playerStates[userId] = state
}
