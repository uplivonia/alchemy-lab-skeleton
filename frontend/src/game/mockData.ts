import { Ingredient, Recipe, Upgrade, Quest, ReferralMilestone, PlayerState } from './types'

export const mockIngredients: Ingredient[] = [
    { id: 'herb', name: 'Herb', description: 'A basic healing herb.', rarity: 'COMMON' },
    { id: 'crystal', name: 'Crystal Dust', description: 'Sparkling arcane dust.', rarity: 'COMMON' },
    { id: 'water', name: 'Pure Water', description: 'Crystal clear spring water.', rarity: 'COMMON' },
    { id: 'fire', name: 'Fire Essence', description: 'Liquid flame in a vial.', rarity: 'RARE' },
    { id: 'shadow', name: 'Shadow Bloom', description: 'A flower that blooms in darkness.', rarity: 'RARE' },
    { id: 'ether', name: 'Ether Drop', description: 'A drop of pure magic.', rarity: 'EPIC' }
]

export const mockRecipes: Recipe[] = [
    {
        id: 'spark_potion',
        name: 'Potion of Sparks',
        description: 'Emits harmless sparks. Mostly for show.',
        ingredientIds: ['herb', 'crystal'],
        baseRewardPoints: 15,
        rarity: 'COMMON'
    },
    {
        id: 'healing_draft',
        name: 'Healing Draft',
        description: 'Simple healing potion for beginners.',
        ingredientIds: ['herb', 'water'],
        baseRewardPoints: 20,
        rarity: 'COMMON'
    },
    {
        id: 'ember_elixir',
        name: 'Ember Elixir',
        description: 'Warmth in a bottle.',
        ingredientIds: ['fire', 'water'],
        baseRewardPoints: 30,
        requiredLabLevel: 2,
        rarity: 'RARE'
    },
    {
        id: 'shadow_tonic',
        name: 'Shadow Tonic',
        description: 'Helps you blend into the dark.',
        ingredientIds: ['shadow', 'water'],
        baseRewardPoints: 35,
        requiredLabLevel: 3,
        rarity: 'RARE'
    },
    {
        id: 'philosopher_spark',
        name: "Philosopher's Spark",
        description: 'Not quite a stone, but a start.',
        ingredientIds: ['ether', 'fire', 'crystal'],
        baseRewardPoints: 60,
        requiredLabLevel: 4,
        rarity: 'EPIC'
    }
]

export const mockUpgrades: Upgrade[] = [
    {
        id: 'table_1',
        name: 'Sturdy Table',
        category: 'TABLE',
        description: 'A table that does not collapse.',
        baseCostPoints: 100,
        effectDescription: '+10% potion rewards'
    },
    {
        id: 'furnace_1',
        name: 'Iron Furnace',
        category: 'FURNACE',
        description: 'A better furnace for stable heating.',
        baseCostPoints: 120,
        effectDescription: 'Unlocks advanced brewing mini-games'
    },
    {
        id: 'shelves_1',
        name: 'Organized Shelves',
        category: 'SHELVES',
        description: 'You can finally find ingredients.',
        baseCostPoints: 80,
        effectDescription: '+1 ingredient storage slot'
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
    },
    {
        id: 'progress_lab_2',
        type: 'PROGRESSION',
        title: 'Upgrade your lab',
        description: 'Reach lab table level 2.',
        targetCount: 1,
        currentCount: 0,
        reward: { points: 50, xp: 20 },
        isCompleted: false,
        isClaimed: false
    }
]

export const mockReferralMilestones: ReferralMilestone[] = [
    {
        id: 'ref_3',
        requiredInvites: 3,
        reward: { recipeId: 'ember_elixir' }
    },
    {
        id: 'ref_10',
        requiredInvites: 10,
        reward: { cosmeticId: 'golden_lab_theme' }
    }
]

export const defaultPlayerState: PlayerState = {
    id: 'demo',
    name: 'Apprentice',
    level: 1,
    xp: 0,
    alchemyPoints: 100,
    premiumCrystals: 0,
    ingredients: { herb: 5, crystal: 3, water: 4, fire: 1 },
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
