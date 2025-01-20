import { TBox } from "@/components/elements/ImageHighlighter"
import { createContext, Dispatch, SetStateAction, useState } from "react"
type IStoreContext = {
    analyzerReport: IAnalyzerReport
    setAnalyzerReport: Dispatch<React.SetStateAction<IAnalyzerReport>>
}
export interface IAnalyzerReport {
    condition: string,
    confidence: number
    bounding_boxes: TBox[]
    heatmap_image: string
}

export const StoreContext = createContext<IStoreContext>({
    analyzerReport: {
        condition: '',
        confidence: 0,
        bounding_boxes: [],
        heatmap_image: ''
    },
    setAnalyzerReport: ((value: SetStateAction<IAnalyzerReport>) => value)
    }
)
export default function Store({children}: {children: React.ReactElement}) {
    const [analyzerReport,setAnalyzerReport] = useState<IAnalyzerReport>({
        condition: "",
        confidence: 0,
        bounding_boxes: [
            {
                x: 0, 
                y: 0,
                width: 0,
                height: 0
            }
        ]
   })
    return (
        <StoreContext.Provider value={{
            analyzerReport,
            setAnalyzerReport
        }}>
            {children}
        </StoreContext.Provider>
    )
}
