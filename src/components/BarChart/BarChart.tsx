import { Card } from '../Card'

export interface BarChartProps {
  /** Qué mide la gráfica. Es su título visible y su nombre. */
  title: string
  /** Una barra por elemento, en orden: la etiqueta va debajo y la cifra encima. */
  data: { label: string; value: number }[]
  /** `surface` es la tarjeta normal; `inverse` es la destacada oscura, máximo una por pantalla. */
  variant?: 'surface' | 'inverse'
  /** Color de las barras: serie principal o segunda serie (solo en `inverse`). */
  series?: 'primary' | 'secondary'
}

const SERIES = { primary: 'bg-data-1', secondary: 'bg-data-2' }
const number = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 })

export function BarChart({ title, data, variant = 'surface', series = 'primary' }: BarChartProps) {
  const muted = variant === 'inverse' ? 'text-on-inverse-muted' : 'text-tertiary'
  const max = Math.max(...data.map((d) => d.value), 0) || 1

  return (
    <Card variant={variant}>
      <figure aria-label={title} className="flex flex-col gap-3">
        <figcaption className={`text-title ${muted}`}>{title}</figcaption>
        <div aria-hidden="true" className="flex h-40 items-end gap-1 pt-5">
          {data.map((d) => (
            <div key={d.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1">
              <span className={`text-label tabular-nums ${muted}`}>{d.value > 0 ? number.format(d.value) : ''}</span>
              <span
                className={`w-full shrink-0 rounded-t-xs ${SERIES[series]}`}
                style={{ height: `${(d.value / max) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="flex gap-1">
          {data.map((d) => (
            <span key={d.label} className={`min-w-0 flex-1 truncate text-center text-label tabular-nums ${muted}`}>
              {d.label}
            </span>
          ))}
        </div>
        <table className="sr-only">
          <tbody>
            {data.map((d) => (
              <tr key={d.label}>
                <th scope="row">{d.label}</th>
                <td>{number.format(d.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </Card>
  )
}
