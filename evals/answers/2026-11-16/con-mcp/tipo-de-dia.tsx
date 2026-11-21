import { useState } from 'react'
import { Chip } from 'robur-ds'

const dayTypes = ['Empuje', 'Tirón', 'Pierna']

export function DayTypeSelector() {
  const [dayType, setDayType] = useState('Empuje')

  return (
    <div role="group" aria-label="Tipo de día" className="flex gap-2">
      {dayTypes.map((type) => (
        <Chip key={type} selected={dayType === type} onClick={() => setDayType(type)}>
          {type}
        </Chip>
      ))}
    </div>
  )
}
