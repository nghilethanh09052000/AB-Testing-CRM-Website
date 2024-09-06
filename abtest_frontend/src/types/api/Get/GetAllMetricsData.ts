interface DimensionsWithValues{
    chosen_dim: string;
    chosen_column: string;
    chosen_value: string[];
};
export interface AllMetricsData  {
    create_time: string;
    metric_id: string;
    metric_name: string;
    dimensions: DimensionsWithValues | null;
}
