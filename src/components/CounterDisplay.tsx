interface CounterDisplayProps {
  value: number
}

export default function CounterDisplay({ value }: CounterDisplayProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-label text-surface-tint font-medium text-sm tracking-widest uppercase mb-2">
        Mevcut Değer
      </span>
      <h2 className="font-headline text-[140px] md:text-[180px] leading-none font-bold text-primary tracking-tighter tabular-nums drop-shadow-sm">
        {value}
      </h2>
    </div>
  )
}
