import React from 'react'
import { useGameState } from '../game/state'
import { MiniGameGrind } from './MiniGameGrind'
import { MiniGameBrew } from './MiniGameBrew'
import { MiniGameMixOrder } from './MiniGameMixOrder'

export const MiniGameContainer: React.FC = () => {
  const { player, finishMiniGame } = useGameState()
  const type = player.miniGame.activeType

  if (type === 'NONE') {
    return <p>No active mini-game. Choose a recipe to start crafting.</p>
  }

  if (type === 'GRIND') {
    return <MiniGameGrind onComplete={finishMiniGame} />
  }
  if (type === 'BREW') {
    return <MiniGameBrew onComplete={finishMiniGame} />
  }
  if (type === 'MIX_ORDER') {
    return <MiniGameMixOrder onComplete={finishMiniGame} />
  }

  return null
}
