import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { HeatmapYear } from './HeatmapYear'

// Un año de muestra: el dato de cada semana sale de una fórmula fija para que la story no cambie.
const year = (total: number, current: number) =>
  Array.from({ length: total }, (_, i) => {
    const week = i + 1
    if (week > current) return { week, sessions: 0 }
    return { week, sessions: (week * 7) % 5, rest: week === 20 || week === 33, current: week === current }
  })

const meta = {
  title: 'Componentes/HeatmapYear',
  component: HeatmapYear,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { year: 2026, weeks: year(53, 46), onWeekSelect: fn() },
  decorators: [(Story) => <div className="w-96 rounded-xl bg-surface p-6"><Story /></div>],
} satisfies Meta<typeof HeatmapYear>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CincuentaYDosSemanas: Story = { args: { year: 2027, weeks: year(52, 3) } }

/** Comprueba que la rejilla tiene nombre y que pulsar una semana avisa con su número. */
export const Interaccion: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const grid = canvas.getByRole('group', { name: 'Semanas de 2026' })
    await expect(within(grid).getAllByRole('button')).toHaveLength(53)
    await userEvent.click(canvas.getByRole('button', { name: /^Semana 14,/ }))
    await expect(args.onWeekSelect).toHaveBeenCalledWith(14)
  },
}
