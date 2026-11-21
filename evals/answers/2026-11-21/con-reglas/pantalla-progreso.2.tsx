import { BarChart, Button, HeatmapYear, StatCard, Tabs } from "robur-ds";
import { ScreenState } from "robur-ds";

type Range = "week" | "month" | "year";

interface ProgressData {
  // Sesiones, minutos y volumen total (kg) del periodo elegido
  summary: { sessions: number; minutes: number; volumeKg: number };
  // Sesiones por semana, una barra por semana
  sessionsPerWeek: { label: string; value: number }[];
  // Año del heatmap y una entrada por semana ISO
  year: number;
  weeks: React.ComponentProps<typeof HeatmapYear>["weeks"];
}

interface ProgressScreenProps {
  // Periodo que se está viendo
  range: Range;
  // Se llama al elegir otro periodo
  onRangeChange: (range: Range) => void;
  // Estado de la carga de datos
  status: "loading" | "error" | "ready";
  // Datos de la pantalla; solo hacen falta cuando status es "ready"
  data?: ProgressData;
  // Vuelve a pedir los datos
  onRetry: () => void;
  // Abre el registro de una sesión
  onRegisterSession: () => void;
}

const formatNumber = new Intl.NumberFormat("es-ES", {
  useGrouping: "always",
  maximumFractionDigits: 1,
});

export function ProgressScreen({
  range,
  onRangeChange,
  status,
  data,
  onRetry,
  onRegisterSession,
}: ProgressScreenProps) {
  if (status !== "ready" || !data) {
    return <ScreenState state={status === "error" ? "error" : "loading"} onRetry={onRetry} />;
  }

  return (
    <main className="flex flex-col gap-6 p-4">
      <h1 className="text-h1 text-primary">Progreso</h1>

      <Tabs
        label="Periodo"
        value={range}
        onChange={(value: string) => onRangeChange(value as Range)}
        tabs={[
          { value: "week", label: "Semana" },
          { value: "month", label: "Mes" },
          { value: "year", label: "Año" },
        ]}
      >
        <div className="flex flex-col gap-6">
          <section aria-label="Resumen" className="grid grid-cols-3 gap-3">
            <StatCard label="Sesiones" value={formatNumber.format(data.summary.sessions)} />
            <StatCard label="Minutos" value={formatNumber.format(data.summary.minutes)} unit="min" />
            <StatCard label="Volumen total" value={formatNumber.format(data.summary.volumeKg)} unit="kg" />
          </section>

          <BarChart title="Sesiones por semana" data={data.sessionsPerWeek} />
        </div>
      </Tabs>

      <HeatmapYear year={data.year} weeks={data.weeks} />

      <Button variant="primary" fullWidth onClick={onRegisterSession}>
        Registrar sesión
      </Button>
    </main>
  );
}
