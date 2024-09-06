"use client"

import { ABTestInterpretCard, ABTestInterpretCardBody, ABTestInterpretCardHeader } from "../_components/Card";

import { Progress, Alert } from "@material-tailwind/react";
import { PrimaryMetric } from "@/types/api/Get/GetExpDetailsData";
import { calculatePrecision, calculateProgress } from "@/utils/calculate";
import { ABTestSuccessIcons } from "@/components/icons/icons";

interface OverViewInterpretingABTestProps {
    title: string;
    expectedPrecision: number;
    primaryMetric: PrimaryMetric
}   

const RenderPresicionTargetReached = (listExpsData:PrimaryMetric) => {
    const isBalance = listExpsData.result.traffic.is_balance
    return (
        <Alert 
            color={isBalance === 'True' ? 'green' : 'red'}
            variant="gradient"
            icon={<ABTestSuccessIcons/>}
        >
            {
                isBalance === 'True' 
                ? 'Precision Target Reached' 
                : 'The assignment imbalance was detected. Please check your randomization implementation.'
            }
        </Alert>
    )
}

const RenderExperimentProgress = (listExpsData: PrimaryMetric, expectedPrecision: number) => {

    const precision = calculatePrecision(listExpsData.result['result'] )
    const progress  =  calculateProgress(expectedPrecision, precision)
    const current_precision = Math.round((1-precision) * 100 * 100) / 100

    return (
            <Progress 
                value={current_precision}
                label={`Current Progress`}
                color={ (!progress || progress < 1.0) ? "red" : "cyan" }
                size="lg"
                className="bg-black"
            />
    )
}

export default function InterpretABTestingProgress({
    title,
    expectedPrecision,
    primaryMetric
}: OverViewInterpretingABTestProps) {
    
    return (
            <ABTestInterpretCard>
                <ABTestInterpretCardHeader title={title}/>
                <ABTestInterpretCardBody>
                    <div className="flex flex-col">
                        <div className="flex flex-row my-5">
                            {RenderPresicionTargetReached(primaryMetric)}
                        </div>     
                        <hr className="my-3 mt-5" style={{ borderColor: "#f75934" }} />
                        <div className="flex flex-row my-5">
                            {RenderExperimentProgress(primaryMetric, expectedPrecision)}   
                        </div>      
                    </div>
                </ABTestInterpretCardBody>
            </ABTestInterpretCard>
    )
}