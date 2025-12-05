import type { PlayerState, Recipe, Upgrade, Quest } from '../game/types'

const BASE_URL = 'http://localhost:4000'

export async function getInitialState(userId: string): Promise<PlayerState> {
  const res = await fetch(`${BASE_URL}/api/game/state/${userId}`)
  if (!res.ok) throw new Error('Failed to load state')
  return res.json()
}

export async function saveState(userId: string, state: PlayerState): Promise<void> {
  await fetch(`${BASE_URL}/api/game/state/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state)
  })
}

export async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch(`${BASE_URL}/api/game/recipes`)
  return res.json()
}

export async function getUpgrades(): Promise<Upgrade[]> {
  const res = await fetch(`${BASE_URL}/api/game/upgrades`)
  return res.json()
}

export async function getQuests(userId: string): Promise<Quest[]> {
  const res = await fetch(`${BASE_URL}/api/game/quests/${userId}`)
  return res.json()
}
