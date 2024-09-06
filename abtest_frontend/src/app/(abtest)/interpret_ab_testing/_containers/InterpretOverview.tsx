"use client"

import { ABTestInterpretCard, ABTestInterpretCardBody, ABTestInterpretCardHeader } from "../_components/Card";

import _ from 'lodash'

interface OverViewInterpretingABTestProps {
    title: string;
    expName: string;
    startDate: string;
    endDate: string;
    timeRunTest: string[]
}   

export default function InterpretOverViewInterpretingABTest({
    title,
    expName,
    startDate,
    endDate,
    timeRunTest
}: OverViewInterpretingABTestProps) {
    return (
            <ABTestInterpretCard>
                <ABTestInterpretCardHeader title={title}/>
                <ABTestInterpretCardBody>
                    <div className="flex flex-row">
                        <div className="flex flex-col text-white">
                            <p className="mr-5">
                                Name:
                            </p>
                            <p className="mr-5">
                                Start Date:
                            </p>
                            <p className="mr-7">
                                End Date:
                            </p>
                            <p className="mr-7">
                                Last Run:
                            </p>              
                        </div>
                        <div className="flex flex-col text-white">
                            <p className="no-underline text-white">
                                {expName}
                            </p> 
                            <p className="no-underline text-white">
                                {startDate}
                            </p>         
                            <p className="no-underline text-white">
                                {endDate}
                            </p>         
                            <p className="no-underline text-white">
                                { _.first(timeRunTest) || "" }
                            </p>                        
                        </div>
                    </div>
                </ABTestInterpretCardBody>
            </ABTestInterpretCard>
    )
}