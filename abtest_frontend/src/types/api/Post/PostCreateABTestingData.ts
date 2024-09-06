type CreateABTestingMetricsData = {
    metric_name: string;
    param: string;
    event_name: string
    mde: number
    agg: 'SUM' | 'COUNT' | 'RETENTION' | 'CONVERSION' | ''
}

export type CreateABTestingData = {
    exp_id: string;
    alpha: number;
    beta: number;
    precision: number;
    test_method: string;
    entity: string;
    experiment_name: string;
    hypothesis: string;
    start_date: string
    end_date:string
    start_time:  string 
    end_time: string
    feature_lag: string;
    weight_traffic_control: number;
    weight_traffic_treatment: number;
    metrics: CreateABTestingMetricsData[]
};