import { Select } from 'robur-ds'

type Exercise = { id: string; name: string }

type Props = {
  exercises: Exercise[]
  value: string
  onChange: (id: string) => void
  error?: string
}

export function SessionExerciseSelect({ exercises, value, onChange, error }: Props) {
  return (
    <Select
      label="Ejercicio de la sesión"
      placeholder="Elige un ejercicio"
      hint="Entre tus ejercicios guardados"
      error={error}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={exercises.map((ex) => ({ value: ex.id, label: ex.name }))}
    />
  )
}
