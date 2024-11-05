import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/table/add')({
  component: () => <div>Hello /table/add!</div>
})