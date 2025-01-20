import { CircleDashed, Upload, X } from "lucide-react"
import { useState, useCallback, useEffect } from "react"
import Dropzone, {useDropzone} from 'react-dropzone'
import { Button } from "../ui/button";
import {useMutation, useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { IAnalyzerReport } from "@/store/store";
import ReportAnalyzer, { TDiseaseReport } from "./ReportAnalyzer";
import axiosInstance from "../../../config/axios";
export default function ImageDropZone() {
  const [images, setImages] = useState<string>(); // State to store image preview URLs
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [prediction,setPrediction] = useState<IAnalyzerReport>({
    condition: '',
    confidence: 0,
    bounding_boxes: [
      {
        "x": 200,
        "y": 120,
        "width": 200,
        "height": 240
      },
    ],
    heatmap_image: ''
  })

  const [heatmapImageUrl, setHeatmapImageUrl] = useState<string>('');
  const thumbnailImages:string[] = [];
  const handleSubmit =  () => {
    const formData = new FormData();
    formData.append('file', uploadedFile!);
    return formData
  };
  const { isLoading, error, isError, data, refetch } = useQuery({
    queryKey: ["Prescribed_Results"],
    queryFn: () => axios.get<TDiseaseReport>(`http://localhost:3000/diseases/${prediction.condition}`).then(res => res.data),
    enabled: false 
  })
  const { isPending, mutate,data:predictionData } = useMutation({
    mutationKey: ["Analyzer_Value"],
    mutationFn: () => axios.post<IAnalyzerReport>('http://127.0.0.1:5000/analyze',handleSubmit(), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => res.data),
    
    onSuccess(data, variables, context) {
      setPrediction(data)
      console.log(data)
      setHeatmapImageUrl(`data:image/jpeg;base64,${data.heatmap_image}`);
    },

  })

  const scanResult = (data:any) => {
    setPrediction(data) 
    setTimeout(() => refetch(), 3000)
  }


  useEffect(() => {
    refetch()

  }, [prediction])

  // Handle file drops
  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles)
    const file = acceptedFiles[0];
    setUploadedFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // FileReader result is a base64 DataURL, update the state with it
      const imageUrl = reader.result as string;
      setImages(imageUrl); // Add new DataURL to the state
    };

    reader.onerror = () => {
      console.error("File reading failed");
    };
  }
    const removeImage = () => {
      setImages('')
    }
    console.log(images)
    console.log(thumbnailImages)
    console.log(prediction);
  return (
    <div className="w-full  h-full flex space-x-10 rounded-md">
      <div className="w-full h-max space-y-2">
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div className="w-full space-y-3 h-full  rounded-md">
              <div className={`w-full h-[300px] border border-dashed flex p-3 rounded-md items-center justify-center bg-slate-400/10 `} {...getRootProps()}>
                <input {...getInputProps({
                  capture: 'user',
                  accept: 'image/*',
                })} />
                <div className="space-y-1 text-foreground flex flex-col justify-center items-center">
                  <Upload className="size-12" />
                  <p className="text-xl font-medium">Select some files</p>
                </div>
              </div>
              <div className="w-full h-[400px] border border-dashed  flex space-x-2">
                <span className={`${!images ? "hidden" : "size-full rounded-md relative "}`}>
                  <X className="absolute top-0 right-0 size-12 hover:stroke-red-400" onClick={() => removeImage()} />
                  {
                    images ? <img src={images!} alt="Skin image" className="size-full object-cover object-center" /> : null
                  }
                </span>
                <span className={`${!images ? "hidden" : "size-full rounded-md relative "}`}>
                  <X className="absolute top-0 right-0 size-12 hover:stroke-red-400" onClick={() => removeImage()} />
                  {
                    images ? <img src={heatmapImageUrl} alt="Skin image" className="size-full object-cover object-center" /> : null
                  }
                </span>
              </div>
              <span className="flex items-center justify-center space-x-3">
                <Button variant={"default"} onClick={() => mutate()} className="w-full">
                  {isPending ? <CircleDashed className="animate-spin size-4" /> : "Upload"}
                </Button>
                <Button variant={'outline'} onClick={() => axiosInstance.get("http://127.0.0.1:5000/scan").then((res) => scanResult(res.data))} className="w-full text-foreground">
                  Scan
                </Button>

              </span>
            </div>
          )}
        </Dropzone>
        <ReportAnalyzer src={images!} analyzerValue={prediction} />
      </div>
    </div>
  )
}
