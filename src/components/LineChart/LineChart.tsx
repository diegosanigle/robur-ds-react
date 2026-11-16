import { Card } from '../Card'

export interface LineChartProps {
  /** Qué mide la gráfica, con su unidad. Es su título visible y su nombre. */
  title: string
  /** Un punto por registro, en orden: la etiqueta es la fecha y value la cifra. */
  data: { label: string; value: number }[]
  /** `surface` es la tarjeta normal; `inverse` es la destacada oscura, máximo una por pantalla. */
  variant?: 'surface' | 'inverse'
  /** Color de la línea: serie principal o segunda serie (solo en `inverse`). */
  series?: 'primary' | 'secondary'
}

const LINE = { primary: 'text-data-1', secondary: 'text-data-2' }
const DOT = { primary: 'bg-data-1', secondary: 'bg-data-2' }
const number = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 })

export function LineChart({ title, data, variant = 'surface', series = 'primary' }: LineChartProps) {
  const muted = variant === 'inverse' ? 'text-on-inverse-muted' : 'text-tertiary'
  const values = data.map((d) => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  // Un margen del 10 % arriba y abajo para que los puntos no toquen el borde.
  const pad = (max - min || Math.abs(max) || 1) * 0.1
  const top = max + pad
  const bottom = min - pad
  const points = data.map((d, i) => ({
    x: data.length === 1 ? 50 : (i / (data.length - 1)) * 100,
    y: ((top - d.value) / (top - bottom)) * 100,
  }))

  return (
    <Card variant={variant}>
      <figure aria-label={title} className="flex flex-col gap-3">
        <figcaption className={`text-title ${muted}`}>{title}</figcaption>
        <div aria-hidden="true" className="flex h-40 gap-3">
          <div className={`relative min-w-0 flex-1 ${LINE[series]}`}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
              <polyline
                points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {points.map((p, i) => (
              <span
                key={data[i].label}
                className={`absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-pill ${DOT[series]}`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              />
            ))}
          </div>
          {data.length ? (
            <div className={`flex flex-col justify-between text-right text-label tabular-nums ${muted}`}>
              <span>{number.format(max)}</span>
              <span>{number.format(min)}</span>
            </div>
          ) : null}
        </div>
        {data.length ? (
          <div aria-hidden="true" className={`flex justify-between text-label tabular-nums ${muted}`}>
            <span>{data[0].label}</span>
            {data.length > 1 ? <span>{data[data.length - 1].label}</span> : null}
          </div>
        ) : null}
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
