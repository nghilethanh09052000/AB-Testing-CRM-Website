"use client"

import { useState, memo } from "react";
import _  from 'lodash'
import { Chip, Tooltip, Typography } from "@material-tailwind/react";
import { ABTestViewJsonIcons, ABTestPresentationChartIcons, ABTestDetailIcons } from "@/components/icons/icons";
import ABTestTable from "@/components/ABTestTable";
import ABTestModalDialog from "@/components/ABTestModalDialog";
import { ABTestInterpretJsonDialog, ABTestInterpretChartDialog, ABTestInterpretDetailDiaglog } from "../_components/Dialog";
import { ABTestInterpretCard, ABTestInterpretCardBody, ABTestInterpretCardHeader } from "../_components/Card";
import { PrimaryMetric, SecondaryMetric, MetricResult} from "@/types/api/Get/GetExpDetailsData";

interface Dimensions {
    chosen_column: string;
    chosen_dim: string;
    chosen_value: string[]
}
export interface MetricData {
    metricName: string;
    isPrimaryMetric: boolean;
    details: PrimaryMetric | SecondaryMetric;
    ci_l: number;
    ci_u: number;
    ctl_mean: number;
    trl_mean: number;
    ctrl_ss: number;
    trl_ss: number;
    delta: number;
    p_value: number;
    power_result: number;

}
interface StatisticData {
    ci_l: number;
    ci_u: number;
    ctl_mean: number;
    trl_mean: number;
    ctrl_ss: number;
    trl_ss: number;
    delta: number;
    p_value: number;
    power_result: number;
}
interface MetricABTestProps {
    title: string;
    expName: string;
    alpha:number;
    beta:number;
    primaryMetric: PrimaryMetric;
    secondaryMetric: SecondaryMetric[];
}   

type typeDialogState = 'json' | 'chart' | 'details'
interface dialogState {
    isOpen: boolean;
    type: typeDialogState;
    rowData: any
}
interface MetricTableProps {
    metrics: MetricData[];
    dialog: dialogState | null;
    setDialog: (dialogState: dialogState | null) => void
}
interface DiaLogDataProps {
    dialog: dialogState;
    setDialog: (dialogState: dialogState | null) => void
    alpha: number;
    beta: number;
    expName: string;
}

const getStatisticData = (
        result: MetricResult
    ): StatisticData =>
    {

        const ci_l = _.toNumber(result.confidence_interval[0].value)
        const ci_u = _.toNumber(result.confidence_interval[1].value)

        const ctl_mean = result.control_statistics.mean
        const trl_mean = result.treatment_statistics.mean 
        
        const ctrl_ss = result.control_statistics.sample_size
        const trl_ss = result.treatment_statistics.sample_size
        
        const delta = result.delta
        const p_value = result.p

        const power_result = result.statistical_power

        return { 
            ci_l,
            ci_u,
            ctl_mean,
            trl_mean,
            ctrl_ss,
            trl_ss,
            delta,
            p_value,
            power_result
        }
              
}

const getPrimaryMetric = (metric: PrimaryMetric ): MetricData[] => {
    return [
        {
            metricName: metric.metric_cfg.metric_name,
            isPrimaryMetric: true,
            details: metric,
            ...getStatisticData(metric.result.result)
        }
    ]
}

const getSecondaryMetric = (secondaryMetrics: SecondaryMetric[] ): MetricData[] | [] => {
    
    if(!secondaryMetrics) return []

    const metrics = _.flatMap(secondaryMetrics, secondaryMetric => {
        const isDimenstion = _.has(secondaryMetric.result, 'correction_method')
        if(!isDimenstion) {
            return {
                metricName: secondaryMetric.metric_cfg.metric_name,
                isPrimaryMetric: false,
                details: secondaryMetric,
                ...getStatisticData(secondaryMetric.result.result)
            }
        }
        return _.map(secondaryMetric.result.results, result => (
            {
                metricName: secondaryMetric.metric_cfg.metric_name,
                isPrimaryMetric: false,
                details: secondaryMetric,
                ...getStatisticData(result.result.corrected_test_statistics)
            }
        ))
        
    })
    return metrics
}

const getMetricData = (
    primaryMetricFunc: MetricData[], 
    secondaryMetricFunc: MetricData[] | [], 
): MetricData[] => [...primaryMetricFunc, ...secondaryMetricFunc ]


