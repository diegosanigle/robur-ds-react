import { Button, EmptyState } from "robur-ds";

type HistoryEmptyWeekProps = {
  // Se llama al pulsar «Registrar sesión».
  onRegister: () => void;
};

export function HistoryEmptyWeek({ onRegister }: HistoryEmptyWeekProps) {
  return (
    <EmptyState
      title="Aún no hay sesiones esta semana"
      description="Aquí verás las sesiones que registres. Empieza guardando la primera."
      action={
        <Button variant="primary" onClick={onRegister}>
          Registrar sesión
        </Button>
      }
    />
  );
}
