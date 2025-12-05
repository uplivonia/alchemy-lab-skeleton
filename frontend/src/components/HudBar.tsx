import React from 'react'
import { useGameState } from '../game/state'

export const HudBar: React.FC = () => {
    const { player } = useGameState()

    const levelXpCap = 100
    const xpInLevel = player.xp % levelXpCap
    const xpProgress = Math.min(100, (xpInLevel / levelXpCap) * 100)

    return (
        <header className="hud">
            <div className="hud-left">
                <div className="hud-level">
                    <span className="hud-level-label">Lvl</span>
                    <span className="hud-level-value">{player.level}</span>
                </div>
                <div className="hud-xp">
                    <div className="hud-xp-top">
                        <span>XP</span>
                        <span>
                            {xpInLevel}/{levelXpCap}
                        </span>
                    </div>
                    <div className="hud-xp-bar">
                        <div className="hud-xp-fill" style={{ width: `${xpProgress}%` }} />
                    </div>
                </div>
            </div>

            <div className="hud-right">
                <div className="hud-resource">
                    <span className="hud-icon">🧪</span>
                    <span className="hud-value">{player.alchemyPoints}</span>
                </div>
                <div className="hud-resource">
                    <span className="hud-icon">💎</span>
                    <span className="hud-value">{player.premiumCrystals}</span>
                </div>
            </div>
        </header>
    )
}
