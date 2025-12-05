import React from 'react'
import { useGameState } from '../game/state'

export const LabView: React.FC = () => {
    const { player } = useGameState()
    const lab = player.lab

    return (
        <section className="lab-view">
            <h2>Cauldron Room</h2>
            <ul>
                <li>Cauldron level: {lab.tableLevel}</li>
                <li>Furnace level: {lab.furnaceLevel}</li>
                <li>Shelves level: {lab.shelvesLevel}</li>
                <li>Lanterns level: {lab.lightingLevel}</li>
                <li>Tools & knives level: {lab.toolsLevel}</li>
            </ul>
            <p>
                Upgrade your cauldron, shelves and lanterns to brew faster, safer and
                for much weirder customers.
            </p>
        </section>
    )
}
