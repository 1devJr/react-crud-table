import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/table/details')({
  component: () => <div>Hello /table/details!</div>
})