import { useId } from "react";
import { StatCard } from "robur-ds";

type WeekSummaryProps = {
  // Sesiones registradas en la semana
  sessions: number;
  // Volumen total de la semana, en kg
  totalVolume: number;
  // Peso máximo levantado en la semana, en kg
  maxWeight: number;
};

const formatNumber = (n: number) =>
  new Intl.NumberFormat("es-ES", {
    useGrouping: "always",
    maximumFractionDigits: 1,
  }).format(n);

export function WeekSummary({ sessions, totalVolume, maxWeight }: WeekSummaryProps) {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId} className="flex flex-col gap-3">
      <h2 id={titleId} className="text-h2 text-primary">
        Resumen de la semana
      </h2>
      <StatCard variant="inverse" label="Sesiones" value={formatNumber(sessions)} />
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Volumen total"
          value={formatNumber(totalVolume)}
          unit="kg"
        />
        <StatCard
          label="Peso máximo"
          value={formatNumber(maxWeight)}
          unit="kg"
        />
      </div>
    </section>
  );
}
