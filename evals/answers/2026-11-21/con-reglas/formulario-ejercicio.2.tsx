import { useState, type FormEvent } from "react";
import { Button, FormLayout, Input } from "robur-ds";

export interface NuevoEjercicioValues {
  nombre: string;
  series: number;
  repeticiones: number;
}

interface NuevoEjercicioFormProps {
  // Se llama con los datos del ejercicio cuando el formulario es válido
  onSave: (values: NuevoEjercicioValues) => void;
  // Se llama cuando la persona cancela y vuelve atrás
  onCancel: () => void;
}

export function NuevoEjercicioForm({ onSave, onCancel }: NuevoEjercicioFormProps) {
  const [nombre, setNombre] = useState("");
  const [series, setSeries] = useState("");
  const [repeticiones, setRepeticiones] = useState("");
  const [errors, setErrors] = useState<{
    nombre?: string;
    series?: string;
    repeticiones?: string;
  }>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: typeof errors = {};
    const seriesNum = Number(series.replace(",", "."));
    const repsNum = Number(repeticiones.replace(",", "."));

    if (!nombre.trim()) next.nombre = "Escribe un nombre para el ejercicio";
    if (!Number.isInteger(seriesNum) || seriesNum < 1) {
      next.series = "Escribe un número de series, como 3";
    }
    if (!Number.isInteger(repsNum) || repsNum < 1) {
      next.repeticiones = "Escribe un número de repeticiones, como 12";
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSave({ nombre: nombre.trim(), series: seriesNum, repeticiones: repsNum });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormLayout
        title="Nuevo ejercicio"
        actions={
          <>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Guardar ejercicio
            </Button>
          </>
        }
      >
        <Input
          label="Nombre del ejercicio"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          error={errors.nombre}
        />
        <Input
          label="Series"
          numeric
          value={series}
          onChange={(e) => setSeries(e.target.value)}
          error={errors.series}
        />
        <Input
          label="Repeticiones"
          numeric
          value={repeticiones}
          onChange={(e) => setRepeticiones(e.target.value)}
          error={errors.repeticiones}
        />
      </FormLayout>
    </form>
  );
}
