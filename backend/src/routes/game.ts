import { Router } from 'express'
import { getOrCreatePlayerState, savePlayerState, mockRecipes, mockUpgrades, mockQuests } from '../models/mockStore'

export const gameRouter = Router()

gameRouter.get('/state/:userId', (req, res) => {
  const userId = req.params.userId
  const state = getOrCreatePlayerState(userId)
  res.json(state)
})

gameRouter.post('/state/:userId', (req, res) => {
  const userId = req.params.userId
  const state = req.body
  savePlayerState(userId, state)
  res.json({ ok: true })
})

gameRouter.get('/recipes', (_req, res) => {
  res.json(mockRecipes)
})

gameRouter.get('/upgrades', (_req, res) => {
  res.json(mockUpgrades)
})

gameRouter.get('/quests/:userId', (req, res) => {
  // For skeleton, ignore user personalization
  res.json(mockQuests)
})
