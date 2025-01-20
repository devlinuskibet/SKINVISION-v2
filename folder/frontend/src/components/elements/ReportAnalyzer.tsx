import { IAnalyzerReport } from "@/store/store";
import { Skeleton } from "../ui/skeleton";
import { ReactSVG } from "react-svg";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export type TDiseaseReport = {
  name: string;
  description: string;
  symptoms: string | string[],
  treatment: string | string[]
}
export default function ReportAnalyzer({ src, analyzerValue, }: {src: string, analyzerValue: IAnalyzerReport,
}) {
  console.log(analyzerValue.condition)
  const { isLoading, error, isError, data, refetch } = useQuery({
    queryKey: ["Prescribed_Results"],
    queryFn: () => axios.get<TDiseaseReport>(`http://localhost:3000/diseases/${analyzerValue.condition}`).then(res => res.data),
  })
 

 
  if(isLoading){
    return (
      <div className="w-full border rounded-md p-3 space-y-3" >
        <Skeleton className="w-full rounded-md h-32" />
        <Skeleton className="w-full rounded-md h-4" />
        <Skeleton className="w-1/3 rounded-md h-4" />
      </div>
      
    )
  }
  if(isError){
    console.log(data)
    return (
      <div className="w-full border flex flex-col space-y-2 items-center justify-center">
       <ReactSVG src="/public/InternalServerError.svg" /> 
       <Button variant={"secondary"} onClick={() => refetch()}> Retry</Button>
      </div>
    ) 
  }
  if(!data){
    return(
      <div>Upload Image</div>
    )
  }
    return (
      <>
        {!data ? <div>Upload Image</div> : <div className="w-full border rounded-md">
          <div className="max-w-full min-h-32 p-3 border rounded-md">
            <span className="space-x-2 space-y-2">
              Predicted Condition: {data!.name}
              <p className="text-lg  text-foreground font-bold">
                Predicted Condition: 
              </p>
              <p className=" animate-typing text-lg leading-relaxed text-foreground">
                {analyzerValue.condition}
              </p>
            </span>
            <span className="text-lg  space-y-2 space-x-2">
              <p className="text-foreground font-bold">Symptoms: </p>
                {Array.isArray(data!.symptoms) ? <ul className="list-disc flex flex-col space-y-4">
                {data!.symptoms.map((symptom) => (
                  <li className=" animate-typing text-lg leading-relaxed text-foreground">
                    {symptom}
                  </li>
                ))}
              </ul> : <p className="animate-typing text-lg leading-relaxed text-foreground">
                {data!.symptoms}
              </p>}
            </span>
            <span className="text-lg space-x-4">
              <p className="text-foreground font-bold">Treatment:</p>
                {Array.isArray(data!.treatment) ? <ul className="list-disc flex flex-col space-y-4">
                {data!.treatment.map((symptom) => (
                  <li className=" animate-typing text-lg leading-relaxed text-foreground">
                    {symptom}
                  </li>
                ))}
              </ul> : <p className="animate-typing text-lg leading-relaxed text-foreground">
                {data!.treatment}
              </p>}
            </span>
          </div>
        </div>
        }
      </>
  )
}
