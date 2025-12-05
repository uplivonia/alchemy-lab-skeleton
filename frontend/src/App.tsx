import React, { useState } from 'react'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { LabPage } from './pages/LabPage'
import { RecipesPage } from './pages/RecipesPage'
import { UpgradesPage } from './pages/UpgradesPage'
import { QuestsPage } from './pages/QuestsPage'
import { CodexPage } from './pages/CodexPage'

export type TabId = 'home' | 'lab' | 'recipes' | 'upgrades' | 'quests' | 'codex'

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('home')

    let content: React.ReactNode
    switch (activeTab) {
        case 'home':
            content = <HomePage onNavigate={setActiveTab} />
            break
        case 'lab':
            content = <LabPage />
            break
        case 'recipes':
            content = <RecipesPage />
            break
        case 'upgrades':
            content = <UpgradesPage />
            break
        case 'quests':
            content = <QuestsPage />
            break
        case 'codex':
            content = <CodexPage />
            break
        default:
            content = <HomePage onNavigate={setActiveTab} />
    }

    return (
        <Layout activeTab={activeTab} onTabChange={setActiveTab}>
            {content}
        </Layout>
    )
}

export default App
