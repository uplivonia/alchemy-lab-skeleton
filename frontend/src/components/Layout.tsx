import React from 'react'
import { Header } from './Header'
import { HudBar } from './HudBar'
import { Footer } from './Footer'
import type { TabId } from '../App'

interface LayoutProps {
  children: React.ReactNode
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="app-root">
      <Header />
      <HudBar />
      <main className="app-main">
        {children}
      </main>
      <Footer activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}
