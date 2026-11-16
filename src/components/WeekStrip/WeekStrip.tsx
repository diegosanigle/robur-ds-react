import { Icon } from '../Icon'

export interface WeekStripProps {
  /** Los siete días de la semana, de lunes a domingo. */
  days: { label: string; name: string; done?: boolean; current?: boolean }[]
}

export function WeekStrip({ days }: WeekStripProps) {
  return (
    <ul className="flex justify-between">
      {days.map((day) => (
        <li key={day.name} className="flex flex-col items-center gap-2">
          <span className="sr-only">
            {day.name}
            {day.done ? ', con sesión' : ''}
            {day.current ? ', hoy' : ''}
          </span>
          <span
            aria-hidden="true"
            className={[
              'flex size-9 items-center justify-center rounded-pill',
              day.done ? 'bg-data-1 text-on-action' : 'border-2 border-inverse',
              day.current ? 'outline-2 outline-offset-2 outline-data-1' : '',
            ].join(' ')}
          >
            {day.done ? <Icon name="check" /> : null}
          </span>
          <span aria-hidden="true" className={`text-label ${day.current ? 'text-on-inverse' : 'text-on-inverse-muted'}`}>
            {day.label}
          </span>
        </li>
      ))}
    </ul>
  )
}
