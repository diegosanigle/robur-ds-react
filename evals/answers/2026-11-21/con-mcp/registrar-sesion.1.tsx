import { useState } from 'react'
import { SessionLog } from 'robur-ds'

const dayTypes = ['Empuje', 'Tirón', 'Pierna', 'Descanso activo']

const exercisesByDay: Record<string, { id: string; name: string; target: string; completed: boolean }[]> = {
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

export default function RegistrarSesionScreen() {
  const [dayType, setDayType] = useState(dayTypes[0])
  const [byDay, setByDay] = useState(exercisesByDay)
  const [saving, setSaving] = useState(false)

  const handleExerciseChange = (id: string, completed: boolean) =>
    setByDay((prev) => ({
      ...prev,
      [dayType]: prev[dayType].map((e) => (e.id === id ? { ...e, completed } : e)),
    }))

  const handleSave = async () => {
    setSaving(true)
    try {
      await new Promise((r) => setTimeout(r, 500))
    } finally {
      setSaving(false)
    }
  }

  return (
    <SessionLog
      dayTypes={dayTypes}
      dayType={dayType}
      onDayTypeChange={setDayType}
      exercises={byDay[dayType]}
      onExerciseChange={handleExerciseChange}
      onSave={handleSave}
      saving={saving}
    />
  )
}
