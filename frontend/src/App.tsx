import React, { useEffect, useState } from 'react'
import './styles/global.css'

type PotionId = 'calm' | 'glow' | 'night'

interface Potion {
    id: PotionId
    name: string
    description: string
    rewardCoins: number
    rewardRep: number
}

interface Customer {
    id: number
    name: string
    wants: PotionId
    line: string
}

type BrewQuality = 'low' | 'medium' | 'high'

const POTIONS: Potion[] = [
    {
        id: 'calm',
        name: 'Calming Brew',
        description: 'Soothes nerves before tax inspections and marriage proposals.',
        rewardCoins: 18,
        rewardRep: 2
    },
    {
        id: 'glow',
        name: 'Glow Tonic',
        description: 'Makes the drinker softly glow. Great for forest spirits and influencers.',
        rewardCoins: 22,
        rewardRep: 3
    },
    {
        id: 'night',
        name: 'Night Vision Elixir',
        description: 'Lets you see in the dark alleys of the Night Market.',
        rewardCoins: 28,
        rewardRep: 4
    }
]

const CUSTOMERS: Customer[] = [
    {
        id: 1,
        name: 'Nervous Villager',
        wants: 'calm',
        line: 'I have a horrible feeling about tonight... can you brew something to calm me?'
    },
    {
        id: 2,
        name: 'Forest Sprite',
        wants: 'glow',
        line: 'The moon party starts soon! I must shine brighter than the mushrooms.'
    },
    {
        id: 3,
        name: 'Vampire Tax Inspector',
        wants: 'night',
        line: 'These ledgers are written in the tiniest font. I require something for the eyes.'
    },
    {
        id: 4,
        name: 'Sleepy Guard',
        wants: 'glow',
        line: 'Need a little glow to stay awake on the city walls all night.'
    },
    {
        id: 5,
        name: 'Witch Apprentice',
        wants: 'calm',
        line: 'Exams tomorrow. Please, anything to stop my hands shaking.'
    }
]

