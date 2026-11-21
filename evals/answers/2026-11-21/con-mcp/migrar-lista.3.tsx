import { ListRow, Button, StatCard } from 'robur-ds'

export interface Exercise {
  id: string
  name: string
  series: number
}

export interface ExerciseListProps {
  exercises: Exercise[]
  totalVolume: number
  onEdit: (exercise: Exercise) => void
}

const formatNumber = new Intl.NumberFormat('es-ES', { useGrouping: 'always' })

export function ExerciseList({ exercises, totalVolume, onEdit }: ExerciseListProps) {
  return (
    <>
      <ul>
        {exercises.map((exercise) => (
          <ListRow
            key={exercise.id}
            title={exercise.name}
            detail={`${exercise.series} series`}
          >
            <Button variant="text" onClick={() => onEdit(exercise)}>
              Editar
            </Button>
          </ListRow>
        ))}
      </ul>
      <StatCard
        label="Volumen total"
        value={formatNumber.format(totalVolume)}
        unit="kg"
      />
    </>
  )
}
