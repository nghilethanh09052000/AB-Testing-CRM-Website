import { MetricData } from "../../_containers/InterpretMetric";
export interface ABTestInterpretDialogProps {
    data: MetricData,
    alpha?: number,
    beta?: number
}


import ABTestInterpretJsonDialog from "./JsonDialog";
import ABTestInterpretChartDialog from "./ChartDialog";
import ABTestInterpretDetailDiaglog from "./DetailsDialog";
export {
    ABTestInterpretChartDialog,
    ABTestInterpretJsonDialog,
    ABTestInterpretDetailDiaglog
}