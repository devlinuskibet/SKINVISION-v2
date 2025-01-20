import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(layouts)/_dashboardLayout')({
  component: () => <div>Hello /(layouts)/_dashboardLayout!</div>,
})
