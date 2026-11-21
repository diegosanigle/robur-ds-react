import { useState } from 'react'
import { ConfirmSheet } from 'robur-ds'

type DeleteSessionSheetProps = {
  open: boolean
  onConfirm: () => Promise<void> | void
  onCancel: () => void
}

export function DeleteSessionSheet({ open, onConfirm, onCancel }: DeleteSessionSheetProps) {
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    setLoading(true)
    try {
      await onConfirm()
    } finally {
      setLoading(false)
    }
  }

  return (
    <ConfirmSheet
      open={open}
      title="¿Borrar esta sesión?"
      description="Se perderán sus ejercicios y sus cifras. No se puede recuperar."
      confirmLabel="Borrar sesión"
      onConfirm={handleConfirm}
      onCancel={onCancel}
      loading={loading}
    />
  )
}
