import { HistoryEntry } from '../types'
import HistoryItem from './HistoryItem'

interface HistoryListProps {
  history: HistoryEntry[]
}

export default function HistoryList({ history }: HistoryListProps) {
  if (history.length === 0) {
    return (
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
    )
  }

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 flex flex-col gap-3">
      {history.map((entry) => (
        <HistoryItem key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
