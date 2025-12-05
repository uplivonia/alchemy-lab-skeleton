import React from 'react'

interface LayoutProps {
    children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    // Минимальный layout-компонент, просто рендерит детей.
    // Сейчас он нигде не используется, но пусть спокойно живёт.
    return <>{children}</>
}

export default Layout