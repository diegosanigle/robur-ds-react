import { StatCard } from "robur-ds";

type WeekSummaryProps = {
  /** Sesiones registradas en la semana. */
  sessions: number;
  /** Volumen total de la semana, en kg. */
  volumeKg: number;
  /** Peso máximo levantado en la semana, en kg. */
  maxWeightKg: number;
};

const formatNumber = new Intl.NumberFormat("es-ES", {
  useGrouping: "always",
  maximumFractionDigits: 1,
});

export function WeekSummary({ sessions, volumeKg, maxWeightKg }: WeekSummaryProps) {
  return (
    <section aria-labelledby="week-summary-title" className="flex flex-col gap-3">
      <h2 id="week-summary-title" className="text-h2 text-primary">
        Resumen de la semana
      </h2>
      <StatCard
        variant="inverse"
        label="Sesiones"
        value={formatNumber.format(sessions)}
      />
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Volumen total"
          value={formatNumber.format(volumeKg)}
          unit="kg"
        />
        <StatCard
          label="Peso máximo"
          value={formatNumber.format(maxWeightKg)}
          unit="kg"
        />
      </div>
    </section>
  );
}
