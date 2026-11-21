import { StatCard } from 'robur-ds'

type WeekSummaryProps = {
  sessions: number
  totalVolumeKg: number
  maxWeightKg: number
}

const nf = new Intl.NumberFormat('es-ES')

export function WeekSummary({ sessions, totalVolumeKg, maxWeightKg }: WeekSummaryProps) {
  return (
    <section aria-labelledby="week-summary-title" className="flex flex-col gap-4">
      <h2 id="week-summary-title" className="text-title text-primary">
        Resumen de la semana
      </h2>
      <StatCard variant="inverse" label="Sesiones" value={nf.format(sessions)} />
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Volumen total" value={nf.format(totalVolumeKg)} unit="kg" />
        <StatCard label="Peso máximo" value={nf.format(maxWeightKg)} unit="kg" />
      </div>
    </section>
  )
}
