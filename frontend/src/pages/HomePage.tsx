import React, { useState } from 'react'
import { useGameState } from '../game/state'
import type { TabId } from '../App'

interface HomePageProps {
    onNavigate?: (tab: TabId) => void
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const { player, claimDailyReward } = useGameState()
    const [toast, setToast] = useState<string | null>(null)

    const canClaimToday =
        !player.lastDailyClaim ||
        new Date(player.lastDailyClaim).toDateString() !== new Date().toDateString()

    const handleDailyClick = () => {
        if (!canClaimToday) return
        claimDailyReward()
        setToast('Night started: +25 coins, +10 XP')
        window.setTimeout(() => setToast(null), 2200)
    }

    const goToOrders = () => onNavigate?.('quests')
    const goToLab = () => onNavigate?.('lab')
    const goToRecipes = () => onNavigate?.('recipes')
    const goToUpgrades = () => onNavigate?.('upgrades')

    return (
        <section className="home">
            <div className="home-hero card">
                <div className="home-hero-left">
                    <h2>Witchy Potion Shop</h2>
                    <p className="home-subtitle">
                        Welcome, {player.name}! Tonight the Night Market opens again. Serve weird customers,
                        brew risky potions and grow your cursed little shop.
                    </p>

                    <div className="home-stats">
                        <div>
                            <span className="label">Shop rank</span>
                            <span className="value">Lv. {player.level}</span>
                        </div>
                        <div>
                            <span className="label">Potions known</span>
                            <span className="value">{player.unlockedRecipeIds.length}</span>
                        </div>
                        <div>
                            <span className="label">Regulars</span>
                            <span className="value">{player.referralCount}</span>
                        </div>
                    </div>

                    <div className="home-actions">
                        <button
                            className="btn-primary"
                            onClick={handleDailyClick}
                            disabled={!canClaimToday}
                        >
                            {canClaimToday ? 'Open Night Market' : 'Night Market already open'}
                        </button>
                    </div>
                </div>

                <div className="home-hero-right">
                    <div className="lab-preview">
                        <div className="lab-preview-inner">
                            <div className="lab-glow" />
                            <div className="lab-orb" />
                            <div className="lab-desk" />
                            <div className="lab-bottle lab-bottle-left" />
                            <div className="lab-bottle lab-bottle-right" />
                        </div>
                        <p className="lab-preview-caption">Your cursed little shop</p>
                    </div>
                </div>
            </div>

            {/* две крупные карточки-кнопки */}
            <div className="home-grid">
                <div
                    className="card home-card-clickable"
                    onClick={goToOrders}
                    role="button"
                    tabIndex={0}
                >
                    <h3>Today's Orders</h3>
                    <p>Tap to see who is waiting in line and what potions they need tonight.</p>
                </div>
                <div
                    className="card home-card-clickable"
                    onClick={goToLab}
                    role="button"
                    tabIndex={0}
                >
                    <h3>Cauldron Room</h3>
                    <p>Go to the cauldron, adjust the heat and try to hit that perfect brew.</p>
                </div>
            </div>

            {/* быстрые кнопки */}
            <div className="home-quick-grid">
                <button className="home-quick" onClick={goToRecipes}>
                    📖 Grimoire
                </button>
                <button className="home-quick" onClick={goToUpgrades}>
                    🛠 Shop upgrades
                </button>
            </div>

            {toast && (
                <div className="reward-toast">
                    <span>{toast}</span>
                </div>
            )}
        </section>
    )
}
