import { PlayerState, ReferralMilestone } from './types'

export function calculateReferralRewards(
  player: PlayerState,
  milestones: ReferralMilestone[]
): string[] {
  const newlyUnlocked: string[] = []
  for (const m of milestones) {
    const already = player.unlockedReferralRewardIds.includes(m.id)
    if (!already && player.referralCount >= m.requiredInvites) {
      newlyUnlocked.push(m.id)
    }
  }
  return newlyUnlocked
}
