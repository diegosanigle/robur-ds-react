import { useState } from 'react'
import { Chip } from 'robur-ds'

const DAY_TYPES = ['Empuje', 'Tirón', 'Pierna']

export function DayTypeSelector() {
  const [dayType, setDayType] = useState(DAY_TYPES[0])

  return (
    <div role="group" aria-label="Tipo de día" className="flex flex-wrap gap-2">
      {DAY_TYPES.map((type) => (
        <Chip key={type} selected={dayType === type} onClick={() => setDayType(type)}>
          {type}
        </Chip>
      ))}
    </div>
  )
}
