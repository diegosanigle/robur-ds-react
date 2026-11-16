import type { ButtonHTMLAttributes } from 'react'

export interface HeatmapCellProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Número de semana ISO, del 1 al 53. */
  week: number
  /** Sesiones registradas esa semana. Las anuncia la celda y, si no se pasa level, deciden el color. */
  sessions: number
  /** Nivel de color, del 0 al 4, cuando lo calcula la app (por ejemplo, con sesiones ponderadas). */
  level?: number
  /** Semana marcada como descanso: se distingue por el borde discontinuo, no por un color. */
  rest?: boolean
  /** Es la semana en curso. */
  current?: boolean
}

// Una clase por nivel, escrita entera: Tailwind solo genera las clases que encuentra en el código.
const LEVELS = ['bg-heat-0', 'bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4']

export function HeatmapCell({ week, sessions, level, rest = false, current = false, type = 'button', className = '', ...props }: HeatmapCellProps) {
  const detail = rest ? 'descanso' : `${sessions} ${sessions === 1 ? 'sesión' : 'sesiones'}`
  return (
    <button
      type={type}
      aria-label={`Semana ${week}, ${detail}${current ? ', semana actual' : ''}`}
      className={[
        'aspect-square min-h-3.5 rounded-xs transition-transform active:scale-95',
        rest ? 'border border-dashed border-control bg-surface' : LEVELS[Math.min(Math.max(Math.round(level ?? sessions), 0), 4)],
        current ? 'outline-2 outline-offset-2 outline-heat-current' : '',
        className,
      ].join(' ')}
      {...props}
    />
  )
}
