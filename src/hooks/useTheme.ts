import { useState, useEffect, useCallback } from 'react'

export function useTheme() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)
  }, [])

  const toggleDarkMode = useCallback(() => {
    const next = !darkMode
    setDarkMode(next)
    document.documentElement.classList.toggle('dark', next)
  }, [darkMode])

  return { darkMode, toggleDarkMode }
}
