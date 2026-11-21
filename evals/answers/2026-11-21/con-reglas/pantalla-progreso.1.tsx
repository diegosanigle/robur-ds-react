import { BarChart, Button, HeatmapYear, StatCard, Tabs } from "robur-ds";
import { ScreenState } from "robur-ds/patterns";

type Periodo = "semana" | "mes" | "anio";

type Resumen = {
  sesiones: number;
  minutos: number;
  volumenKg: number;
};

type Progreso = {
  resumen: Resumen;
  sesionesPorSemana: { label: string; value: number }[];
  heatmap: {
    year: number;
    weeks: {
      week: number;
      sessions: number;
      level: 0 | 1 | 2 | 3 | 4;
      rest?: boolean;
      current?: boolean;
    }[];
  };
};

type ProgresoScreenProps = {
  // Estado de la carga de datos
  status: "loading" | "error" | "ready";
  // Datos del periodo elegido; solo se leen cuando status es "ready"
  data?: Progreso;
  // Periodo que se está viendo
  periodo: Periodo;
  // Se llama cuando la persona elige otro periodo
  onPeriodoChange: (periodo: Periodo) => void;
  // Se llama para volver a pedir los datos si no han llegado
  onRetry: () => void;
  // Se llama para empezar a registrar una sesión
  onRegistrarSesion: () => void;
};

const PERIODOS = [
  { value: "semana", label: "Semana" },
  { value: "mes", label: "Mes" },
  { value: "anio", label: "Año" },
];

const numero = new Intl.NumberFormat("es-ES", { useGrouping: "always" });

export function ProgresoScreen({
  status,
  data,
  periodo,
  onPeriodoChange,
  onRetry,
  onRegistrarSesion,
}: ProgresoScreenProps) {
  if (status !== "ready" || !data) {
    return <ScreenState status={status === "error" ? "error" : "loading"} onRetry={onRetry} />;
  }

  const { resumen, sesionesPorSemana, heatmap } = data;

  return (
    <main className="flex flex-col gap-6 bg-page p-4">
      <h1 className="text-h1 text-primary">Progreso</h1>

      <Tabs
        label="Periodo"
        tabs={PERIODOS}
        value={periodo}
        onChange={(value: string) => onPeriodoChange(value as Periodo)}
      >
        <div className="flex flex-col gap-6">
          <section aria-label="Resumen" className="flex flex-col gap-3">
            <StatCard label="Sesiones" value={numero.format(resumen.sesiones)} />
            <StatCard label="Minutos" value={numero.format(resumen.minutos)} unit="min" />
            <StatCard label="Volumen total" value={numero.format(resumen.volumenKg)} unit="kg" />
          </section>

          <BarChart
            title="Sesiones por semana"
            data={sesionesPorSemana}
            variant="surface"
            series="primary"
          />

          <HeatmapYear year={heatmap.year} weeks={heatmap.weeks} />
        </div>
      </Tabs>

      <Button variant="primary" fullWidth onClick={onRegistrarSesion}>
        Registrar sesión
      </Button>
    </main>
  );
}
