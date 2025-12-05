import React, { useState } from 'react'

interface Props {
  onComplete: (result: { success: boolean }) => void
}

const allIngredients = ['herb', 'crystal', 'water', 'fire']

export const MiniGameMixOrder: React.FC<Props> = ({ onComplete }) => {
  const targetSequence = ['herb', 'crystal', 'water']
  const [current, setCurrent] = useState<string[]>([])

  const handleClick = (id: string) => {
    const next = [...current, id]
    setCurrent(next)
    if (next.length === targetSequence.length) {
      const success = targetSequence.every((v, i) => v === next[i])
      onComplete({ success })
    }
  }

  return (
    <div className="minigame minigame-mix">
      <h3>Mix in the correct order</h3>
      <p>Target: herb → crystal → water</p>
      <div className="ingredients-grid">
        {allIngredients.map(id => (
          <button key={id} onClick={() => handleClick(id)}>
            {id}
          </button>
        ))}
      </div>
      <p>Clicked: {current.join(' → ')}</p>
    </div>
  )
}
