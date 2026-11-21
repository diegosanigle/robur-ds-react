import { useState } from "react";
import { SessionLog } from "robur-ds";

const DAY_TYPES = [
  { value: "empuje", label: "Empuje" },
  { value: "tiron", label: "Tirón" },
  { value: "pierna", label: "Pierna" },
];

const EXERCISES: Record<string, { id: string; name: string; target: string }[]> = {
  empuje: [
    { id: "flexiones", name: "Flexiones", target: "4 × 12" },
    { id: "fondos", name: "Fondos", target: "3 × 10" },
  ],
  tiron: [
    { id: "dominadas", name: "Dominadas", target: "4 × 6" },
    { id: "remo", name: "Remo con mancuerna", target: "3 × 10" },
  ],
  pierna: [
    { id: "sentadilla", name: "Sentadilla", target: "4 × 12" },
    { id: "zancadas", name: "Zancadas", target: "3 × 10" },
  ],
};

export function RegistrarSesionHoy() {
  const [dayType, setDayType] = useState<string>("");
  const [done, setDone] = useState<string[]>([]);

  function handleDayTypeChange(value: string) {
    setDayType(value);
    setDone([]);
  }

  function handleToggle(id: string) {
    setDone((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );
  }

  function handleSave() {
    // Aquí va la llamada que guarda la sesión de hoy.
    console.log({ dayType, done });
  }

  return (
    <SessionLog
      dayTypes={DAY_TYPES}
      dayType={dayType}
      onDayTypeChange={handleDayTypeChange}
      exercises={dayType ? EXERCISES[dayType] : []}
      completed={done}
      onToggleExercise={handleToggle}
      onSave={handleSave}
    />
  );
}
