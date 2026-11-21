import { LineChart } from "robur-ds";

type Registro = {
  /** Fecha o etiqueta corta del registro, por ejemplo "12 oct". */
  label: string;
  /** Peso máximo levantado en press banca, en kg. */
  value: number;
};

type PressBancaMaximoProps = {
  /** Registros de press banca, del más antiguo al más reciente. */
  registros: Registro[];
};

export function PressBancaMaximo({ registros }: PressBancaMaximoProps) {
  const ultimos = registros.slice(-12);

  return (
    <LineChart
      title="Peso máximo en press banca (kg)"
      data={ultimos}
      variant="surface"
      series="primary"
    />
  );
}
