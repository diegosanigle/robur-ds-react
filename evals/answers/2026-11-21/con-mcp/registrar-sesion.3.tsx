import { useState } from 'react'
import { SessionLog } from 'robur-ds'

const dayTypes = ['Empuje', 'Tirón', 'Pierna', 'Descanso activo']

const exercisesByDay = {
  Empuje: [
    { id: 'press-suelo', name: 'Press de suelo', target: '3 series × 12 reps', completed: false },
    { id: 'flexiones', name: 'Flexiones', target: '3 series × 10 reps', completed: false },
  ],
  Tirón: [
    { id: 'remo-mochila', name: 'Remo con mochila', target: '3 series × 12 reps', completed: false },
  ],
  Pierna: [
    { id: 'sentadilla', name: 'Sentadilla', target: '4 series × 15 reps', completed: false },
  ],
  'Descanso activo': [],
}

export function RegistrarSesionScreen() {
  const [dayType, setDayType] = useState(dayTypes[0])
  const [done, setDone] = useState<Record<string, boolean>>({})
  const [saving, setSaving] = useState(false)

  const exercises = exercisesByDay[dayType as keyof typeof exercisesByDay].map((e) => ({
    ...e,
    completed: done[e.id] ?? false,
  }))

  return (
    <SessionLog
      dayTypes={dayTypes}
      dayType={dayType}
      onDayTypeChange={setDayType}
      exercises={exercises}
      onExerciseChange={(id: string, completed: boolean) =>
        setDone((prev) => ({ ...prev, [id]: completed }))
      }
      onSave={() => {
        setSaving(true)
        setTimeout(() => setSaving(false), 600)
      }}
      saving={saving}
    />
  )
}
