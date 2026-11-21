import { EmptyState, Button } from "robur-ds";

type HistoryEmptyProps = {
  // Se llama al pulsar «Registrar sesión»
  onRegister: () => void;
};

export function HistoryEmpty({ onRegister }: HistoryEmptyProps) {
  return (
    <EmptyState
      title="Aún no hay sesiones esta semana"
      description="Aquí verás las sesiones que registres. Empieza con la de hoy."
      action={
        <Button variant="primary" onClick={onRegister}>
          Registrar sesión
        </Button>
      }
    />
  );
}
