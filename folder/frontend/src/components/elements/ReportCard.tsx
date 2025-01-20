import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TReports } from "./ReportsContainer";

export default function ReportCard({report}: {report: TReports}) {
  return (
    <Card className="max-w-[400px]">
        <CardHeader>
            <img src={report.uploaded_image} className="size-full object-cover rounded-md" />
            <span className="flex space-x-3">
                <p className="text-muted-foreground text-xl font-medium">Predicted Condition: </p>
                <CardTitle className="text-xl">{report.predicted_condition}</CardTitle>
            </span>
        </CardHeader>
        <CardContent className="space-y-3">
            <span className="flex space-x-3">
                <p className="text-muted-foreground text-xl font-medium">Predicted Condition: </p>
                <p className="text-foreground text-xl font-medium"> {report.predicted_confidence}</p>
            </span>
              <span className="flex space-x-3">
                  <p className="text-muted-foreground text-xl font-medium">Diagnosed Date: </p>
                  <p className="text-foreground text-xl font-medium">{report.diagnosed_date.toDateString()}</p>
              </span>
              <Button variant={"outline"} className="w-full flex items-center justify-center">
                <Download className="mr-2 size-6" />
                Download info 
              </Button>
        </CardContent>
    </Card>
  )
}
