import React from 'react'
import { QuestList } from '../components/QuestList'
import { useGameState } from '../game/state'
import { mockQuests } from '../game/mockData'
import type { Quest } from '../game/types'

export const QuestsPage: React.FC = () => {
    const { player } = useGameState()

    const quests: Quest[] = mockQuests.map((q: Quest) => ({
        ...q,
        isCompleted: q.currentCount >= q.targetCount,
        isClaimed: player.claimedQuestIds.includes(q.id)
    }))

    return <QuestList quests={quests} />
}
