'use client'

import { useState } from "react";
import { Progress, Tooltip, Button, Typography } from "@material-tailwind/react";
 
import { ABTestViewJsonIcons } from "@/components/icons/icons";
import { ListExpsData, MetricConfig } from "@/types/api/Get/GetListExpsData";
import _ from 'lodash'
import ABTestTable  from "@/components/ABTestTable";
import ABTestJsonEditor from "@/components/ABTestJsonEditor";
import ABTestModalDialog  from "@/components/ABTestModalDialog";
import { useRouter } from "next/navigation";



interface OverviewProps {
    listExps: ListExpsData[]
}

const RenderCurrentPrecisionField = (rowData: ListExpsData) => {

    const calculatePrecision = (result: any ): number => {

        let delta_pct = result['delta'] / result['control_statistics']['mean']
        let ci_l_pct = parseFloat((result['confidence_interval'][0]['value'] / result['control_statistics']['mean']).toString());
        let precision = delta_pct - ci_l_pct
        return precision
    }

    const expectedPrecision = rowData.config.precision
    const precision = calculatePrecision(rowData.result['result'] )
    const progress = Math.pow((expectedPrecision / precision), 2)
    const current_precision = Math.round((1-precision) * 100 * 100) / 100

    return (
        <Tooltip  
            content={`Precision: ${current_precision}`}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
            }}
            placement='right-start'
        >
            <Progress 
                value={current_precision}
                label={"Progress"}
                color={ (!current_precision || current_precision < 1.0) ? "red" : "cyan" }
                size="lg"
                className="bg-black"
            />
        </Tooltip>
        
    )
    
  
}

const RenderPrimaryMetrics = (metric_cfg: MetricConfig): string => metric_cfg['metric_name'] || "Null"


export default function Overview({
    listExps
}: OverviewProps) 
{

    const router = useRouter()

    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<{} | ListExpsData>({})

    const handleOpenJsonDialog = (rowData: ListExpsData) => {
        setSelectedRow(rowData)
        setOpenDialog(!openDialog)
    }

    listExps = _.map(listExps , listExp  => ({...listExp,  'owner': 'Data Team' }))   

    return (
        <>
            <div className="flex flex-row mt-5">
                <div className="flex flex-col w-full">
                    <ABTestTable 
                        data={listExps}
                        columns={[
                                {
                                    title: 'Current Precision',
                                    field: '',
                                    render: (rowData) => RenderCurrentPrecisionField(rowData)
                                },
                                {
                                    title: 'Primary Metric',
                                    field: 'metric_cfg' ,
                                    render: (metric_cfg) => RenderPrimaryMetrics(metric_cfg)
                                },
                                {
                                    title: 'Owner',
                                    field: 'owner'
                                }
                            ]}
                        actions={[
                            {
                                type: 'json',
                                icon: <ABTestViewJsonIcons className="w-8 h-8 text-white" fill="#fff"/>,
                                tooltip: 'View Json',
                                onClick: (rowData: ListExpsData) => handleOpenJsonDialog(rowData)
                            }    
                        ]}
                        pagination={{
                            page: 1,
                            totalItems:100,
                            totalPages:10
                        }}
                        buttons={
                            [
                                <Button 
                                    variant="outlined" 
                                    size="lg" 
                                    className="bg-black" 
                                    disabled
                                    key={1}
                                >
                                    <Typography
                                        style={{ color: "#f75934", fontWeight:'bold' }}
                                    >
                                        Export CSV
                                    </Typography>
                                </Button>
                            ,
                                <Button 
                                    variant="outlined" 
                                    size="lg" 
                                    className="bg-black"
                                    onClick={()=>router.push('/create_ab_testing')}
                                    key={2}
                                >
                                    <Typography
                                        style={{ color: "#f75934", fontWeight:'bold' }}
                                    >
                                        Create A/B Testing
                                    </Typography>
                                </Button>
                        ]}
                        isSearchable={true}
                    />
                </div>
            </div>
            {
                !_.isEmpty(selectedRow) 
                && 
                (
                    <ABTestModalDialog 
                        isOpen={openDialog} 
                        title="View JSON Data"
                        onHandler={()=> setOpenDialog(!openDialog)}
                    >
                        <ABTestJsonEditor 
                            placeholder={selectedRow}
                            reset={true}
                            viewOnly={true}
                            confirmGood={false}
                            width={"fit"}
                        />
                    </ABTestModalDialog>
                )
            }
        </>
    )
}

