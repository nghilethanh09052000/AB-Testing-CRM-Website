import { PrimaryMetric } from "@/types/api/Get/GetExpDetailsData";
import { MetricData } from "../../_containers/InterpretMetric";
import { ABTestInterpretDialogProps } from ".";
import ABTestJsonEditor from "@/components/ABTestJsonEditor";


const ABTestInterpretJsonDialog = ({
    data
}: ABTestInterpretDialogProps) => {
    return (
        <ABTestJsonEditor
            placeholder={data}
            reset={true}
            viewOnly={true}
            confirmGood={false}
            width={'full'}
        />
    )
}
export default ABTestInterpretJsonDialog;