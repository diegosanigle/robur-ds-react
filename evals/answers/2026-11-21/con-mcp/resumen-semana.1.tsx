import { StatCard } from 'robur-ds'

type WeekSummaryProps = {
  sessions: number
  totalVolumeKg: number
  maxWeightKg: number
}

const nf = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 })

export function WeekSummary({ sessions, totalVolumeKg, maxWeightKg }: WeekSummaryProps) {
  return (
    <section aria-label="Resumen de la semana" className="flex flex-col gap-3">
      <StatCard variant="inverse" label="Sesiones" value={nf.format(sessions)} />
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Volumen total" value={nf.format(totalVolumeKg)} unit="kg" />
        <StatCard label="Peso máximo" value={nf.format(maxWeightKg)} unit="kg" />
      </div>
    </section>
  )
}
