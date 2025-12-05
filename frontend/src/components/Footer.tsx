import React from 'react'
import type { TabId } from '../App'
import { t } from '../services/i18n'

interface FooterProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const tabLabels: Record<TabId, string> = {
  home: t('tabs.home'),
  lab: t('tabs.lab'),
  recipes: t('tabs.recipes'),
  upgrades: t('tabs.upgrades'),
  quests: t('tabs.quests'),
  codex: t('tabs.codex')
}

export const Footer: React.FC<FooterProps> = ({ activeTab, onTabChange }) => {
  return (
    <footer className="app-footer">
      {Object.entries(tabLabels).map(([id, label]) => (
        <button
          key={id}
          className={activeTab === id ? 'tab-button active' : 'tab-button'}
          onClick={() => onTabChange(id as TabId)}
        >
          {label}
        </button>
      ))}
    </footer>
  )
}
