import { StatCard } from 'robur-ds'

const nf = new Intl.NumberFormat('es-ES', { useGrouping: 'always' })

export function Resumen({ volume, max }: { volume: number; max: number }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-title text-primary">Temporada 2026</h2>
      <StatCard label="Volumen" value={nf.format(volume)} unit="kg" />
      <StatCard label="Peso máximo" value={max.toLocaleString('es-ES', { useGrouping: true, maximumFractionDigits: 1 })} unit="kg" />
      <p className="text-body text-secondary">Récord anterior: 2.480 kg</p>
    </div>
  )
}
