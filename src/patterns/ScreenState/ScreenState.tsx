import { Button } from '../../components/Button'

export interface ScreenStateProps {
  /** `loading` mientras llegan los datos; `error` si no han podido llegar. */
  state: 'loading' | 'error'
  /** Qué ha pasado y qué hacer, en una frase. Solo en `error`. */
  message?: string
  /** Se llama al pulsar Reintentar. Sin él, el error no ofrece reintento. */
  onRetry?: () => void
}

export function ScreenState({ state, message, onRetry }: ScreenStateProps) {
  if (state === 'loading') {
    return (
      <div role="status" className="px-5 py-8 text-center text-body text-tertiary">
        Cargando…
      </div>
    )
  }
  return (
    <div role="alert" className="flex flex-col items-center gap-2 px-5 py-8 text-center">
      <h2 className="text-h3 text-primary">No se han podido cargar los datos</h2>
      <p className="text-body text-secondary">{message ?? 'Comprueba la conexión y vuelve a intentarlo.'}</p>
      {onRetry ? (
        <div className="mt-4">
          <Button variant="secondary" onClick={onRetry}>
            Reintentar
          </Button>
        </div>
      ) : null}
    </div>
  )
}
