import { useState, useEffect, useCallback } from 'react'
import { CounterState, HistoryEntry } from '../types'
import { loadState, saveState } from '../utils/storage'

export function useCounter() {
  const [state, setState] = useState<CounterState>({ value: 0, history: [] })

  useEffect(() => {
    const loaded = loadState()
    setState(loaded)
  }, [])

  useEffect(() => {
    saveState(state)
  }, [state])

  const addHistoryEntry = useCallback((action: HistoryEntry['action']) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      action,
      value: state.value
    }
    const newHistory = [entry, ...state.history].slice(0, 10)
    setState(prev => ({ ...prev, history: newHistory }))
  }, [state.value, state.history])

  const increment = useCallback(() => {
    setState(prev => ({ ...prev, value: prev.value + 1 }))
    addHistoryEntry('increment')
  }, [addHistoryEntry])

  const decrement = useCallback(() => {
    setState(prev => ({ ...prev, value: prev.value - 1 }))
    addHistoryEntry('decrement')
  }, [addHistoryEntry])

  const reset = useCallback(() => {
    setState(prev => ({ ...prev, value: 0 }))
    addHistoryEntry('reset')
  }, [addHistoryEntry])

  return {
    value: state.value,
    history: state.history,
    increment,
    decrement,
    reset
  }
}
