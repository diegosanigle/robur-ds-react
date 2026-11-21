import { Button, ListRow } from "robur-ds";

export interface Exercise {
  id: string;
  name: string;
  series: number;
}

export interface ExerciseListProps {
  /** Ejercicios que se muestran, uno por fila. */
  exercises: Exercise[];
  /** Volumen total de la sesión, en kg. */
  totalVolumeKg: number;
  /** Se llama con el ejercicio cuyo botón Editar se ha pulsado. */
  onEdit: (exercise: Exercise) => void;
}

const volumeFormat = new Intl.NumberFormat("es-ES", { useGrouping: "always" });

export function ExerciseList({ exercises, totalVolumeKg, onEdit }: ExerciseListProps) {
  return (
    <div className="flex flex-col gap-3">
      <ul>
        {exercises.map((exercise) => (
          <ListRow
            key={exercise.id}
            title={exercise.name}
            detail={`${exercise.series} series`}
          >
            <Button
              variant="text"
              aria-label={`Editar ${exercise.name}`}
              onClick={() => onEdit(exercise)}
            >
              Editar
            </Button>
          </ListRow>
        ))}
      </ul>
      <p className="text-sm text-secondary">
        Volumen total: {volumeFormat.format(totalVolumeKg)} kg
      </p>
    </div>
  );
}
