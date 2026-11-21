import { useState } from "react";
import { Chip } from "robur-ds";

type TipoDia = "empuje" | "tiron" | "pierna";

const TIPOS: { value: TipoDia; label: string }[] = [
  { value: "empuje", label: "Empuje" },
  { value: "tiron", label: "Tirón" },
  { value: "pierna", label: "Pierna" },
];

type DayTypeSelectorProps = {
  // Tipo de día elegido; si no se pasa, el componente lo gestiona solo
  value?: TipoDia;
  // Se llama con el tipo de día cuando la persona elige uno
  onChange?: (value: TipoDia) => void;
};

export function DayTypeSelector({ value, onChange }: DayTypeSelectorProps) {
  const [internal, setInternal] = useState<TipoDia | undefined>(value);
  const current = value ?? internal;

  function choose(next: TipoDia) {
    setInternal(next);
    onChange?.(next);
  }

  return (
    <div className="flex flex-col gap-2">
      <span id="day-type-label" className="text-label text-secondary">
        Tipo de día
      </span>
      <div
        role="group"
        aria-labelledby="day-type-label"
        className="flex flex-wrap gap-2"
      >
        {TIPOS.map((tipo) => (
          <Chip
            key={tipo.value}
            selected={current === tipo.value}
            onClick={() => choose(tipo.value)}
          >
            {tipo.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
