import React from 'react'
import { t } from '../services/i18n'
import { useGameState } from '../game/state'

export const HomePage: React.FC = () => {
    const { player, claimDailyReward } = useGameState()

    const canClaimToday =
        !player.lastDailyClaim ||
        new Date(player.lastDailyClaim).toDateString() !== new Date().toDateString()

    return (
        <section>
            <h2>{t('home.title')}</h2>
            <p>{t('home.description')}</p>
            <p>Welcome, {player.name}.</p>

            <div style={{ marginTop: '1rem' }}>
                <button
                    onClick={claimDailyReward}
                    disabled={!canClaimToday}
                >
                    {canClaimToday ? 'Claim daily reward' : 'Daily reward already claimed'}
                </button>
            </div>
        </section>
    )
}