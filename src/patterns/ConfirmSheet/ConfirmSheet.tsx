import { Button } from '../../components/Button'
import { Sheet } from '../../components/Sheet'

export interface ConfirmSheetProps {
  /** La hoja está abierta. */
  open: boolean
  /** Qué se va a hacer, como pregunta: «¿Borrar esta sesión?». */
  title: string
  /** Una frase con lo que se pierde. */
  description: string
  /** Texto del botón que confirma: el verbo de la acción («Borrar sesión»). */
  confirmLabel: string
  /** Se llama al confirmar. */
  onConfirm: () => void
  /** Se llama al cancelar o al cerrar la hoja. */
  onCancel: () => void
  /** La confirmación está en curso: bloquea los botones. */
  loading?: boolean
}

export function ConfirmSheet({ open, title, description, confirmLabel, onConfirm, onCancel, loading = false }: ConfirmSheetProps) {
  return (
    <Sheet open={open} onClose={onCancel} title={title}>
      <p className="text-body text-secondary">{description}</p>
      <div className="mt-6 flex flex-col gap-3">
        <Button variant="danger" fullWidth loading={loading} onClick={onConfirm}>
          {confirmLabel}
        </Button>
        <Button variant="secondary" fullWidth disabled={loading} onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </Sheet>
  )
}
