import { useState } from 'react'
import { ConfirmSheet } from 'robur-ds'

type DeleteSessionSheetProps = {
  open: boolean
  onDelete: () => Promise<void> | void
  onClose: () => void
}

export function DeleteSessionSheet({ open, onDelete, onClose }: DeleteSessionSheetProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onDelete()
    } finally {
      setLoading(false)
    }
  }

  return (
    <ConfirmSheet
      open={open}
      title="¿Borrar esta sesión?"
      description="Se pierden sus ejercicios y sus cifras. No se puede recuperar."
      confirmLabel="Borrar sesión"
      onConfirm={handleConfirm}
      onCancel={onClose}
      loading={loading}
    />
  )
}
