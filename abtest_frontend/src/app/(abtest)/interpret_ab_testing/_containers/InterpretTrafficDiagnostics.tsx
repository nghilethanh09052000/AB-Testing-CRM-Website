"use client"

import { ABTestInterpretCard, ABTestInterpretCardBody, ABTestInterpretCardHeader } from "../_components/Card";
import { Alert } from "@material-tailwind/react";
import { ABTestSuccessIcons, ABTestWarningIcons } from "@/components/icons/icons";
import ABTestTable from "@/components/ABTestTable";
import _ from 'lodash'

interface InterpretTrafficDiagnosticsProps {
    title: string;
    result: any
}   
interface calculateControlTreatmentSize {
    controlSize: number;
    treatmentSize: number;
    totalSize: number
}

interface diagnosticData {
    type: string;
    control: number;
    treatment: number
}



const checkIsbalance = (result: any): boolean => result.traffic.is_balance === 'True'

const calculateControlTreatmentSize = (result: any): calculateControlTreatmentSize => {
    const controlSize = result.result.control_statistics.sample_size
    const treatmentSize = result.result.treatment_statistics.sample_size
    const totalSize = controlSize + treatmentSize
    return {
        controlSize,
        treatmentSize,
        totalSize
    }
}

const getDiagnosticData = (controlSize: number, treatmentSize: number): diagnosticData[] => {
    const baseData = [
        {type: 'Exptected Traffic'}, 
        {type: 'Actual Traffic'}
    ]
    const diagnosticData: diagnosticData[] = _.map(baseData, item => (
                    {
                        type: item.type, 
                        control: item.type === "Expected Traffic" ? 50 : controlSize,
                        treatment: item.type === "Expected Traffic" ? 50 : treatmentSize
                    }
            )
        )
    return diagnosticData
}

const RenderBalanceAssignmentAlert = (result: any) => {
    const isBalance = checkIsbalance(result)
    return (
        <Alert 
            color={isBalance ? 'green' : 'red'}
            variant="gradient"
            icon={isBalance ? <ABTestSuccessIcons/> : <ABTestWarningIcons/>}
        >
            {
                isBalance
                ? 'The Balance Of Assignments Is Looking Good!' 
                : 'The assignment imbalance was detected. Please check your randomization implementation.'
            }
        </Alert>
    )
}

const RenderExpectedActualTreatmentSize = (data: diagnosticData[], totalSize: number)=> {
    const renderControlField = (value: number, totalSize: number) => _.toString(_.round((value * 100 / totalSize), 2))
    const renderTreatmentField = (value: number, totalSize: number) => _.toString(_.round((value * 100 / totalSize), 2))
    return (
        <ABTestTable
            columns={[
                {
                    title: 'Traffic Type',
                    field: 'type'
                },
                {
                    title: 'Control (%)',
                    field: 'control',
                    render: (control) => renderControlField(control, totalSize)
                },
                {
                    title: 'Treatment (%)',
                    field: 'treatment',
                    render: (treatment) => renderTreatmentField(treatment, totalSize)
                }
            ]}
            data={data}
        /> 
    )
}

export default function InterpretTraficDiagnostics({
    title,
    result
}: InterpretTrafficDiagnosticsProps) {

    const {controlSize, treatmentSize, totalSize} = calculateControlTreatmentSize(result)
    const trafficDiagnosticsData = getDiagnosticData(controlSize, treatmentSize)

    return (
            <ABTestInterpretCard>
                <ABTestInterpretCardHeader title={title}/>
                <ABTestInterpretCardBody>
                    <div className="flex flex-col">

                        <div className="flex flex-row my-5">
                            {RenderBalanceAssignmentAlert(result)}
                        </div>   

                        <div className="flex flex-row">
                            {RenderExpectedActualTreatmentSize(trafficDiagnosticsData, totalSize)}
                        </div>  
                    </div>
                </ABTestInterpretCardBody>
            </ABTestInterpretCard>
    )
}