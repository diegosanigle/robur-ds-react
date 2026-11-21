import { Button, ListRow, StatCard } from 'robur-ds'

export type Exercise = {
  id: string
  name: string
  sets: number
}

type ExerciseListProps = {
  exercises: Exercise[]
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
