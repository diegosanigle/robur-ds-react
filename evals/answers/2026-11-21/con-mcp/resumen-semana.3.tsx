import { StatCard } from 'robur-ds'

interface WeekSummaryProps {
  sessions: string
  volume: string
  maxWeight: string
}

export function WeekSummary({ sessions, volume, maxWeight }: WeekSummaryProps) {
  return (
    <section aria-label="Resumen de la semana" className="flex flex-col gap-3">
      <StatCard variant="inverse" label="Sesiones" value={sessions} />
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Volumen total" value={volume} unit="kg" />
        <StatCard label="Peso máximo" value={maxWeight} unit="kg" />
      </div>
    </section>
  )
}
