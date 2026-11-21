import { Button } from "robur-ds";

export interface HistoryEmptyStateProps {
  /** Se ejecuta al pulsar "Registrar sesión". */
  onRegisterSession: () => void;
  className?: string;
}

export function HistoryEmptyState({
  onRegisterSession,
  className = "",
}: HistoryEmptyStateProps) {
  return (
    <section
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-4 px-6 py-12 text-center ${className}`}
    >
      <svg
        aria-hidden="true"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-neutral-400"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>

      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-neutral-900">
          Aún no has entrenado esta semana
        </h2>
        <p className="max-w-xs text-sm text-neutral-600">
          Cuando registres una sesión, aparecerá aquí. Empieza hoy y mantén tu
          constancia.
        </p>
      </div>

      <Button type="button" onClick={onRegisterSession}>
        Registrar sesión
      </Button>
    </section>
  );
}

export default HistoryEmptyState;
