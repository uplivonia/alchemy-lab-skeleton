type Dict = Record<string, any>

const en: Dict = {
  appTitle: 'Alchemy Lab',
  tabs: {
    home: 'Home',
    lab: 'Lab',
    recipes: 'Recipes',
    upgrades: 'Upgrades',
    quests: 'Quests',
    codex: 'Codex'
  },
  home: {
    title: 'Welcome to Alchemy Lab',
    description: 'Start as a novice alchemist and rebuild your ruined laboratory.'
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
