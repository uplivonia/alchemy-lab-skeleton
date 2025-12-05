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
    const webApp = getWebApp()
    if (!webApp) return null

    const unsafe = webApp.initDataUnsafe
    if (unsafe && unsafe.user && unsafe.user.id) {
        return String(unsafe.user.id)
    }

    // fallback: можно попытаться распарсить initData строкой, но для скелета достаточно user.id
    return null
}

/**
 * Локальный fallback для браузера — один и тот же демо-пользователь.
 */
export function getTelegramUserIdFallback(): string {
    return 'demo-user'
}
