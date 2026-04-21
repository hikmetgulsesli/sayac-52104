import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)
  }, [])

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
            className="text-on-surface-variant px-4 py-3 hover:bg-surface-container-low rounded-xl flex items-center gap-3 text-left w-full cursor-pointer hover:translate-x-1 transition-transform duration-200"
          >
            <span className="material-symbols-outlined">add_circle</span>
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
            className="bg-primary-container text-on-primary-container rounded-xl px-4 py-3 font-semibold flex items-center gap-3 text-left w-full cursor-pointer hover:translate-x-1 transition-transform duration-200"
          >
            <span className="material-symbols-outlined">settings</span>
            <span>Ayarlar</span>
          </button>
        </div>
        <button
          onClick={() => navigate('/')}
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
            <span>Ayarlar</span>
          </div>
        </header>

        {/* Content */}
        <div className="w-full max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8">
          <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
            <h2 className="font-headline text-2xl font-bold text-on-surface">Uygulama Ayarları</h2>
            
            {/* Theme setting */}
            <div className="bg-surface-container-lowest rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl">dark_mode</span>
                  <div>
                    <h3 className="font-headline text-lg font-semibold text-on-surface">Karanlık Mod</h3>
                    <p className="text-sm text-on-surface-variant font-body">Karanlık tema kullan</p>
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`w-14 h-8 rounded-full relative transition-colors duration-300 cursor-pointer ${
                    darkMode ? 'bg-primary' : 'bg-surface-variant'
                  }`}
                  aria-label="Karanlık mod değiştir"
                >
                  <span
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                      darkMode ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* About section */}
            <div className="bg-surface-container-lowest rounded-3xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">info</span>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-on-surface">Hakkında</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 pl-12">
                <p className="text-on-surface-variant font-body">
                  <span className="font-semibold">Uygulama:</span> Sayaç - Kinetic Counter
                </p>
                <p className="text-on-surface-variant font-body">
                  <span className="font-semibold">Versiyon:</span> 1.0.0
                </p>
                <p className="text-on-surface-variant font-body">
                  <span className="font-semibold">Geliştirici:</span> Kinetic Team
                </p>
              </div>
            </div>

            {/* Data info */}
            <div className="bg-surface-container-lowest rounded-3xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">storage</span>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-on-surface">Veri Saklama</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 pl-12">
                <p className="text-on-surface-variant font-body">
                  Veriler tarayıcınızda yerel olarak saklanır (localStorage).
                </p>
                <p className="text-sm text-on-surface-variant font-body">
                  Verileriniz sunucuya gönderilmez ve başkalarıyla paylaşılmaz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom nav - mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 flex justify-around items-center px-4 pt-3 pb-8">
        <button
          onClick={() => navigate('/')}
          className="flex flex-col items-center justify-center text-on-surface-variant px-6 py-2 cursor-pointer active:scale-90 transition-transform duration-150 gap-1"
        >
          <span className="material-symbols-outlined text-2xl">add_circle</span>
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
          className="flex flex-col items-center justify-center bg-primary-container/50 text-primary rounded-2xl px-6 py-2 cursor-pointer active:scale-90 transition-transform duration-150 gap-1"
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
          <span className="font-label text-xs font-medium">Ayarlar</span>
        </button>
      </nav>
    </div>
  )
}