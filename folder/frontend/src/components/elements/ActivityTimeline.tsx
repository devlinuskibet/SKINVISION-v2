import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"

// TimelinePage component
function TimelinePage() {
  const recentDiagnoses = [
    { id: 1, patientName: 'John Doe', disease: 'Melanoma', date: '2023-06-15', time: '14:30' },
    { id: 2, patientName: 'Jane Smith', disease: 'Eczema', date: '2023-06-16', time: '10:15' },
    { id: 3, patientName: 'Alice Johnson', disease: 'Psoriasis', date: '2023-06-17', time: '16:45' },
    { id: 4, patientName: 'Bob Brown', disease: 'Acne', date: '2023-06-18', time: '09:00' },
    { id: 5, patientName: 'Eva White', disease: 'Rosacea', date: '2023-06-19', time: '11:30' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Diagnoses Timeline</CardTitle>
        <CardDescription>Timeline of recently diagnosed diseases by the hospital</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentDiagnoses.map((diagnosis, index) => (
            <div key={diagnosis.id} className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full">
                  {index + 1}
                </div>
                {index < recentDiagnoses.length - 1 && <div className="w-px h-full bg-gray-300 dark:bg-gray-700" />}
              </div>
              <div className="pb-6">
                <div className="flex items-center mb-1">
                  <div className="font-semibold text-lg">{diagnosis.patientName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    {diagnosis.date} at {diagnosis.time}
                  </div>
                </div>
                <div className="text-gray-700 dark:text-gray-300">Diagnosed with {diagnosis.disease}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TimelinePage