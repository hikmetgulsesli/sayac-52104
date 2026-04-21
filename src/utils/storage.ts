import { CounterState } from '../types'

const STORAGE_KEY = 'sayac-counter-state'

export function loadState(): CounterState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        ...parsed,
        history: parsed.history.map((entry: { timestamp: string | Date }) => ({
          ...entry,
          timestamp: new Date(entry.timestamp)
        }))
      }
    }
  } catch {
    // ignore parse errors
  }
  return { value: 0, history: [] }
}

export function saveState(state: CounterState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}