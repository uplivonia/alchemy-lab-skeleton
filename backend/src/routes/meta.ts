import { Router } from 'express'
import { mockReferralMilestones } from '../models/mockStore'

export const metaRouter = Router()

metaRouter.get('/referral-milestones', (_req, res) => {
  res.json(mockReferralMilestones)
})
