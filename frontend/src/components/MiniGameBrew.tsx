import React, { useEffect, useState } from 'react'

interface Props {
    onComplete: (result: { success: boolean; quality: 'low' | 'medium' | 'high' }) => void
}

export const MiniGameBrew: React.FC<Props> = ({ onComplete }) => {
    const [position, setPosition] = useState(0)
    const [direction, setDirection] = useState<1 | -1>(1)

    useEffect(() => {
        const id = setInterval(() => {
            setPosition(prev => {
                let next = prev + direction * 5
                if (next >= 100) {
                    next = 100
                    setDirection(-1)
                } else if (next <= 0) {
                    next = 0
                    setDirection(1)
                }
                return next
            })
        }, 100)
        return () => clearInterval(id)
    }, [direction])

    const handleBrew = () => {
        let quality: 'low' | 'medium' | 'high' = 'low'
        if (position >= 40 && position <= 60) quality = 'high'
        else if (position >= 25 && position <= 75) quality = 'medium'
        onComplete({ success: quality !== 'low', quality })
    }

    return (
        <div className="minigame minigame-brew">
            <h3>Boil the Cauldron</h3>
            <div className="brew-bar">
                <div className="brew-marker" style={{ left: position + '%' }} />
                <div className="brew-zone" />
            </div>
            <button onClick={handleBrew}>Finish brew</button>
            <p>Stop the heat marker in the sweet spot for a perfect witchy potion.</p>
        </div>
    )
}
