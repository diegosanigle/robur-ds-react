import { LineChart } from 'robur-ds'

const registros = [
  { label: '2026-09-05', value: 80 },
  { label: '2026-09-09', value: 80 },
  { label: '2026-09-12', value: 82.5 },
  { label: '2026-09-16', value: 82.5 },
  { label: '2026-09-19', value: 85 },
  { label: '2026-09-23', value: 85 },
  { label: '2026-09-26', value: 87.5 },
  { label: '2026-09-30', value: 85 },
  { label: '2026-10-03', value: 87.5 },
  { label: '2026-10-07', value: 90 },
  { label: '2026-10-10', value: 90 },
  { label: '2026-10-14', value: 92.5 },
]

export function PressBancaPesoMaximo() {
  return <LineChart title="Press banca, peso máximo (kg)" data={registros} />
}
