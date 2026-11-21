import { Button, ListRow, StatCard } from 'robur-ds';

export interface Ejercicio {
  id: string;
  nombre: string;
  series: number;
}

export interface ListaEjerciciosProps {
  /** Ejercicios que se muestran, uno por fila. */
  ejercicios: Ejercicio[];
  /** Volumen total en kg. */
  volumenTotal: number;
  /** Se llama con el ejercicio cuyo botón Editar se ha pulsado. */
  onEditar: (ejercicio: Ejercicio) => void;
}

const formatoCifra = new Intl.NumberFormat('es-ES', { useGrouping: 'always' });

export function ListaEjercicios({ ejercicios, volumenTotal, onEditar }: ListaEjerciciosProps) {
  return (
    <div className="flex flex-col gap-4">
      <div role="list" className="flex flex-col">
        {ejercicios.map((ejercicio) => (
          <ListRow
            key={ejercicio.id}
            title={ejercicio.nombre}
            detail={`${ejercicio.series} series`}
          >
            <Button
              variant="text"
              aria-label={`Editar ${ejercicio.nombre}`}
              onClick={() => onEditar(ejercicio)}
            >
              Editar
            </Button>
          </ListRow>
        ))}
      </div>
      <StatCard label="Volumen total" value={formatoCifra.format(volumenTotal)} unit="kg" />
    </div>
  );
}
