import type { ReactNode } from 'react'
import { Icon } from '../Icon'

export interface ListRowProps {
  /** Lo que nombra la fila: un ejercicio, una sesión, un día tipo. */
  title: string
  /** Una línea de detalle bajo el título: fecha, series, grupo muscular. */
  detail?: string
  /** Una cifra a la derecha, ya formateada. */
  value?: string
  /** Si se pasa, la fila se puede pulsar para abrir su detalle; sin acciones, lleva una flecha. */
  onSelect?: () => void
  /** Acciones de la fila, al final: botones `text` («Editar», «Quitar»). */
  children?: ReactNode
}

export function ListRow({ title, detail, value, onSelect, children }: ListRowProps) {
  const content = (
    <>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-title text-primary">{title}</span>
        {detail ? <span className="text-sm text-tertiary tabular-nums">{detail}</span> : null}
      </span>
      {value ? <span className="text-title text-primary tabular-nums">{value}</span> : null}
    </>
  )

  return (
    <li className="flex items-center gap-3 border-b border-default last:border-b-0">
      {onSelect ? (
        <button
          type="button"
          onClick={onSelect}
          className="flex min-h-11 flex-1 items-center gap-3 py-3.5 text-left transition active:scale-99"
        >
          {content}
          {children ? null : (
            <span className="text-tertiary">
              <Icon name="chevron-right" />
            </span>
          )}
        </button>
      ) : (
        <div className="flex min-h-11 flex-1 items-center gap-3 py-3.5">{content}</div>
      )}
      {children ? <div className="flex shrink-0 items-center gap-1">{children}</div> : null}
    </li>
  )
}
