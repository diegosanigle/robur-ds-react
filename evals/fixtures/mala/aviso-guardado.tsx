import { useEffect } from 'react'
import { Icon } from 'robur-ds'

export function SavedNotice({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [open, onClose])
  if (!open) return null
  return (
    <div role="status" className="fixed bottom-4 flex gap-2 rounded-lg bg-inverse text-on-inverse">
      <Icon name="check" />
      <p className="text-body">Sesión guardada</p>
    </div>
  )
}
