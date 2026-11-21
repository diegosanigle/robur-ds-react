import { EmptyState } from 'robur-ds'

export function HistoryEmptyWeek({ onRegisterSession }: { onRegisterSession: () => void }) {
  return (
    <EmptyState
      title="Aún no hay sesiones esta semana"
      description="Aquí verás tus sesiones de la semana. Registra la primera para empezar."
      actionLabel="Registrar sesión"
      onAction={onRegisterSession}
    />
  )
}
