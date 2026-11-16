import { useId } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { Icon } from '../Icon'

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'children'> {
  /** Texto visible que nombra el campo. Obligatorio: un campo sin etiqueta no es accesible. */
  label: string
  /** Las opciones, en el orden en que se muestran. */
  options: { value: string; label: string }[]
  /** Texto de la opción vacía inicial. Si no se pasa, no hay opción vacía. */
  placeholder?: string
  /** Ayuda breve bajo el campo. */
  hint?: string
  /** Mensaje de error. Si existe, el campo se marca como inválido. */
  error?: string
}

export function Select({ label, options, placeholder, hint, error, id, className = '', ...props }: SelectProps) {
  const autoId = useId()
  const selectId = id ?? autoId
  const messageId = `${selectId}-message`
  const message = error ?? hint

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-control text-primary">
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={[
            'min-h-11 w-full appearance-none rounded-md border bg-surface py-3.5 pr-11 pl-3.5 text-body text-primary shadow-sm',
            'focus:border-action focus:outline-none focus:ring-3 focus:ring-focus-ring/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-danger' : 'border-control',
            className,
          ].join(' ')}
          {...props}
        >
          {placeholder !== undefined ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-tertiary">
          <Icon name="chevron-down" />
        </span>
      </div>
      {message ? (
        <p id={messageId} className={`text-sm ${error ? 'text-danger' : 'text-tertiary'}`}>
          {message}
        </p>
      ) : null}
    </div>
  )
}
