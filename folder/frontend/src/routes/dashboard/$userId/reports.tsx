import ReportsContainer from '@/components/elements/ReportsContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$userId/reports')({
  component: Reports
})



function Reports() {
  return (
   <ReportsContainer reports={[{id: "AMD-1234", predicted_condition: "Melanonin", predicted_confidence: "87", diagnosed_date: new Date(), uploaded_image: "/public/skinvision.jpeg"}, {id: "AMD-1234", predicted_condition: "Melanonin", predicted_confidence: "87", diagnosed_date: new Date(), uploaded_image: "/public/skinvision.jpeg"}, {id: "AMD-1234", predicted_condition: "Melanonin", predicted_confidence: "87", diagnosed_date: new Date(), uploaded_image: "/public/skinvision.jpeg"}]} />
  )
}