import { Router } from 'express'
import {
    getOrCreatePlayerState,
    savePlayerState,
    mockReferralMilestones
} from '../models/mockStore'

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

    // проверяем, не считали ли уже этого приглащённого
    const alreadyExists = referrals.some(
        r => r.referrerId === referrerId && r.invitedUserId === invitedUserId
    )
    if (alreadyExists) {
        return res.json({ ok: true, duplicated: true })
    }

    referrals.push({
        referrerId,
        invitedUserId,
        timestamp: new Date().toISOString()
    })

    // считаем, сколько всего рефералов у этого игрока
    const inviteCount = referrals.filter(r => r.referrerId === referrerId).length

    // обновляем стейт игрока
    let player = getOrCreatePlayerState(referrerId)
    player = {
        ...player,
        referralCount: inviteCount
    }

    const newlyUnlocked: string[] = []

    // проверяем milestone'ы
    for (const m of mockReferralMilestones) {
        const alreadyUnlocked = player.unlockedReferralRewardIds.includes(m.id)
        if (!alreadyUnlocked && inviteCount >= m.requiredInvites) {
            newlyUnlocked.push(m.id)
            player = {
                ...player,
                unlockedReferralRewardIds: [...player.unlockedReferralRewardIds, m.id]
            }

            // выдаём награду — рецепт или косметика
            if (m.reward.recipeId && !player.unlockedRecipeIds.includes(m.reward.recipeId)) {
                player = {
                    ...player,
                    unlockedRecipeIds: [...player.unlockedRecipeIds, m.reward.recipeId]
                }
            }

            // косметику пока можно просто отмечать, визуал прикрутим позже
            // if (m.reward.cosmeticId) { ... }
        }
    }

    savePlayerState(referrerId, player)

    return res.json({
        ok: true,
        referralCount: inviteCount,
        newlyUnlocked
    })
})
