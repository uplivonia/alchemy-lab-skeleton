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
        setToast('+25 AP, +10 XP')
        window.setTimeout(() => setToast(null), 2200)
    }

    const goToQuests = () => onNavigate?.('quests')
    const goToLab = () => onNavigate?.('lab')
    const goToRecipes = () => onNavigate?.('recipes')
    const goToUpgrades = () => onNavigate?.('upgrades')

    return (
        <section className="home">
            <div className="home-hero card">
                <div className="home-hero-left">
                    <h2>Welcome, {player.name}</h2>
                    <p className="home-subtitle">
                        Rebuild your ruined laboratory, discover secret recipes and become a legendary alchemist.
                    </p>
                    <div className="home-stats">
                        <div>
                            <span className="label">Lab table level</span>
                            <span className="value">Lv. {player.lab.tableLevel}</span>
                        </div>
                        <div>
                            <span className="label">Recipes unlocked</span>
                            <span className="value">{player.unlockedRecipeIds.length}</span>
                        </div>
                        <div>
                            <span className="label">Referrals</span>
                            <span className="value">{player.referralCount}</span>
                        </div>
                    </div>
                    <div className="home-actions">
                        <button
                            className="btn-primary"
                            onClick={handleDailyClick}
                            disabled={!canClaimToday}
                        >
                            {canClaimToday ? 'Claim daily reward' : 'Daily reward already claimed'}
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
                        <p className="lab-preview-caption">Your laboratory</p>
                    </div>
                </div>
            </div>

            {/* две крупные карточки-кнопки */}
            <div className="home-grid">
                <div
                    className="card home-card-clickable"
                    onClick={goToQuests}
                    role="button"
                    tabIndex={0}
                >
                    <h3>Daily goals</h3>
                    <p>Tap to open today&apos;s quests and track your progress.</p>
                </div>
                <div
                    className="card home-card-clickable"
                    onClick={goToLab}
                    role="button"
                    tabIndex={0}
                >
                    <h3>Laboratory</h3>
                    <p>Go to your lab to upgrade stations and improve your setup.</p>
                </div>
            </div>

            {/* маленькие быстрые кнопки под ними */}
            <div className="home-quick-grid">
                <button className="home-quick" onClick={goToRecipes}>
                    🧪 Recipes
                </button>
                <button className="home-quick" onClick={goToUpgrades}>
                    🛠 Upgrades
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
