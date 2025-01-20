import ElemAnalyzer from '@/components/elements/Element'
import ImageDropZone from '@/components/elements/ImageDropZone'
import PatientForm from '@/components/elements/PatientForm'
import ReportAnalyzer from '@/components/elements/ReportAnalyzer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$userId/analyzer')({
  component: Analyzer ,
})

function Analyzer(){
  return(
    <div className='w-full space-y-3 flex flex-col items-center space-x-4 justify-center h-full'>
      <PatientForm />
      <ImageDropZone />
    </div>
  )
}