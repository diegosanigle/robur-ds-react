import { useState, type FormEvent } from "react";
import { Button, FormLayout, Input } from "robur-ds";

type NuevoEjercicio = {
  nombre: string;
  series: number;
  repeticiones: number;
};

type Props = {
  // Se llama con los datos del ejercicio cuando se pulsa «Guardar ejercicio»
  onSave: (ejercicio: NuevoEjercicio) => void;
  // Se llama cuando se pulsa «Cancelar»
  onCancel: () => void;
};

export function NuevoEjercicioForm({ onSave, onCancel }: Props) {
  const [nombre, setNombre] = useState("");
  const [series, setSeries] = useState("");
  const [repeticiones, setRepeticiones] = useState("");
  const [intentado, setIntentado] = useState(false);

  const errorNombre =
    intentado && nombre.trim() === ""
      ? "Escribe un nombre para el ejercicio"
      : undefined;
  const errorSeries =
    intentado && !(Number(series) >= 1)
      ? "Escribe cuántas series haces, con un número desde 1"
      : undefined;
  const errorRepeticiones =
    intentado && !(Number(repeticiones) >= 1)
      ? "Escribe cuántas repeticiones haces, con un número desde 1"
      : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIntentado(true);
    if (
      nombre.trim() === "" ||
      !(Number(series) >= 1) ||
      !(Number(repeticiones) >= 1)
    ) {
      return;
    }
    onSave({
      nombre: nombre.trim(),
      series: Number(series),
      repeticiones: Number(repeticiones),
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormLayout
        title="Nuevo ejercicio"
        actions={
          <>
            <Button variant="secondary" type="button" onClick={onCancel}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar ejercicio
            </Button>
          </>
        }
      >
        <Input
          label="Nombre del ejercicio"
          value={nombre}
          error={errorNombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <Input
          label="Series"
          numeric
          value={series}
          error={errorSeries}
          onChange={(e) => setSeries(e.target.value)}
        />
        <Input
          label="Repeticiones"
          numeric
          value={repeticiones}
          error={errorRepeticiones}
          onChange={(e) => setRepeticiones(e.target.value)}
        />
      </FormLayout>
    </form>
  );
}
