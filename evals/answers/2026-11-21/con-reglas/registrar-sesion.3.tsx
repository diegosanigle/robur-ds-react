import { useState } from "react";
import { SessionLog } from "robur-ds";

const TIPOS_DE_DIA = [
  { value: "empuje", label: "Empuje" },
  { value: "tiron", label: "Tirón" },
  { value: "pierna", label: "Pierna" },
];

const EJERCICIOS = [
  { id: "press-banca", name: "Press de banca", target: "4 × 8" },
  { id: "fondos", name: "Fondos", target: "3 × 10" },
  { id: "press-militar", name: "Press militar", target: "3 × 8" },
];

export function RegistrarSesionScreen() {
  const [dayType, setDayType] = useState<string | undefined>();
  const [done, setDone] = useState<string[]>([]);

  const toggle = (id: string) =>
    setDone((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const save = () => {
    // Aquí iría la llamada para guardar la sesión.
    console.log({ dayType, done });
  };

  return (
    <SessionLog
      title="Sesión de hoy"
      dayTypes={TIPOS_DE_DIA}
      dayType={dayType}
      onDayTypeChange={setDayType}
      exercises={EJERCICIOS}
      completed={done}
      onToggleExercise={toggle}
      saveLabel="Guardar sesión"
      onSave={save}
    />
  );
}
