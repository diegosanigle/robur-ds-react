import { EmptyState } from 'robur-ds'

export function HistoryEmpty({ onRegister }: { onRegister: () => void }) {
  return (
    <EmptyState
      title="Aún no hay sesiones esta semana"
      description="Aquí verás las sesiones de esta semana. Registra una para empezar."
      actionLabel="Registrar sesión"
      onAction={onRegister}
    />
  )
}
