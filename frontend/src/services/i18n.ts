type Dict = Record<string, any>

const en: Dict = {
    appTitle: 'Witchy Potion Shop',
    tabs: {
        home: 'Shop',
        lab: 'Cauldron',
        recipes: 'Grimoire',
        upgrades: 'Upgrades',
        quests: 'Orders',
        codex: 'Codex'
    }
}

const dict = en

export function t(path: string): string {
    const parts = path.split('.')
    let current: any = dict
    for (const p of parts) {
        if (current && p in current) {
            current = current[p]
        } else {
            return path
        }
    }
    return typeof current === 'string' ? current : path
}