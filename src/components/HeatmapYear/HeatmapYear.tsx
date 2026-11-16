import { HeatmapCell } from '../HeatmapCell'

export interface HeatmapYearProps {
  /** Año ISO de las semanas. Da nombre a la rejilla. */
  year: number
  /** Una entrada por semana ISO del año, en orden: 52 o 53. */
  weeks: { week: number; sessions: number; level?: number; rest?: boolean; current?: boolean }[]
  /** Se llama con el número de semana al pulsar una celda. */
  onWeekSelect?: (week: number) => void
}

// Una clase por nivel, escrita entera: Tailwind solo genera las clases que encuentra en el código.
const LEGEND = ['bg-heat-0', 'bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4']

export function HeatmapYear({ year, weeks, onWeekSelect }: HeatmapYearProps) {
  return (
    <div className="flex flex-col gap-4">
      <div role="group" aria-label={`Semanas de ${year}`} className="grid grid-cols-13 gap-1">
        {weeks.map((week) => (
          <HeatmapCell
            key={week.week}
            week={week.week}
            sessions={week.sessions}
            level={week.level}
            rest={week.rest}
            current={week.current}
            onClick={onWeekSelect ? () => onWeekSelect(week.week) : undefined}
          />
        ))}
      </div>
      <div aria-hidden="true" className="flex items-center justify-end gap-1.5 text-label text-tertiary">
        <span>menos</span>
        {LEGEND.map((level) => (
          <span key={level} className={`size-2.5 rounded-xs ${level}`} />
        ))}
        <span>más</span>
      </div>
    </div>
  )
}
