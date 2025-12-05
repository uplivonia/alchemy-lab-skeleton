export type CurrencyType = 'SOFT' | 'PREMIUM'

export interface Ingredient {
  id: string
  name: string
  description: string
  rarity: 'COMMON' | 'RARE' | 'EPIC'
}

export interface Recipe {
  id: string
  name: string
  description: string
  ingredientIds: string[]
  baseRewardPoints: number
  requiredLabLevel?: number
  rarity: 'COMMON' | 'RARE' | 'EPIC'
}

export type UpgradeCategory = 'TABLE' | 'FURNACE' | 'SHELVES' | 'LIGHTING' | 'TOOLS'

export interface Upgrade {
  id: string
  name: string
  category: UpgradeCategory
  description: string
  baseCostPoints: number
  effectDescription: string
}

export type QuestType = 'DAILY' | 'PROGRESSION' | 'REFERRAL'

export interface QuestReward {
  points?: number
  xp?: number
  ingredientId?: string
  recipeId?: string
}

export interface Quest {
  id: string
  type: QuestType
  title: string
  description: string
  targetCount: number
  currentCount: number
  reward: QuestReward
  isCompleted: boolean
  isClaimed: boolean
}

export interface ReferralMilestone {
  id: string
  requiredInvites: number
  reward: {
    recipeId?: string
    cosmeticId?: string
  }
}

export interface LabState {
  tableLevel: number
  furnaceLevel: number
  shelvesLevel: number
  lightingLevel: number
  toolsLevel: number
}

export type MiniGameType = 'NONE' | 'GRIND' | 'BREW' | 'MIX_ORDER'

export interface MiniGameState {
  activeType: MiniGameType
  activeRecipeId?: string
}

export interface PlayerState {
  id: string
  name: string
  level: number
  xp: number
  alchemyPoints: number
  premiumCrystals: number
  ingredients: Record<string, number>
  unlockedRecipeIds: string[]
  lab: LabState
  completedQuestIds: string[]
  claimedQuestIds: string[]
  referralCount: number
  unlockedReferralRewardIds: string[]
  lastDailyClaim?: string
  miniGame: MiniGameState
}
