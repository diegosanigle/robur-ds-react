import { StatCard } from 'robur-ds'

const nf = new Intl.NumberFormat('es-ES')
const decimal = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 })

export function Resumen({ volume, max, sessions }: { volume: number; max: number; sessions: number }) {
  return (
    <div className="flex flex-col gap-4">
      <StatCard label="Volumen" value={nf.format(volume)} unit="kg" />
      <StatCard label="Peso máximo" value={(62.5).toFixed(1)} unit="kg" />
      <StatCard label="Sesiones" value={sessions.toLocaleString()} />
      <StatCard label="Media" value={decimal.format(max)} unit="kg" />
      <p className="text-body text-secondary">Récord anterior: 2480 kg</p>
    </div>
  )
}
