import { ListRow, Button, StatCard } from 'robur-ds'

export interface Exercise {
  id: string
  name: string
  sets: number
}

export interface ExerciseListProps {
  exercises: Exercise[]
  /** Ya formateado en español, por ejemplo "2.480" */
  totalVolume: string
  onEdit: (exercise: Exercise) => void
}

export function ExerciseList({ exercises, totalVolume, onEdit }: ExerciseListProps) {
  return (
    <>
      <ul>
        {exercises.map((exercise) => (
          <ListRow key={exercise.id} title={exercise.name} detail={`${exercise.sets} series`}>
            <Button variant="text" onClick={() => onEdit(exercise)}>
              Editar
            </Button>
          </ListRow>
        ))}
      </ul>
      <StatCard label="Volumen total" value={totalVolume} unit="kg" />
    </>
  )
}
