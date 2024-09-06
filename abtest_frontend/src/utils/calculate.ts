export const calculatePrecision = (result: any ): number => {
    let delta_pct = result['delta'] / result['control_statistics']['mean']
    let ci_l_pct = parseFloat((result['confidence_interval'][0]['value'] / result['control_statistics']['mean']).toString());
    let precision = delta_pct - ci_l_pct
    return precision
}

export const calculateProgress = (expectedPrecision:number, precision: number) => {
    return Math.pow((expectedPrecision / precision), 2)
}