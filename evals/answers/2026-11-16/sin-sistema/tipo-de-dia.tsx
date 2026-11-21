import { useRef } from "react";

export type DayType = "push" | "pull" | "legs";

const OPTIONS: { value: DayType; label: string }[] = [
  { value: "push", label: "Empuje" },
  { value: "pull", label: "Tirón" },
  { value: "legs", label: "Pierna" },
];

interface DayTypeSelectorProps {
  value: DayType;
  onChange: (value: DayType) => void;
  label?: string;
  className?: string;
}

export function DayTypeSelector({
  value,
  onChange,
  label = "Tipo de día",
  className = "",
}: DayTypeSelectorProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      next = (index + 1) % OPTIONS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      next = (index - 1 + OPTIONS.length) % OPTIONS.length;
    } else {
      return;
    }
    e.preventDefault();
    onChange(OPTIONS[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`grid grid-cols-3 gap-1 rounded-xl bg-neutral-100 p-1 ${className}`}
    >
      {OPTIONS.map((option, index) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={[
              "min-h-11 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900",
              selected
                ? "bg-neutral-900 text-white shadow-sm"
                : "text-neutral-600 hover:bg-neutral-200",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default DayTypeSelector;
