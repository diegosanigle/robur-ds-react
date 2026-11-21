import { Chip } from 'robur-ds'

export type DayType = 'push' | 'pull' | 'legs'

const options: { value: DayType; label: string }[] = [
  { value: 'push', label: 'Empuje' },
  { value: 'pull', label: 'Tirón' },
  { value: 'legs', label: 'Pierna' },
]

interface DayTypeSelectorProps {
  value: DayType
  onChange: (value: DayType) => void
}

export function DayTypeSelector({ value, onChange }: DayTypeSelectorProps) {
  return (
    <div role="group" aria-label="Tipo de día" className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Chip
          key={option.value}
          selected={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  )
}
