import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { ConfirmSheet } from './ConfirmSheet'

const meta = {
  title: 'Patrones/ConfirmSheet',
  component: ConfirmSheet,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: {
    open: true,
    title: '¿Borrar esta sesión?',
    description: 'Se borran también sus ejercicios y deja de contar en el heatmap.',
    confirmLabel: 'Borrar sesión',
    onConfirm: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof ConfirmSheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = { args: { loading: true } }

/** Comprueba que confirmar y cancelar llaman cada uno a lo suyo. */
export const Interaccion: Story = {
  play: async ({ canvasElement, args }) => {
    const dialog = within(canvasElement.ownerDocument.body).getByRole('dialog', { name: '¿Borrar esta sesión?' })
    await userEvent.click(within(dialog).getByRole('button', { name: 'Borrar sesión' }))
    await expect(args.onConfirm).toHaveBeenCalledOnce()
    await userEvent.click(within(dialog).getByRole('button', { name: 'Cancelar' }))
    await expect(args.onCancel).toHaveBeenCalled()
  },
}
