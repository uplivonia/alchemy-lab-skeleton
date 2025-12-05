import React, { useState } from 'react'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { LabPage } from './pages/LabPage'
import { RecipesPage } from './pages/RecipesPage'
import { UpgradesPage } from './pages/UpgradesPage'
import { QuestsPage } from './pages/QuestsPage'
import { CodexPage } from './pages/CodexPage'

export type TabId = 'home' | 'lab' | 'recipes' | 'upgrades' | 'quests' | 'codex'

const tabComponents: Record<TabId, React.FC> = {
  home: HomePage,
  lab: LabPage,
  recipes: RecipesPage,
  upgrades: UpgradesPage,
  quests: QuestsPage,
  codex: CodexPage
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('home')
  const Active = tabComponents[activeTab]
  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <Active />
    </Layout>
  )
}

export default App
