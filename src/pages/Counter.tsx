import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CounterState, HistoryEntry } from '../types'
import { loadState, saveState } from '../utils/storage'

export default function Counter() {
  const [state, setState] = useState<CounterState>({ value: 0, history: [] })
  const [darkMode, setDarkMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loaded = loadState()
    setState(loaded)
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)
  }, [])

  useEffect(() => {
    saveState(state)
  }, [state])

  const addHistoryEntry = (action: HistoryEntry['action']) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      action,
      value: state.value
    }
    const newHistory = [entry, ...state.history].slice(0, 10)
    setState(prev => ({ ...prev, history: newHistory }))
  }

  const increment = () => {
    setState(prev => ({ ...prev, value: prev.value + 1 }))
    addHistoryEntry('increment')
  }

  const decrement = () => {
    setState(prev => ({ ...prev, value: prev.value - 1 }))
    addHistoryEntry('decrement')
  }

  const reset = () => {
    setState(prev => ({ ...prev, value: 0 }))
    addHistoryEntry('reset')
  }

  const toggleDarkMode = () => {
    const next = !darkMode
    setDarkMode(next)
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <div className="min-h-screen bg-background text-on-surface font-body overflow-hidden flex w-full">
      {/* Sidebar - desktop */}
      <nav className="hidden lg:flex flex-col h-screen w-64 bg-surface-container-lowest border-r-0 tonal-layering flat no-shadows gap-2 p-4 shrink-0">
        <div className="px-4 py-6 mb-4">
          <h1 className="text-xl font-bold font-headline text-primary">Playground</h1>
          <p className="text-xs font-label text-on-surface-variant mt-1">Kinetic v1.0</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <button
            onClick={() => navigate('/')}
            className="bg-primary-container text-on-primary-container rounded-xl px-4 py-3 font-semibold flex items-center gap-3 text-left w-full cursor-pointer hover:translate-x-1 transition-transform duration-200"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
            <span>Sayaç</span>
          </button>
          <button
            onClick={() => navigate('/history')}
            className="text-on-surface-variant px-4 py-3 hover:bg-surface-container-low rounded-xl flex items-center gap-3 text-left w-full cursor-pointer hover:translate-x-1 transition-transform duration-200"
          >
            <span className="material-symbols-outlined">history</span>
            <span>Geçmiş</span>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="text-on-surface-variant px-4 py-3 hover:bg-surface-container-low rounded-xl flex items-center gap-3 text-left w-full cursor-pointer hover:translate-x-1 transition-transform duration-200"
          >
            <span className="material-symbols-outlined">settings</span>
            <span>Ayarlar</span>
          </button>
        </div>
        <button
          onClick={increment}
          className="mt-auto flex items-center justify-center gap-2 bg-primary text-white rounded-xl px-4 py-3 font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        >
          <span className="material-symbols-outlined">add</span>
          Yeni Sayaç
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative w-full">
        {/* Top bar */}
        <header className="bg-surface/80 dark:bg-slate-900/80 backdrop-blur-xl text-primary font-headline font-bold tracking-tight text-2xl docked full-width top-0 sticky z-50 no-border tonal-shift bg-surface-container-low/50 shadow-sm flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <span>Kinetic Counter</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="hover:opacity-80 transition-opacity active:scale-95 transition-transform duration-200 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-primary cursor-pointer"
              aria-label="Tema değiştir"
            >
              <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
          </div>
        </header>

        {/* Canvas */}
        <div className="w-full max-w-5xl mx-auto px-6 py-12 flex flex-col gap-20 pb-40 lg:pb-24">
          {/* Hero Counter Section */}
          <section className="flex flex-col items-center justify-center gap-8 mt-8">
            <div className="flex flex-col items-center">
              <span className="font-label text-surface-tint font-medium text-sm tracking-widest uppercase mb-2">Mevcut Değer</span>
              <h2 className="font-headline text-[140px] md:text-[180px] leading-none font-bold text-primary tracking-tighter tabular-nums drop-shadow-sm">
                {state.value}
              </h2>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-6">
              <button
                onClick={decrement}
                className="w-20 h-20 rounded-full bg-surface-container text-on-surface flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.15)] active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="Azalt"
              >
                <span className="material-symbols-outlined text-4xl">remove</span>
              </button>
              <button
                onClick={increment}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center shadow-[0_12px_32px_rgba(70,72,212,0.3)] active:scale-95 transition-all duration-300 group outline-none cursor-pointer"
                aria-label="Artır"
              >
                <span className="material-symbols-outlined text-5xl group-active:scale-90 transition-transform duration-300">add</span>
              </button>
              <button
                onClick={reset}
                className="w-20 h-20 rounded-full bg-surface-container text-on-surface flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.15)] active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="Sıfırla"
              >
                <span className="material-symbols-outlined text-4xl">restart_alt</span>
              </button>
            </div>
          </section>

          {/* History Panel */}
          <section className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
            <h3 className="font-headline text-2xl font-bold text-on-surface">Son İşlemler</h3>
            {state.history.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-3xl p-16 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-outline-variant/15">
                <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low/40 to-transparent pointer-events-none"></div>
                <div className="w-24 h-24 rounded-full bg-surface flex items-center justify-center mb-6 z-10 shadow-inner">
                  <span className="material-symbols-outlined text-5xl text-outline" style={{ fontVariationSettings: "'wght' 200" }}>history_toggle_off</span>
                </div>
                <h4 className="font-headline text-xl text-on-surface font-semibold z-10 mb-2">Henüz işlem yapılmadı</h4>
                <p className="font-body text-on-surface-variant max-w-sm z-10 text-base leading-relaxed">
                  Bu oturumda kaydedilen artış yok. Saymaya başlamak için yukarıdaki büyük düğmeye tıklayın.
                </p>
              </div>
            ) : (
              <div className="bg-surface-container-lowest rounded-3xl p-6 flex flex-col gap-3">
                {state.history.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 bg-surface rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined ${entry.action === 'increment' ? 'text-primary' : entry.action === 'decrement' ? 'text-tertiary' : 'text-error'}`}>
                        {entry.action === 'increment' ? 'add' : entry.action === 'decrement' ? 'remove' : 'restart_alt'}
                      </span>
                      <div>
                        <p className="font-label font-semibold text-on-surface">
                          {entry.action === 'increment' ? 'Artırıldı' : entry.action === 'decrement' ? 'Azaltıldı' : 'Sıfırlandı'}
                        </p>
                        <p className="text-sm text-on-surface-variant font-body">
                          {entry.value}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-on-surface-variant font-label">
                      {entry.timestamp.toLocaleTimeString('tr-TR')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Bottom nav - mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 flex justify-around items-center px-4 pt-3 pb-8">
        <button
          onClick={() => navigate('/')}
          className="flex flex-col items-center justify-center bg-primary-container/50 text-primary rounded-2xl px-6 py-2 cursor-pointer active:scale-90 transition-transform duration-150 gap-1"
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          <span className="font-label text-xs font-medium">Sayaç</span>
        </button>
        <button
          onClick={() => navigate('/history')}
          className="flex flex-col items-center justify-center text-on-surface-variant px-6 py-2 cursor-pointer active:scale-90 transition-transform duration-150 gap-1"
        >
          <span className="material-symbols-outlined text-2xl">history</span>
          <span className="font-label text-xs font-medium">Geçmiş</span>
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="flex flex-col items-center justify-center text-on-surface-variant px-6 py-2 cursor-pointer active:scale-90 transition-transform duration-150 gap-1"
        >
          <span className="material-symbols-outlined text-2xl">settings</span>
          <span className="font-label text-xs font-medium">Ayarlar</span>
        </button>
      </nav>
    </div>
  )
}