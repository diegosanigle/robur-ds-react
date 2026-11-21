import { Button, StatCard, Tabs, BarChart, HeatmapYear, Card, ScreenState } from 'robur-ds'

type Period = 'week' | 'month' | 'year'

export interface ProgressData {
  sessions: number
  minutes: number
  volumeKg: number
  sessionsPerWeek: { label: string; value: number }[]
  year: number
  weeks: { week: number; sessions: number }[]
}

export interface ProgressScreenProps {
  status: 'loading' | 'error' | 'ready'
  data?: ProgressData
  period: Period
  onPeriodChange: (period: Period) => void
  onRetry: () => void
  onRegisterSession: () => void
  onWeekSelect?: (week: number) => void
}

const nf = new Intl.NumberFormat('es-ES', { useGrouping: 'always', maximumFractionDigits: 1 })

export function ProgressScreen({
  status,
  data,
  period,
  onPeriodChange,
  onRetry,
  onRegisterSession,
  onWeekSelect,
}: ProgressScreenProps) {
  return (
    <main className="flex flex-col gap-4 bg-page p-4">
      <h1 className="text-h2 text-primary">Progreso</h1>
      <Tabs
        label="Periodo"
        tabs={[
          { value: 'week', label: 'Semana' },
          { value: 'month', label: 'Mes' },
          { value: 'year', label: 'Año' },
        ]}
        value={period}
        onChange={(v) => onPeriodChange(v as Period)}
      >
        {status === 'loading' && <ScreenState state="loading" />}
        {status === 'error' && (
          <ScreenState
            state="error"
            message="No han llegado tus datos de progreso. Comprueba la conexión y vuelve a intentarlo."
            onRetry={onRetry}
          />
        )}
        {status === 'ready' && data && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-2">
              <StatCard label="Sesiones" value={nf.format(data.sessions)} />
              <StatCard label="Minutos" value={nf.format(data.minutes)} />
              <StatCard label="Volumen" value={nf.format(data.volumeKg)} unit="kg" />
            </div>
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
