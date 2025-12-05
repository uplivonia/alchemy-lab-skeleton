export interface TelegramUser {
    id: number
    first_name?: string
    last_name?: string
    username?: string
    language_code?: string
}

export interface TelegramWebApp {
    initData: string
    initDataUnsafe: {
        user?: TelegramUser
        [key: string]: any
    }
    close: () => void
    expand: () => void
}

declare global {
    interface Window {
        Telegram?: {
            WebApp: TelegramWebApp
        }
    }
}

export function getWebApp(): TelegramWebApp | null {
    if (typeof window === 'undefined') return null
    return window.Telegram?.WebApp ?? null
}

export function initTelegram(): void {
    const webApp = getWebApp()
    if (!webApp) return
    // Расширяем WebApp на весь экран в телеге
    webApp.expand()
}

/**
 * Пытаемся взять userId из Telegram WebApp initData.
 * Если не в Telegram – вернём null.
 */
export function getTelegramUserId(): string | null {
    try {
        const tg = (window as any).Telegram?.WebApp
        const uid = tg?.initDataUnsafe?.user?.id
        return uid ? String(uid) : null
    } catch {
        return null
    }
}

// URL fallback: ?uid=123
export function getUserIdFromUrl(): string | null {
    if (typeof window === 'undefined') return null
    try {
        const params = new URLSearchParams(window.location.search)
        const uid = params.get('uid')
        return uid || null
    } catch {
        return null
    }
}

// Local fallback for browser testing
export function getLocalFallbackUserId(): string {
    return 'demo-user'
}

/**
 * Локальный fallback для браузера — один и тот же демо-пользователь.
 */
export function getTelegramUserIdFallback(): string {
    return 'demo-user'
}
