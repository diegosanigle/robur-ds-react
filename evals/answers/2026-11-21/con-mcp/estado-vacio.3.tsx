import { EmptyState } from 'robur-ds'

export function HistoryEmptyWeek({ onLogSession }: { onLogSession: () => void }) {
  return (
    <EmptyState
      title="Aún no hay sesiones esta semana"
      description="Aquí verás tus sesiones de la semana. Registra una para empezar."
      actionLabel="Registrar sesión"
      onAction={onLogSession}
    />
  )
}
