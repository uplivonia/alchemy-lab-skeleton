import React, { useState } from 'react'

interface Props {
  onComplete: (result: { success: boolean }) => void
}

export const MiniGameGrind: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)

  const handleTap = () => {
    const next = Math.min(100, progress + 15)
    setProgress(next)
    if (next >= 100) {
      onComplete({ success: true })
    }
  }

  return (
    <div className="minigame minigame-grind">
      <h3>Grind herbs</h3>
      <div className="progress-bar">
        <div className="progress" style={{ width: progress + '%' }} />
      </div>
      <button onClick={handleTap}>Tap to grind</button>
      <p>Fill the bar to 100% to succeed.</p>
    </div>
  )
}
