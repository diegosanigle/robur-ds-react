import { useState, type FormEvent } from 'react'
import { FormLayout, Input } from 'robur-ds'

type NewExerciseFormProps = {
  onSave: (exercise: { name: string; sets: number; reps: number }) => void | Promise<void>
  onCancel: () => void
}

export function NewExerciseForm({ onSave, onCancel }: NewExerciseFormProps) {
  const [name, setName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [errors, setErrors] = useState<{ name?: string; sets?: string; reps?: string }>({})
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const next: typeof errors = {}
    if (!name.trim()) next.name = 'Escribe un nombre para el ejercicio'
    const setsNumber = Number(sets)
    if (!Number.isInteger(setsNumber) || setsNumber < 1) next.sets = 'Escribe un número de series, por ejemplo 3'
    const repsNumber = Number(reps)
    if (!Number.isInteger(repsNumber) || repsNumber < 1) next.reps = 'Escribe un número de repeticiones, por ejemplo 12'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault?.()
    if (!validate()) return
    setSubmitting(true)
    try {
      await onSave({ name: name.trim(), sets: Number(sets), reps: Number(reps) })
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
        label="Nombre del ejercicio"
        placeholder="Sentadilla goblet"
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
