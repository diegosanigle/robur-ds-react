import { BarChart, Button, Card, HeatmapYear, ScreenState, StatCard, Tabs } from 'robur-ds'

type Period = 'week' | 'month' | 'year'

type ProgressData = {
  sessions: number
  minutes: number
  volumeKg: number
  sessionsPerWeek: { label: string; value: number }[]
  year: number
  weeks: { week: number; sessions: number }[]
}

type ProgressScreenProps = {
  status: 'loading' | 'error' | 'ready'
  data?: ProgressData
  period: Period
  onPeriodChange: (period: Period) => void
  onRetry: () => void
  onRegisterSession: () => void
  onWeekSelect?: (week: number) => void
}

const periods = [
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mes' },
  { value: 'year', label: 'Año' },
]

const formatNumber = (n: number) => new Intl.NumberFormat('es-ES', { useGrouping: 'always' }).format(n)

export function ProgressScreen({ status, data, period, onPeriodChange, onRetry, onRegisterSession, onWeekSelect }: ProgressScreenProps) {
  return (
    <main className="flex flex-col gap-6 p-5 bg-page text-primary">
      <h1 className="text-h1">Progreso</h1>
      <Tabs label="Periodo" tabs={periods} value={period} onChange={(v) => onPeriodChange(v as Period)}>
        {status === 'loading' && <ScreenState state="loading" />}
        {status === 'error' && (
          <ScreenState state="error" message="No han llegado tus datos de progreso. Revisa la conexión e inténtalo de nuevo." onRetry={onRetry} />
        )}
        {status === 'ready' && data && (
          <div className="flex flex-col gap-4">
            <StatCard label="Sesiones" value={formatNumber(data.sessions)} />
            <StatCard label="Minutos" value={formatNumber(data.minutes)} unit="min" />
            <StatCard label="Volumen total" value={formatNumber(data.volumeKg)} unit="kg" />
            <BarChart title="Sesiones por semana" data={data.sessionsPerWeek} />
            <Card>
              <HeatmapYear year={data.year} weeks={data.weeks} onWeekSelect={onWeekSelect} />
            </Card>
          </div>
        )}
      </Tabs>
      <Button fullWidth onClick={onRegisterSession}>Registrar sesión</Button>
    </main>
  )
}
