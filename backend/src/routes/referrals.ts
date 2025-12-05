import { Router } from 'express'

interface ReferralRecord {
  referrerId: string
  invitedUserId: string
  timestamp: string
}

const referrals: ReferralRecord[] = []

export const referralsRouter = Router()

referralsRouter.post('/', (req, res) => {
  const { referrerId, invitedUserId } = req.body as { referrerId: string; invitedUserId: string }
  if (!referrerId || !invitedUserId || referrerId === invitedUserId) {
    return res.status(400).json({ error: 'Invalid referral' })
  }
  referrals.push({ referrerId, invitedUserId, timestamp: new Date().toISOString() })
  res.json({ ok: true })
})
