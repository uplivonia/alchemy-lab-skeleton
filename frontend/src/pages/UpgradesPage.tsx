import React from 'react'
import { UpgradeList } from '../components/UpgradeList'
import { mockUpgrades } from '../game/mockData'

export const UpgradesPage: React.FC = () => {
    return <UpgradeList upgrades={mockUpgrades} />
}
