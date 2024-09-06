interface ConfidenceInterval {
    percentile: number;
    value: number;
}

interface Statistics {
    mean: number;
    sample_size: number;
    variance: number;
    delta: number;
    p: number;
    statistical_power: number;
    stop: string;
    test_statistic: number;
    treatment_statistics: Statistics;
    control_statistics: Statistics;
}

interface TestFeature {
    column_name: string;
    column_value: string;
}

export interface MetricConfig {
    metric_id: string;
    metric_name: string;
    fact: string[] | string;
    agg: string[] | string;
    interval: null | string;
    date_part: null | string;
    mde: number;
    filter_outlier: {
        up_pct: null | number;
        low_pct: null | number;
    };
    dimensions: {
        chosen_dim: string;
        chosen_column: string;
        chosen_value: string[];
    } | null;
}

export interface MetricResult {
    confidence_interval: ConfidenceInterval[];
    control_statistics: Statistics;
    delta: number;
    p: number;
    statistical_power: number;
    stop: string;
    test_statistic: number;
    treatment_statistics: Statistics;
}

interface Test {
    features: TestFeature[];
    kpi: {
        name: string;
        numerator?: string;
        denominator?: string;
    };
    variants: {
        control_name: string;
        treatment_name: string;
        variant_column_name: string;
    };
    traffic: {
        is_balance: string;
        p_value: number;
    };
}

export interface MetricResults {
    result: {
        corrected_test_statistics: MetricResult;
        original_test_statistics: MetricResult
    },
    test: Test
}
export interface PrimaryMetric {
    metric_cfg: MetricConfig;
    result: {
        result: MetricResult;
        test: Test;
        traffic: {
            is_balance: string;
            p_value: number;
        };
    }
}

export interface SecondaryMetric {
    metric_cfg: MetricConfig;
    result: {
        correction_method?: string;
        result: MetricResult;
        results?: MetricResults[];
        test?: Test[];
        traffic: {
            is_balance: string;
            p_value: number;
        };
    };
}

export interface ExpDetailsData {
    exp_id: string;
    exp_name: string;
    start_date: string;
    end_date: string;
    expected_precision: number;
    alpha: number;
    beta: number;
    time_run_test: string[];
    primary_metric: PrimaryMetric;
    secondary_metric: SecondaryMetric[] | [];
}


