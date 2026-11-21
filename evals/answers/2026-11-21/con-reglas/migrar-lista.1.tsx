import { Button, ListRow, StatCard } from "robur-ds";

export interface Exercise {
  id: string;
  name: string;
  sets: number;
}

export interface ExerciseListProps {
  /** Ejercicios que se muestran, uno por fila. */
  exercises: Exercise[];
  /** Volumen total en kg. */
  totalVolume: number;
  /** Se llama con el id del ejercicio cuando se pulsa Editar. */
  onEdit: (id: string) => void;
}

const formatNumber = new Intl.NumberFormat("es-ES", { useGrouping: "always" });

function setsLabel(sets: number) {
  return sets === 1 ? "1 serie" : `${sets} series`;
}

export function ExerciseList({ exercises, totalVolume, onEdit }: ExerciseListProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        {exercises.map((exercise) => (
          <ListRow
            key={exercise.id}
            title={exercise.name}
            detail={setsLabel(exercise.sets)}
          >
            <Button variant="text" onClick={() => onEdit(exercise.id)}>
              Editar
            </Button>
          </ListRow>
        ))}
      </div>
      <StatCard
        label="Volumen total"
        value={formatNumber.format(totalVolume)}
        unit="kg"
      />
    </div>
  );
}
