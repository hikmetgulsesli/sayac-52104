interface ThemeToggleProps {
  darkMode: boolean
  onToggle: () => void
}

export default function ThemeToggle({ darkMode, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="hover:opacity-80 transition-opacity active:scale-95 transition-transform duration-200 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-primary cursor-pointer"
      aria-label="Tema değiştir"
    >
      <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
    </button>
  )
}
