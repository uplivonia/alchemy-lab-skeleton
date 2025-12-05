import React from 'react'
import { useGameState } from '../game/state'
import { Quest } from '../game/types'

interface Props {
    quests: Quest[]
}

export const QuestList: React.FC<Props> = ({ quests }) => {
    const { claimQuest } = useGameState()

    return (
        <section>
            <h2>Orders</h2>
            <p style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '0.5rem' }}>
                Villagers, spirits and suspicious guests come here with strange requests.
                Complete their orders to earn coins and reputation.
            </p>
            <ul className="list">
                {quests.map(q => (
                    <li key={q.id} className="card">
                        <h3>{q.title}</h3>
                        <p>{q.description}</p>
                        <p>
                            Progress: {q.currentCount}/{q.targetCount}
                        </p>
                        <p>
                            Reward: {q.reward.points ?? 0} AP, {q.reward.xp ?? 0} XP
                        </p>
                        <button
                            disabled={!q.isCompleted || q.isClaimed}
                            onClick={() => claimQuest(q.id)}
                        >
                            {q.isClaimed ? 'Reward taken' : 'Complete order'}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}
