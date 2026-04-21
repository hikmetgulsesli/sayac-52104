interface ActionButtonsProps {
  onIncrement: () => void
  onDecrement: () => void
  onReset: () => void
}

export default function ActionButtons({ onIncrement, onDecrement, onReset }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-6">
      <button
        onClick={onDecrement}
        className="w-20 h-20 rounded-full bg-surface-container text-on-surface flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.15)] active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Azalt"
      >
        <span className="material-symbols-outlined text-4xl">remove</span>
      </button>
      <button
        onClick={onIncrement}
        className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center shadow-[0_12px_32px_rgba(70,72,212,0.3)] active:scale-95 transition-all duration-300 group outline-none cursor-pointer"
        aria-label="Artır"
      >
        <span className="material-symbols-outlined text-5xl group-active:scale-90 transition-transform duration-300">add</span>
      </button>
      <button
        onClick={onReset}
        className="w-20 h-20 rounded-full bg-surface-container text-on-surface flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.15)] active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Sıfırla"
      >
        <span className="material-symbols-outlined text-4xl">restart_alt</span>
      </button>
    </div>
  )
}
