import { useState } from 'react'
import { SessionLog } from 'robur-ds'

type Exercise = { id: string; name: string; target?: string; completed: boolean }

const DAY_TYPES = ['Empuje', 'Tirón', 'Pierna', 'Descanso activo']

const EXERCISES_BY_DAY: Record<string, Exercise[]> = {
  Empuje: [
    { id: 'flexiones', name: 'Flexiones', target: '3 series × 12 reps', completed: false },
    { id: 'fondos', name: 'Fondos en silla', target: '3 series × 10 reps', completed: false },
  ],
  Tirón: [
    { id: 'remo', name: 'Remo con mochila', target: '3 series × 12 reps', completed: false },
  ],
  Pierna: [
    { id: 'sentadillas', name: 'Sentadillas', target: '4 series × 15 reps', completed: false },
  ],
  'Descanso activo': [
    { id: 'movilidad', name: 'Movilidad', target: '10 minutos', completed: false },
  ],
}

export function RegistrarSesion() {
  const [dayType, setDayType] = useState(DAY_TYPES[0])
  const [exercises, setExercises] = useState<Exercise[]>(EXERCISES_BY_DAY[DAY_TYPES[0]])
  const [saving, setSaving] = useState(false)

  const handleDayTypeChange = (next: string) => {
    setDayType(next)
    setExercises(EXERCISES_BY_DAY[next] ?? [])
  }

  const handleExerciseChange = (id: string, completed: boolean) => {
    setExercises((prev) => prev.map((e) => (e.id === id ? { ...e, completed } : e)))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 400))
    } finally {
      setSaving(false)
    }
  }

  return (
    <SessionLog
      dayTypes={DAY_TYPES}
      dayType={dayType}
      onDayTypeChange={handleDayTypeChange}
      exercises={exercises}
      onExerciseChange={handleExerciseChange}
      onSave={handleSave}
      saving={saving}
    />
  )
}
