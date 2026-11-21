import { useState, type FormEvent } from 'react'
import { FormLayout, Input } from 'robur-ds'

type NewExercise = { name: string; sets: number; reps: number }

type NewExerciseFormProps = {
  onSave: (exercise: NewExercise) => void | Promise<void>
  onCancel: () => void
}

export function NewExerciseForm({ onSave, onCancel }: NewExerciseFormProps) {
  const [name, setName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [errors, setErrors] = useState<{ name?: string; sets?: string; reps?: string }>({})
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault?.()
    const next: typeof errors = {}
    const setsNumber = Number(sets)
    const repsNumber = Number(reps)
    if (!name.trim()) next.name = 'Escribe un nombre para el ejercicio'
    if (!Number.isInteger(setsNumber) || setsNumber < 1) next.sets = 'Escribe un número de series, por ejemplo 3'
    if (!Number.isInteger(repsNumber) || repsNumber < 1) next.reps = 'Escribe un número de repeticiones, por ejemplo 10'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    try {
      await onSave({ name: name.trim(), sets: setsNumber, reps: repsNumber })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <FormLayout
      title="Nuevo ejercicio"
      submitLabel="Guardar ejercicio"
      onSubmit={handleSubmit}
      cancelLabel="Cancelar"
      onCancel={onCancel}
      submitting={submitting}
    >
      <Input
        label="Nombre"
        placeholder="Sentadilla goblet"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
      <Input
        label="Series"
        numeric
        placeholder="3"
        value={sets}
        onChange={(e) => setSets(e.target.value)}
        error={errors.sets}
      />
      <Input
        label="Repeticiones"
        numeric
        placeholder="10"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        error={errors.reps}
      />
    </FormLayout>
  )
}
