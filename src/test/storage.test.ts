import { describe, it, expect, beforeEach } from 'vitest'
import { loadState, saveState } from '../utils/storage'

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should load default state when nothing is stored', () => {
    const state = loadState()
    expect(state.value).toBe(0)
    expect(state.history).toEqual([])
  })

  it('should save and load state correctly', () => {
    const testState = {
      value: 42,
      history: [
        {
          id: 'test-id-1',
          timestamp: new Date('2024-01-15T10:30:00'),
          action: 'increment' as const,
          value: 41
        }
      ]
    }
    saveState(testState)
    const loaded = loadState()
    expect(loaded.value).toBe(42)
    expect(loaded.history).toHaveLength(1)
    expect(loaded.history[0].id).toBe('test-id-1')
    expect(loaded.history[0].action).toBe('increment')
  })

  it('should handle corrupted JSON gracefully', () => {
    localStorage.setItem('sayac-counter-state', 'not valid json')
    const state = loadState()
    expect(state.value).toBe(0)
    expect(state.history).toEqual([])
  })

  it('should handle empty storage', () => {
    const state = loadState()
    expect(state.value).toBe(0)
    expect(state.history).toHaveLength(0)
  })
})