import { useState, useEffect } from 'react'
import { HistoryEntry } from '../types'
import { loadState } from '../utils/storage'

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    const loaded = loadState()
    setHistory(loaded.history)
  }, [])

  return { history }
}
