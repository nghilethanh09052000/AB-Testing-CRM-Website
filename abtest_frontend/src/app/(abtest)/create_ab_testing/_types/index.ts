type SpecialCreateABTestingTypes = 
                | 'kpi'
                | 'precision'


export type CommonCreateABTestingTypes =
                  'secondary_metrics'
                | 'alpha'
                | 'beta'
                | 'test_method'
                | 'cuped'
                | 'entity'
                | 'experiment_name'
                | 'hypothesis'
                | 'start_date'
                | 'end_date'
                | 'start_time'
                | 'end_time'
                | 'feature_lag'
                | 'weight_traffic_control'
                | 'weight_traffic_treatment'


export type UpdateCreateABTestingDataTypes = CommonCreateABTestingTypes | SpecialCreateABTestingTypes
export type CreateABTestingDataValueTypes = string | number | string[] | boolean
        
export type HandleUpdateFunction = (
    type: UpdateCreateABTestingDataTypes,
    value: string | number | string[] | boolean 
  ) => void;


  