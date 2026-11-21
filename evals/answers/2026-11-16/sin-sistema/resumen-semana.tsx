type WeeklySummaryProps = {
  sessions: number;
  totalVolumeKg: number;
  maxWeightKg: number;
  /** Etiqueta opcional del periodo, p. ej. "10–16 nov" */
  periodLabel?: string;
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(value);

export function WeeklySummary({
  sessions,
  totalVolumeKg,
  maxWeightKg,
  periodLabel,
}: WeeklySummaryProps) {
  return (
    <section
      aria-labelledby="weekly-summary-title"
      className="w-full rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
    >
      <header className="flex items-baseline justify-between">
        <h2
          id="weekly-summary-title"
          className="text-sm font-semibold text-neutral-900"
        >
          Resumen de la semana
        </h2>
        {periodLabel && (
          <span className="text-xs text-neutral-500">{periodLabel}</span>
        )}
      </header>

      <dl className="mt-4">
        <div className="flex flex-col">
          <dt className="text-sm font-medium text-neutral-600">Sesiones</dt>
          <dd className="mt-1 text-6xl font-bold leading-none tracking-tight text-neutral-900">
            {formatNumber(sessions)}
          </dd>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-4">
          <div className="flex flex-col">
            <dt className="text-xs text-neutral-500">Volumen total</dt>
            <dd className="mt-1 text-lg font-semibold text-neutral-800">
              {formatNumber(totalVolumeKg)}
              <span className="ml-1 text-sm font-normal text-neutral-500">
                kg
              </span>
            </dd>
          </div>

          <div className="flex flex-col">
            <dt className="text-xs text-neutral-500">Peso máximo</dt>
            <dd className="mt-1 text-lg font-semibold text-neutral-800">
              {formatNumber(maxWeightKg)}
              <span className="ml-1 text-sm font-normal text-neutral-500">
                kg
              </span>
            </dd>
          </div>
        </div>
      </dl>
    </section>
  );
}

export default WeeklySummary;
