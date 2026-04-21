export interface HistoryEntry {
  id: string
  timestamp: Date
  action: 'increment' | 'decrement' | 'reset'
  value: number
}

export interface CounterState {
  value: number
  history: HistoryEntry[]
}