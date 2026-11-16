import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { Icon, ICONS } from './Icon'

const meta = {
  title: 'Componentes/Icon',
  component: Icon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { name: 'home' },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = { args: { size: 'sm' } }

export const Large: Story = { args: { size: 'lg' } }

/** El juego completo, en su tamaño mayor. */
export const Juego: Story = {
  render: () => (
    <ul className="grid grid-cols-4 gap-6 text-primary">
      {(Object.keys(ICONS) as (keyof typeof ICONS)[]).map((name) => (
        <li key={name} className="flex flex-col items-center gap-2 text-label text-tertiary">
          <span className="text-primary">
            <Icon name={name} size="lg" />
          </span>
          {name}
        </li>
      ))}
    </ul>
  ),
}

/** Con label se anuncia como imagen; sin él, queda oculto a los lectores de pantalla. */
export const ConNombre: Story = {
  args: { name: 'check', label: 'Hecho' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('img', { name: 'Hecho' })).toBeVisible()
  },
}