const App: React.FC = () => {
    const [coins, setCoins] = useState(0)
    const [rep, setRep] = useState(0)
    const [level, setLevel] = useState(1)
    const [xp, setXp] = useState(0)

    const [queueIndex, setQueueIndex] = useState(0)
    const [selectedPotionId, setSelectedPotionId] = useState<PotionId | null>(null)

    const [heatPosition, setHeatPosition] = useState(0)
    const [direction, setDirection] = useState<1 | -1>(1)
    const [isBrewing, setIsBrewing] = useState(false)
    const [toast, setToast] = useState<string | null>(null)

    const currentCustomer = CUSTOMERS[queueIndex % CUSTOMERS.length]
    const selectedPotion = POTIONS.find(p => p.id === selectedPotionId) ?? null

    useEffect(() => {
        if (!isBrewing) return
        const id = window.setInterval(() => {
            setHeatPosition(prev => {
                let next = prev + direction * 4
                if (next >= 100) {
                    next = 100
                    setDirection(-1)
                } else if (next <= 0) {
                    next = 0
                    setDirection(1)
                }
                return next
            })
        }, 80)
        return () => window.clearInterval(id)
    }, [isBrewing, direction])

    const addXp = (amount: number) => {
        setXp(prev => {
            const total = prev + amount
            const levelsGained = Math.floor(total / 100)
            if (levelsGained > 0) {
                setLevel(l => l + levelsGained)
            }
            return total % 100
        })
    }

    const evaluateQuality = (): BrewQuality => {
        if (heatPosition >= 42 && heatPosition <= 58) return 'high'
        if (heatPosition >= 30 && heatPosition <= 70) return 'medium'
        return 'low'
    }

    const handleServe = () => {
        if (!selectedPotionId) {
            setToast('Pick a potion first.')
            window.setTimeout(() => setToast(null), 1500)
            return
        }

        // первый клик — запускаем нагрев
        if (!isBrewing) {
            setIsBrewing(true)
            setToast('Stirring the cauldron...')
            window.setTimeout(() => setToast(null), 1000)
            return
        }

        // второй клик — завершаем варку
        const quality = evaluateQuality()
        setIsBrewing(false)

        const correctPotion = selectedPotionId === currentCustomer.wants
        let text: string

        if (!correctPotion) {
            setRep(r => Math.max(0, r - 1))
            text = `${currentCustomer.name} frowns. "That is not what I asked for..." (-1 reputation)`
        } else if (!selectedPotion) {
            text = 'Something went wrong with the brew.'
        } else {
            const baseCoins = selectedPotion.rewardCoins
            const baseRep = selectedPotion.rewardRep
            let coinGain = baseCoins
            let repGain = baseRep
            let xpGain = 8

            if (quality === 'high') {
                coinGain = Math.round(baseCoins * 1.6)
                repGain = baseRep + 1
                xpGain = 14
                text = `${currentCustomer.name} beams. "Perfect!" +${coinGain} coins, +${repGain} rep`
            } else if (quality === 'medium') {
                coinGain = Math.round(baseCoins * 1.1)
                xpGain = 10
                text = `${currentCustomer.name} nods. "Good enough." +${coinGain} coins, +${repGain} rep`
            } else {
                coinGain = Math.round(baseCoins * 0.5)
                repGain = Math.max(1, repGain - 1)
                xpGain = 4
                text = `${currentCustomer.name} squints. "Hmm..." +${coinGain} coins, +${repGain} rep`
            }

            setCoins(c => c + coinGain)
            setRep(r => r + repGain)
            addXp(xpGain)
        }

        setQueueIndex(i => i + 1)
        setSelectedPotionId(null)
        setHeatPosition(0)
        setDirection(1)
        setToast(text)
        window.setTimeout(() => setToast(null), 2600)
    }

    const handleSkip = () => {
        setQueueIndex(i => i + 1)
        setSelectedPotionId(null)
        setIsBrewing(false)
        setToast(`${currentCustomer.name} leaves. Maybe next time.`)
        window.setTimeout(() => setToast(null), 1800)
    }

    const xpProgress = (xp / 100) * 100

    return (
        <div className="app-root">
            {/* header */}
            <header className="app-header">
                <h1>Witchy Potion Shop</h1>
                <p className="app-subtitle">Tiny Cursed Town — Night Market</p>
            </header>

            {/* HUD */}
            <header className="hud">
                <div className="hud-left">
                    <div className="hud-level">
                        <span className="hud-level-label">Lvl</span>
                        <span className="hud-level-value">{level}</span>
                    </div>
                    <div className="hud-xp">
                        <div className="hud-xp-top">
                            <span>XP</span>
                            <span>{xp}/100</span>
                        </div>
                        <div className="progress-bar">
                            <div className="hud-xp-fill" style={{ width: xpProgress + '%' }} />
                        </div>
                    </div>
                </div>
                <div className="hud-right">
                    <div className="hud-resource">
                        <span className="hud-icon">🪙</span>
                        <span className="hud-value">{coins}</span>
                    </div>
                    <div className="hud-resource">
                        <span className="hud-icon">✨</span>
                        <span className="hud-value">{rep}</span>
                    </div>
                </div>
            </header>

            {/* main game */}
            <main className="app-main">
                <section className="home-hero card">
                    <div className="home-hero-left">
                        <h2>Tonight&apos;s customer</h2>
                        <p className="home-subtitle">
                            A new face steps into your tiny shop. Listen carefully and pick the right potion.
                        </p>

                        <div className="home-stats">
                            <div>
                                <span className="label">Name</span>
                                <span className="value">{currentCustomer.name}</span>
                            </div>
                            <div>
                                <span className="label">Wants</span>
                                <span className="value">
                                    {POTIONS.find(p => p.id === currentCustomer.wants)?.name}
                                </span>
                            </div>
                            <div>
                                <span className="label">In line</span>
                                <span className="value">
                                    {queueIndex + 1}/{CUSTOMERS.length}
                                </span>
                            </div>
                        </div>

                        <p style={{ fontSize: '0.8rem', marginTop: '0.4rem' }}>
                            “{currentCustomer.line}”
                        </p>

                        <div className="home-actions" style={{ marginTop: '0.6rem' }}>
                            <button className="btn-primary" onClick={handleServe}>
                                {isBrewing ? 'Finish brew' : 'Start brewing for this customer'}
                            </button>
                            <button className="home-quick" onClick={handleSkip}>
                                Skip customer
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
                                <div className="brew-bar">
                                    <div className="brew-marker" style={{ left: heatPosition + '%' }} />
                                    <div className="brew-zone" />
                                </div>
                            </div>
                            <p className="lab-preview-caption">
                                {isBrewing ? 'Careful with the heat...' : 'Cauldron is waiting'}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="card" style={{ marginTop: '0.5rem' }}>
                    <h3>Choose a potion</h3>
                    <p className="home-subtitle">
                        Match the customer&apos;s request. Better quality = more coins and reputation.
                    </p>
                    <div className="home-quick-grid">
                        {POTIONS.map(p => (
                            <button
                                key={p.id}
                                className="home-quick"
                                onClick={() => setSelectedPotionId(p.id)}
                                style={
                                    selectedPotionId === p.id
                                        ? {
                                            outline: '2px solid #9aff7a',
                                            boxShadow: '0 0 10px rgba(154,255,122,0.8)'
                                        }
                                        : undefined
                                }
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>
                    {selectedPotion && (
                        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
                            {selectedPotion.description}
                        </p>
                    )}
                </section>
            </main>

            {toast && (
                <div className="reward-toast">
                    <span>{toast}</span>
                </div>
            )}
        </div>
    )
}

export default App
