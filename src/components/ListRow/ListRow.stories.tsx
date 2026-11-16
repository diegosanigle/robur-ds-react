import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Button } from '../Button'
import { ListRow } from './ListRow'

const meta = {
  title: 'Componentes/ListRow',
  component: ListRow,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { title: 'Press de hombro', detail: '3 × 12' },
  decorators: [
    (Story) => (
      <ul className="w-96">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof ListRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = { args: { title: 'Empuje', detail: undefined, value: '12' } }

export const Selectable: Story = { args: { title: 'Empuje', detail: 'Lun 9 nov · 6 ejercicios', onSelect: fn() } }

export const WithActions: Story = {
  args: {
    children: (
      <>
        <Button variant="text">Editar</Button>
        <Button variant="text">Quitar</Button>
      </>
    ),
  },
}

/** Una lista de tres filas: la última no lleva línea debajo. */
export const Lista: Story = {
  render: () => (
    <>
      <ListRow title="Empuje" detail="Lun 9 nov · 6 ejercicios" onSelect={() => {}} />
      <ListRow title="Tirón" detail="Mié 11 nov · 5 ejercicios" onSelect={() => {}} />
      <ListRow title="Pierna" detail="Vie 13 nov · 6 ejercicios" onSelect={() => {}} />
    </>
  ),
}

/** Comprueba que pulsar la fila llama a onSelect y que las acciones son botones aparte. */
export const Interaccion: Story = {
  args: {
    onSelect: fn(),
    children: <Button variant="text">Quitar</Button>,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /Press de hombro/ }))
    await expect(args.onSelect).toHaveBeenCalledOnce()
    await expect(canvas.getByRole('button', { name: 'Quitar' })).toBeVisible()
  },
}
