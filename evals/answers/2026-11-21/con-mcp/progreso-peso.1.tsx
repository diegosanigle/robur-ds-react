import { LineChart } from 'robur-ds'

type Registro = { fecha: string; pesoMaximo: number }

type PressBancaProgresoProps = {
  registros: Registro[]
}

export function PressBancaProgreso({ registros }: PressBancaProgresoProps) {
  const data = registros.slice(-12).map((r) => ({ label: r.fecha, value: r.pesoMaximo }))

  return <LineChart title="Press banca, peso máximo (kg)" data={data} />
}
