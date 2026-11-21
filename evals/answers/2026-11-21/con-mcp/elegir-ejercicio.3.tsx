import { Select } from 'robur-ds'

type Exercise = { id: string; name: string }

type Props = {
  exercises: Exercise[]
  value: string
  onChange: (id: string) => void
  error?: string
}

export function ExerciseSelect({ exercises, value, onChange, error }: Props) {
  return (
    <Select
      label="Ejercicio de la sesión"
      placeholder="Elige un ejercicio"
      hint="Entre tus ejercicios guardados"
      error={error}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={exercises.map((x) => ({ value: x.id, label: x.name }))}
    />
  )
}