const RenderMetricTable = ({
    metrics,
    dialog,
    setDialog
}: MetricTableProps)=> {

    const renderIsPrimaryMetricField = (rowData: MetricData) => (
        <div className="flex flex-row justify-start items-center">
            {rowData.metricName}
            <Chip color='red' value='Primary Metric' className="ml-5"/>
        </div>
    )                                    

    const renderDimensionMectricField = (rowData: MetricData, dimensions: Dimensions) => (
        <div className="flex flex-row justify-start items-center">
            {rowData.metricName}
            <Tooltip
                placement='top'
                className="border border-blue-gray-50 bg-black shadow-black/10"
                content={
                    <>
                        <div className="w-full bg-white"><Typography color="black" className="font-bold text-center">Details</Typography></div>
                        <hr className="mb-3" style={{ borderColor: "#f75934" }} />
                        {
                            _.map(_.keys(dimensions), (dimension, index) => (
                                dimension === 'chosen_dim' && <div key={index} className="flex flex-row justify-between"><p className="mr-5">Dimension:</p> <p>{dimensions.chosen_dim}</p></div>
                                ||
                                dimension === 'chosen_column' && <div key={index} className="flex flex-row justify-between"><p className="mr-5">Segments:</p> <p>{dimensions.chosen_column}</p></div>
                                ||
                                dimension === 'chosen_value' && <div key={index} className="flex flex-row justify-between"><p className="mr-5">Sub Group:</p> <p>{_.join(dimensions.chosen_value, '-')}</p></div>
                            )) 
                        }
                    </>
                }
            >
                <Chip color='cyan' value='Dimension' className="ml-5"/>

            </Tooltip>
        </div>
    )
 
    const renderMetricNameField = (rowData: MetricData) => {
        const dimensions = rowData.details.metric_cfg.dimensions
        return (
            rowData.isPrimaryMetric && renderIsPrimaryMetricField(rowData)
            || dimensions && renderDimensionMectricField(rowData, dimensions) 
            || rowData.metricName
                
        )         
    }

    const handleUpdateDialog = (rowData: MetricData,  type: typeDialogState) => {
        setDialog({
            isOpen: !dialog?.isOpen,
            type : type,
            rowData: rowData
        })
    }

    return (
        <ABTestTable
            columns={[
                {
                    title: 'Metric Name',
                    field: '', // Do not specify if you don't want to you specific row
                    render: (rowData) => renderMetricNameField(rowData)
                },
                {
                    title: 'Control',
                    field: '',
                    render: (rowData) => <>{_.round(rowData.ctl_mean, 2)}</>
                },
                {
                    title: 'Treatment',
                    field: '',
                    render: (rowData) => <>{_.round(rowData.trl_mean, 2)}</>
                },
                {
                    title: 'Lift',
                    field: '',
                    render: (rowData) => <>{_.round(rowData.delta, 2)}</>
                },
            ]}
            data={metrics}
            actions={[
                {
                    type: 'json',
                    icon: <ABTestViewJsonIcons className="w-8 h-8 text-white" fill="#fff"/>,
                    tooltip: 'View Json Metrics',
                    onClick: (rowData) => handleUpdateDialog(rowData, 'json')
                },
                {
                    type: 'chart',
                    icon: <ABTestPresentationChartIcons className="w-8 h-8 text-white"/>,
                    tooltip: 'View Chart',
                    onClick: (rowData) => handleUpdateDialog(rowData, 'chart'),
                    disable: false
                },
                {
                    type: 'details',
                    icon: <ABTestDetailIcons className="w-8 h-8 text-white"/>,
                    tooltip: 'View Results',
                    onClick: (rowData) => handleUpdateDialog(rowData, 'details')
                }
            ]}
        />
    )
}

const RenderDialogData = ({
    dialog,
    setDialog,
    alpha,
    beta,
    expName
}: DiaLogDataProps) => {
    return dialog && (
       <ABTestModalDialog
            isOpen={dialog.isOpen}
            title={
                dialog.type === 'json' && 'JSON Results'
                ||
                dialog.type === 'chart' && 'View Chart                             '
                ||
                dialog.type === 'details' && 'Results Details'
                || ''
            }
            onHandler={()=> setDialog(null)}
        >
            {
                dialog.type === 'json' 
                    && 
                    (
                        <ABTestInterpretJsonDialog data={dialog.rowData}/>
                    )
                ||
                dialog.type === 'chart' 
                    &&
                    (
                        <ABTestInterpretChartDialog statisticData={dialog.rowData} expName={expName}/>
                    )
                ||
                dialog.type === 'details' 
                    &&
                    (
                        <ABTestInterpretDetailDiaglog data={dialog.rowData} alpha={alpha} beta={beta}/>
                    ) 
            }
       </ABTestModalDialog>
    )
}

const InterpretMetric = memo(function InterpretMetric({
    title,
    expName,
    alpha,
    beta,
    primaryMetric,
    secondaryMetric
}: MetricABTestProps) {

    const metricData: MetricData[] = getMetricData(
        getPrimaryMetric(primaryMetric),
        getSecondaryMetric(secondaryMetric)
    )

    const [dialog, setDialog] = useState<dialogState | null>(null)

    return (
        <ABTestInterpretCard>
            <ABTestInterpretCardHeader title={title}/>
            <ABTestInterpretCardBody>
                
                <div className="flex flex-col">
                    <RenderMetricTable
                        metrics={metricData}
                        dialog={dialog}
                        setDialog={setDialog}
                    />
                </div>

                {
                    !_.isNull(dialog) 
                    &&
                    (
                        <RenderDialogData 
                            dialog={dialog} 
                            setDialog={setDialog} 
                            alpha={alpha} 
                            beta={beta}
                            expName={expName}
                        />
                    )
                }

            </ABTestInterpretCardBody>
        </ABTestInterpretCard>
    )
})

export default InterpretMetric

