import { Quest } from './types'

export function updateQuestProgress(quests: Quest[], questId: string, amount = 1): Quest[] {
  return quests.map(q => {
    if (q.id !== questId) return q
    const currentCount = Math.min(q.targetCount, q.currentCount + amount)
    const isCompleted = currentCount >= q.targetCount
    return { ...q, currentCount, isCompleted }
  })
}
