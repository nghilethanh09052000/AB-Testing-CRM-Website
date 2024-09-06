import ABTestTable from "@/components/ABTestTable"
import { ListMetricsData } from "@/types/api/Get/GetListMetricsData"
import { Typography } from "@material-tailwind/react"

type MetricShowTableProps = {
    listMetrics: ListMetricsData[]
}

export default function MetricShowTable({
    listMetrics
}:MetricShowTableProps) {
   
    return (
            <>
                <div className="flex flex-row mb-4">
                    <Typography variant="h4">List Metrics</Typography>
                </div>
                <div className="flex flex-row">
                <ABTestTable
                    data={listMetrics}
                    columns={[
                        {
                            title: 'Name',
                            field: 'metric_name'
                        },
                        {
                            title: 'Count',
                            field: 'exp_count'
                        },
                        {
                            title: 'Created Time',
                            field: 'metric_create_time'
                        }
                    ]}
                    pagination={{
                        page: 1,
                        totalItems:100,
                        totalPages:10
                    }}
                />            
                </div>
            </>
    )
}