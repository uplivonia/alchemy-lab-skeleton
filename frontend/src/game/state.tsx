import React, { createContext, useContext, useEffect, useState } from 'react'
import { PlayerState, MiniGameType } from './types'
import { defaultPlayerState, mockRecipes } from './mockData'
import { gainXp, grantAlchemyPoints, applyDailyReward } from './gameLogic'
import { getInitialState, saveState } from '../services/apiClient'
import {
    getTelegramUserId,
    getUserIdFromUrl,
    getLocalFallbackUserId
} from '../services/telegram'

interface GameStateContextValue {
    player: PlayerState
    setPlayer: (p: PlayerState) => void
    startMiniGameForRecipe: (recipeId: string, type?: MiniGameType) => void
    finishMiniGame: (result: any) => void
    upgradeStation: (upgradeId: string) => void
    claimQuest: (questId: string) => void
    claimDailyReward: () => void
}

const GameStateContext = createContext<GameStateContextValue | undefined>(undefined)

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [player, setPlayer] = useState<PlayerState>(defaultPlayerState)
    const [isLoaded, setIsLoaded] = useState(false)

    // 1) Telegram ID, 2) ?uid=..., 3) demo-user для браузера
    const urlId = getUserIdFromUrl()
    const rawId = getTelegramUserId() ?? urlId
    const userId = rawId ?? getLocalFallbackUserId()

    const claimDailyReward = () => {
        setPlayer(prev => applyDailyReward(prev, new Date()))
    }

    // загрузка стейта с бэка
    useEffect(() => {
        let cancelled = false

        getInitialState(userId)
            .then(state => {
                if (!cancelled) setPlayer(state)
            })
            .catch(() => {
                if (!cancelled) {
                    console.warn('Using default player state')
                }
            })
            .finally(() => {
                if (!cancelled) setIsLoaded(true)
            })

        return () => {
            cancelled = true
        }
    }, [userId])

    // авто-сохранение при изменении
    useEffect(() => {
        if (!isLoaded) return
        saveState(userId, player).catch(err => {
            console.error('Failed to save state', err)
        })
    }, [player, isLoaded, userId])

    const startMiniGameForRecipe = (recipeId: string, type?: MiniGameType) => {
        const recipe = mockRecipes.find(r => r.id === recipeId)
        let resolvedType: MiniGameType = 'GRIND'

        if (type) {
            resolvedType = type
        } else if (recipe) {
            if (recipe.rarity === 'COMMON') resolvedType = 'GRIND'
            if (recipe.rarity === 'RARE') resolvedType = 'BREW'
            if (recipe.rarity === 'EPIC') resolvedType = 'MIX_ORDER'
        }

        setPlayer(prev => ({
            ...prev,
            miniGame: {
                activeType: resolvedType,
                activeRecipeId: recipeId
            }
        }))
    }

    const finishMiniGame = (result: any) => {
        setPlayer(prev => {
            if (!result?.success) {
                return {
                    ...prev,
                    miniGame: { activeType: 'NONE' }
                }
            }

            let points = 10
            let xp = 5

            const type = prev.miniGame.activeType
            if (type === 'GRIND') {
                points = 8
                xp = 4
            } else if (type === 'BREW') {
                if (result.quality === 'high') {
                    points = 20
                    xp = 10
                } else if (result.quality === 'medium') {
                    points = 14
                    xp = 7
                } else {
                    points = 6
                    xp = 3
                }
            } else if (type === 'MIX_ORDER') {
                points = 18
                xp = 9
            }

            let next = grantAlchemyPoints(prev, points)
            next = gainXp(next, xp)
            return {
                ...next,
                miniGame: { activeType: 'NONE' }
            }
        })
    }

    const upgradeStation = (upgradeId: string) => {
        // пока не различаем тип апгрейда, просто повышаем уровень стола
        setPlayer(prev => ({
            ...prev,
            alchemyPoints: Math.max(0, prev.alchemyPoints - 50),
            lab: {
                ...prev.lab,
                tableLevel: prev.lab.tableLevel + 1
            }
        }))
    }

    const claimQuest = (questId: string) => {
        setPlayer(prev => ({
            ...prev,
            claimedQuestIds: prev.claimedQuestIds.includes(questId)
                ? prev.claimedQuestIds
                : [...prev.claimedQuestIds, questId]
        }))
    }

    if (!isLoaded) {
        return <div style={{ padding: '1rem' }}>Loading your lab...</div>
    }

    return (
        <GameStateContext.Provider
            value={{
                player,
                setPlayer,
                startMiniGameForRecipe,
                finishMiniGame,
                upgradeStation,
                claimQuest,
                claimDailyReward
            }}
        >
            {children}
        </GameStateContext.Provider>
    )
}

export const useGameState = (): GameStateContextValue => {
    const ctx = useContext(GameStateContext)
    if (!ctx) {
        throw new Error('useGameState must be used within GameStateProvider')
    }
    return ctx
}
