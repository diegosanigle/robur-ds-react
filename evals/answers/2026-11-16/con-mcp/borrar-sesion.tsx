import { useState } from 'react'
import { ConfirmSheet, Button } from 'robur-ds'

export function DeleteSessionSheet() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 600)
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Borrar sesión
      </Button>
      <ConfirmSheet
        open={open}
        title="¿Borrar esta sesión?"
        description="Se perderán sus ejercicios y las cifras que registraste."
        confirmLabel="Borrar sesión"
        loading={loading}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  )
}
