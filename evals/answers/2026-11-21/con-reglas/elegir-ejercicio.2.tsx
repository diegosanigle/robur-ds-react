import { Select } from "robur-ds";

type Exercise = {
  id: string;
  name: string;
};

type ExercisePickerProps = {
  // Los ejercicios que la persona tiene guardados
  exercises: Exercise[];
  // Id del ejercicio elegido; vacío si todavía no ha elegido
  value: string;
  // Se llama con el id del ejercicio elegido
  onChange: (id: string) => void;
  // Mensaje de error; dice cómo arreglarlo
  error?: string;
};

export function ExercisePicker({
  exercises,
  value,
  onChange,
  error,
}: ExercisePickerProps) {
  return (
    <Select
      label="Ejercicio"
      placeholder="Elige un ejercicio"
      options={exercises.map((exercise) => ({
        value: exercise.id,
        label: exercise.name,
      }))}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      error={error}
    />
  );
}
