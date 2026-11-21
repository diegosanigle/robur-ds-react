import { useState } from 'react'
import { Select } from 'robur-ds'

type Exercise = { id: string; name: string }

type SessionExerciseSelectProps = {
  exercises: Exercise[]
  value?: string
  onChange?: (id: string) => void
}

export function SessionExerciseSelect({ exercises, value = '', onChange }: SessionExerciseSelectProps) {
  const [touched, setTouched] = useState(false)
  const error = touched && !value ? 'Elige un ejercicio' : undefined

  return (
    <Select
      label="Ejercicio de la sesión"
      placeholder="Elige un ejercicio"
      hint="Entre los ejercicios que tienes guardados"
      error={error}
      value={value}
      onBlur={() => setTouched(true)}
      onChange={(e) => onChange?.(e.target.value)}
      options={exercises.map((exercise) => ({ value: exercise.id, label: exercise.name }))}
    />
  )
}
