import { StatCard } from 'robur-ds'

interface WeeklySummaryProps {
  sessions: string
  volume: string
  maxWeight: string
}

export function WeeklySummary({ sessions, volume, maxWeight }: WeeklySummaryProps) {
  return (
    <section aria-labelledby="weekly-summary-title" className="flex flex-col gap-3">
      <h2 id="weekly-summary-title" className="text-title text-primary">
        Resumen de la semana
      </h2>
      <StatCard variant="inverse" label="Sesiones" value={sessions} />
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Volumen total" value={volume} unit="kg" />
        <StatCard label="Peso máximo" value={maxWeight} unit="kg" />
      </div>
    </section>
  )
}
