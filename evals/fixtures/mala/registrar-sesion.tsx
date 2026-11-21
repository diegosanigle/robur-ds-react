import { SessionLog } from 'robur-ds'

export function Registrar(props: Parameters<typeof SessionLog>[0]) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-body text-secondary">3/5 completados</p>
      <SessionLog {...props} />
    </div>
  )
}
