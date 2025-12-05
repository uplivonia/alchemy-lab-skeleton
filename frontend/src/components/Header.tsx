import React from 'react'
import { t } from '../services/i18n'

export const Header: React.FC = () => {
    return (
        <header className="app-header">
            <h1>{t('appTitle')}</h1>
            <p className="app-subtitle">Tiny Cursed Town — Night Market</p>
        </header>
    )
}