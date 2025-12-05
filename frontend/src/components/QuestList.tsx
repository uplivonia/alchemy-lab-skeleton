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
      <h2>Quests</h2>
      <ul className="list">
        {quests.map(q => (
          <li key={q.id} className="card">
            <h3>{q.title}</h3>
            <p>{q.description}</p>
            <p>
              Progress: {q.currentCount}/{q.targetCount}
            </p>
            <p>Reward: {q.reward.points ?? 0} AP, {q.reward.xp ?? 0} XP</p>
            <button
              disabled={!q.isCompleted || q.isClaimed}
              onClick={() => claimQuest(q.id)}
            >
              {q.isClaimed ? 'Claimed' : 'Claim'}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
