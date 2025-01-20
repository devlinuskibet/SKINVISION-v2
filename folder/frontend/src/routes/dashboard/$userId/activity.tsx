import TimelinePage from '@/components/elements/ActivityTimeline'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$userId/activity')({
  component: TimelinePage
})
