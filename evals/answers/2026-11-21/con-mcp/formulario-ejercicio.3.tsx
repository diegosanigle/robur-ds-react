import { useState, type FormEvent } from 'react'
import { FormLayout, Input } from 'robur-ds'

type NewExercise = { name: string; sets: number; reps: number }

type Props = {
  onSave: (exercise: NewExercise) => void
  onCancel: () => void
}

export function NewExerciseForm({ onSave, onCancel }: Props) {
  const [name, setName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [errors, setErrors] = useState<{ name?: string; sets?: string; reps?: string }>({})

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault()
    const next: typeof errors = {}
    const setsN = Number(sets)
    const repsN = Number(reps)
    if (!name.trim()) next.name = 'Escribe un nombre para el ejercicio'
    if (!Number.isInteger(setsN) || setsN < 1) next.sets = 'Escribe un número de series, por ejemplo 3'
    if (!Number.isInteger(repsN) || repsN < 1) next.reps = 'Escribe un número de repeticiones, por ejemplo 12'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    onSave({ name: name.trim(), sets: setsN, reps: repsN })
  }

  return (
    <FormLayout
      title="Nuevo ejercicio"
      submitLabel="Guardar ejercicio"
      onSubmit={handleSubmit}
      cancelLabel="Cancelar"
      onCancel={onCancel}
    >
      <Input
        label="Nombre"
        placeholder="Sentadilla búlgara"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
      <Input
        label="Series"
        numeric
        value={sets}
        onChange={(e) => setSets(e.target.value)}
        error={errors.sets}
      />
      <Input
        label="Repeticiones"
        numeric
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        error={errors.reps}
      />
    </FormLayout>
  )
}
