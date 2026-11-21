import { useMemo, useState } from "react";
import { Button } from "robur-ds";

type DayType = "push" | "pull" | "legs" | "fullbody" | "rest";

interface Exercise {
  id: string;
  name: string;
  detail: string;
}

interface SessionPayload {
  date: string;
  dayType: DayType;
  completedExerciseIds: string[];
}

interface LogSessionScreenProps {
  onSave?: (session: SessionPayload) => Promise<void> | void;
}

const DAY_TYPES: { value: DayType; label: string }[] = [
  { value: "push", label: "Empuje" },
  { value: "pull", label: "Tirón" },
  { value: "legs", label: "Piernas" },
  { value: "fullbody", label: "Cuerpo completo" },
  { value: "rest", label: "Descanso" },
];

const EXERCISES_BY_DAY: Record<DayType, Exercise[]> = {
  push: [
    { id: "pushups", name: "Flexiones", detail: "4 × 12" },
    { id: "pike", name: "Flexiones pike", detail: "3 × 10" },
    { id: "dips", name: "Fondos en silla", detail: "3 × 12" },
    { id: "plank-taps", name: "Plancha con toques de hombro", detail: "3 × 20" },
  ],
  pull: [
    { id: "rows", name: "Remo con mochila", detail: "4 × 12" },
    { id: "superman", name: "Superman", detail: "3 × 15" },
    { id: "curls", name: "Curl con banda", detail: "3 × 12" },
    { id: "dead-hang", name: "Colgado en barra", detail: "3 × 30 s" },
  ],
  legs: [
    { id: "squats", name: "Sentadillas", detail: "4 × 15" },
    { id: "lunges", name: "Zancadas", detail: "3 × 12 por pierna" },
    { id: "glute-bridge", name: "Puente de glúteo", detail: "3 × 15" },
    { id: "calf-raises", name: "Elevación de talones", detail: "4 × 20" },
  ],
  fullbody: [
    { id: "burpees", name: "Burpees", detail: "3 × 10" },
    { id: "squats-fb", name: "Sentadillas", detail: "3 × 15" },
    { id: "pushups-fb", name: "Flexiones", detail: "3 × 10" },
    { id: "mountain", name: "Escaladores", detail: "3 × 30 s" },
  ],
  rest: [
    { id: "mobility", name: "Movilidad", detail: "10 min" },
    { id: "walk", name: "Caminata ligera", detail: "20 min" },
  ],
};

export default function LogSessionScreen({ onSave }: LogSessionScreenProps) {
  const [dayType, setDayType] = useState<DayType | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const exercises = useMemo(
    () => (dayType ? EXERCISES_BY_DAY[dayType] : []),
    [dayType]
  );

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    []
  );

  const selectDay = (value: DayType) => {
    if (value === dayType) return;
    setDayType(value);
    setDone(new Set());
    setSaved(false);
    setError(null);
  };

  const toggle = (id: string) => {
    setSaved(false);
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const canSave = dayType !== null && !saving;

  const handleSave = async () => {
    if (!dayType) return;
    setSaving(true);
    setError(null);
    try {
      await onSave?.({
        date: new Date().toISOString().slice(0, 10),
        dayType,
        completedExerciseIds: Array.from(done),
      });
      setSaved(true);
    } catch {
      setError("No se pudo guardar la sesión. Inténtalo de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 px-4 py-6">
      <header>
        <p className="text-sm capitalize text-neutral-500">{today}</p>
        <h1 className="text-2xl font-bold">Registrar sesión de hoy</h1>
      </header>

      <section aria-labelledby="day-type-title" className="flex flex-col gap-3">
        <h2 id="day-type-title" className="text-lg font-semibold">
          Tipo de día
        </h2>
        <div role="radiogroup" aria-labelledby="day-type-title" className="flex flex-wrap gap-2">
          {DAY_TYPES.map(({ value, label }) => {
            const selected = dayType === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => selectDay(value)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  selected
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="exercises-title" className="flex flex-1 flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 id="exercises-title" className="text-lg font-semibold">
            Ejercicios
          </h2>
          {dayType && (
            <span className="text-sm text-neutral-500">
              {done.size}/{exercises.length} hechos
            </span>
          )}
        </div>

        {!dayType ? (
          <p className="rounded-lg border border-dashed border-neutral-300 p-4 text-sm text-neutral-500">
            Elige un tipo de día para ver los ejercicios.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {exercises.map((ex) => {
              const checked = done.has(ex.id);
              return (
                <li key={ex.id}>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                      checked
                        ? "border-neutral-900 bg-neutral-50"
                        : "border-neutral-200 bg-white hover:bg-neutral-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(ex.id)}
                      className="h-5 w-5 accent-neutral-900"
                    />
                    <span className="flex flex-1 flex-col">
                      <span className={`font-medium ${checked ? "line-through opacity-60" : ""}`}>
                        {ex.name}
                      </span>
                      <span className="text-sm text-neutral-500">{ex.detail}</span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <footer className="flex flex-col gap-2">
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        {saved && (
          <p role="status" className="text-sm text-green-700">
            Sesión guardada.
          </p>
        )}
        <Button onClick={handleSave} disabled={!canSave}>
          {saving ? "Guardando…" : "Guardar sesión"}
        </Button>
      </footer>
    </main>
  );
}
