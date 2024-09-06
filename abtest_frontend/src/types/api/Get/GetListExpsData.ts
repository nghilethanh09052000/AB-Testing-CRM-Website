export interface DateRange {
    start: {
        start_date: string;
        start_time: string;
    };
    end: {
        end_date: string;
        end_time: string;
    };
}

export interface ConfidenceInterval {
    percentile: number;
    value: number;
}

export interface Statistics {
    mean: number;
    sample_size: number;
    variance: number;
}

export interface Result {
    confidence_interval: ConfidenceInterval[];
    control_statistics: Statistics;
    delta: number;
    p: number;
    statistical_power: number;
    stop: string;
    test_statistic: number;
    treatment_statistics: Statistics;
}

export interface MetricConfig {
    metric_id: string;
    metric_name: string;
    fact: string;
    agg: string;
    interval: string | null;
    date_part: string | null;
    mde: number;
    filter_outlier: {
        up_pct: number | null;
        low_pct: number | null;
    };
    dimensions: any[] | null; 
}

export interface ExperimentConfig {
    exp_id: string;
    kpi: string;
    secondary_metrics: any[]; 
    alpha: number;
    beta: number;
    precision: number;
    test_method: string;
    cuped: string;
    entity: string;
    experiment_name: string;
    hypothesis: string;
    date_range: DateRange;
    feature_lag: string;
    weight_traffic_control: number;
    weight_traffic_treatment: number;
}

export interface ListExpsData {
    time_run_test: string;
    time_create_test: string;
    config: ExperimentConfig;
    exp_id: string;
    experiment_name: string;
    result: {
        result: Result;
        test: {
            features: any[];
            kpi: {
                name: string;
            };
            variants: {
                control_name: string;
                treatment_name: string;
                variant_column_name: string;
            };
        };
        traffic: {
            is_balance: string;
            p_value: number;
        };
    };
    metric_id: string;
    metric_cfg: MetricConfig;
}

