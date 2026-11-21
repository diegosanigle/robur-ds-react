import { LineChart } from 'robur-ds'

const registros = [
  { label: '2026-09-05', value: 60 },
  { label: '2026-09-12', value: 62.5 },
  { label: '2026-09-19', value: 62.5 },
  { label: '2026-09-26', value: 65 },
  { label: '2026-10-03', value: 65 },
  { label: '2026-10-10', value: 67.5 },
  { label: '2026-10-17', value: 67.5 },
  { label: '2026-10-24', value: 70 },
  { label: '2026-10-31', value: 70 },
  { label: '2026-11-07', value: 72.5 },
  { label: '2026-11-14', value: 72.5 },
  { label: '2026-11-21', value: 75 },
]

export function PressBancaProgress() {
  return <LineChart title="Press banca, peso máximo (kg)" data={registros} />
}
