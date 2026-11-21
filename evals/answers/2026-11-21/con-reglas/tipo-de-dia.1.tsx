import { Chip } from "robur-ds";

export type DayType = "empuje" | "tiron" | "pierna";

const DAY_TYPES: { value: DayType; label: string }[] = [
  { value: "empuje", label: "Empuje" },
  { value: "tiron", label: "Tirón" },
  { value: "pierna", label: "Pierna" },
];

type DayTypePickerProps = {
  // Tipo de día elegido; null si todavía no se ha elegido ninguno
  value: DayType | null;
  // Se llama con el tipo de día que la persona acaba de elegir
  onChange: (value: DayType) => void;
};

export function DayTypePicker({ value, onChange }: DayTypePickerProps) {
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
        {DAY_TYPES.map((dayType) => (
          <Chip
            key={dayType.value}
            selected={value === dayType.value}
            onClick={() => onChange(dayType.value)}
          >
            {dayType.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
