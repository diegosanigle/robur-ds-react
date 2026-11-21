import { Button, Card, StatCard, Tabs, BarChart, HeatmapYear, ScreenState } from 'robur-ds'

type Period = 'week' | 'month' | 'year'

type ProgressData = {
  sessions: number
  minutes: number
  volumeKg: number
  weeklySessions: { label: string; value: number }[]
  year: number
  heatmap: { week: number; sessions: number; rest?: boolean; current?: boolean }[]
}

type ProgressScreenProps = {
  period: Period
  onPeriodChange: (period: Period) => void
  status: 'loading' | 'error' | 'ready'
  data?: ProgressData
  onRetry: () => void
  onLogSession: () => void
  onWeekSelect?: (week: number) => void
}

const periods = [
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mes' },
  { value: 'year', label: 'Año' },
]

const nf = new Intl.NumberFormat('es-ES')

export function ProgressScreen({
  period,
  onPeriodChange,
  status,
  data,
  onRetry,
  onLogSession,
  onWeekSelect,
}: ProgressScreenProps) {
  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="text-h1 text-primary">Progreso</h1>

      <Tabs
        label="Periodo"
        tabs={periods}
        value={period}
        onChange={(value: string) => onPeriodChange(value as Period)}
      >
        {status === 'loading' && <ScreenState state="loading" />}

        {status === 'error' && (
          <ScreenState
            state="error"
            message="No han llegado tus datos de progreso. Revisa la conexión e inténtalo de nuevo."
            onRetry={onRetry}
          />
        )}

        {status === 'ready' && data && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
              <StatCard label="Sesiones" value={nf.format(data.sessions)} />
              <StatCard label="Minutos" value={nf.format(data.minutes)} />
              <StatCard label="Volumen total" value={nf.format(data.volumeKg)} unit="kg" />
            </div>

            <BarChart title="Sesiones por semana" data={data.weeklySessions} />

            <Card>
              <HeatmapYear year={data.year} weeks={data.heatmap} onWeekSelect={onWeekSelect} />
            </Card>
          </div>
        )}
      </Tabs>

      <Button variant="primary" fullWidth onClick={onLogSession}>
        Registrar sesión
      </Button>
    </main>
  )
}
