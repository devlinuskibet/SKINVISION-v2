import ReportCard from "./ReportCard"

export type TReports = {
    id: string,
    predicted_condition: string,
    predicted_confidence: string,
    uploaded_image: string,
    diagnosed_date: Date,
}
export default function ReportsContainer({reports}: {reports: TReports[]}) {
  return (
    <div className="w-full h-max grid grid-cols-1 sm:grid-cols-3 gap-5">
        {reports.map(report => (
            <ReportCard report={report} />
        ))}
    </div>
  )
}
