import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/table/edit')({
  component: () => <div>Hello /table/edit!</div>
})