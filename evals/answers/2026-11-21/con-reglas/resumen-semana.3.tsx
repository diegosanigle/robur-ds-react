import { StatCard } from "robur-ds";

type WeekSummaryProps = {
  /** Sesiones registradas en la semana */
  sessions: number;
  /** Volumen total de la semana, en kg */
  volume: number;
  /** Peso máximo levantado en la semana, en kg */
  maxWeight: number;
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("es-ES", {
    useGrouping: "always",
    maximumFractionDigits: 1,
  }).format(value);

export function WeekSummary({ sessions, volume, maxWeight }: WeekSummaryProps) {
  return (
    <section aria-labelledby="week-summary-title" className="flex flex-col gap-3">
      <h2 id="week-summary-title" className="text-h3 text-primary">
        Resumen de la semana
      </h2>
      <StatCard variant="inverse" label="Sesiones" value={formatNumber(sessions)} />
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Volumen total" value={formatNumber(volume)} unit="kg" />
        <StatCard label="Peso máximo" value={formatNumber(maxWeight)} unit="kg" />
      </div>
    </section>
  );
}
