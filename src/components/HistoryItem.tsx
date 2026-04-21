import { HistoryEntry } from '../types'
import { formatTimestamp } from '../utils/time'

interface HistoryItemProps {
  entry: HistoryEntry
}

export default function HistoryItem({ entry }: HistoryItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-surface rounded-xl">
      <div className="flex items-center gap-3">
        <span className={`material-symbols-outlined ${
          entry.action === 'increment' ? 'text-primary' :
          entry.action === 'decrement' ? 'text-tertiary' :
          'text-error'
        }`}>
          {entry.action === 'increment' ? 'add' :
           entry.action === 'decrement' ? 'remove' :
           'restart_alt'}
        </span>
        <div>
          <p className="font-label font-semibold text-on-surface">
            {entry.action === 'increment' ? 'Artırıldı' :
             entry.action === 'decrement' ? 'Azaltıldı' :
             'Sıfırlandı'}
          </p>
          <p className="text-sm text-on-surface-variant font-body">
            {entry.value}
          </p>
        </div>
      </div>
      <span className="text-sm text-on-surface-variant font-label">
        {formatTimestamp(entry.timestamp)}
      </span>
    </div>
  )
}
