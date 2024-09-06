"use client";

import ABTestJsonEditor from "@/components/ABTestJsonEditor";
import { useState } from "react";
import { ListEventTypeData } from "@/types/api/Get/GetListEventTypeData";
import { AllDimensionData } from "@/types/api/Get/GetAllDimensionData";
import ABTestInput from "@/components/ABTestInput";
import ABTestSelect from "@/components/ABTestSelect";
import ABTestSlider from "@/components/ABTestSlider";
import ABTestCheckBox from "@/components/ABTestCheckbox";
import { Button, Typography } from "@material-tailwind/react";
import _ from "lodash";

type CheckboxType = "ratio" | "dimensions" | "";
type Operator = "<" | "<=" | ">" | ">=" | "=" | "<>" ;
type TimeSettings = 'interval' | 'operators' | 'date_part'
type FilterDimensionsData = string[] | []
interface CheckboxOpen {
  isOpen: boolean;
  type: CheckboxType;
}

interface CreateMetricData {
  metric_name: string;
  fact: string[];
  agg: string[]
  time_settings: {
    interval: number | null;
    date_part: string | null;
    operators: Operator | ''
  }
  med: number;
  filter_outlier?: string;
  dimensions: string;
}

interface SubmitCreateMetricData {
    metric_name: string;
    fact: string[];
    agg: string[]
    time_settings: {
        interval: number;
        date_part: string;
        operators: Operator;
    }
    med: number;
    filter_outlier?: string;
    dimensions: string;
}

type MetricDataNameKey = keyof CreateMetricData
interface CreateMetricCardProps {
  data: CreateMetricData;
  listEventTypes: ListEventTypeData;
  filterDimensionsData: FilterDimensionsData;
  handleDataChange: (
        value: string | number, 
        name: MetricDataNameKey, 
        index?: number | TimeSettings
    ) => void;
  handleCheckBoxOpen: (checked: boolean,type: CheckboxType) => void;
  handleValidateSubmit: () => boolean
  handleSubmitData: (data: SubmitCreateMetricData) => void
  checkBoxOpen: CheckboxOpen;
}

interface MetricShowJsonCardProps {
  data: CreateMetricData;
}

interface MetricCreateMetricsProps {
  listEventTypes: ListEventTypeData;
  allDimensions: AllDimensionData[]
}

const getFilterDimensionData = (
    allDimension: AllDimensionData[], 
    factData: string[]
  ): FilterDimensionsData =>  (
    _.size(factData) !== 1
      ? []
      : _.chain(allDimension).filter(dimension => dimension.metric === factData[0]).uniqBy("dimension").map("dimension").value()
  )

const RenderCreateMetricsCard = ({
  data,
  listEventTypes,
  filterDimensionsData,
  handleDataChange,
  handleCheckBoxOpen,
  handleValidateSubmit,
  handleSubmitData,
  checkBoxOpen,
}: CreateMetricCardProps) => {

  const AGGREGATION = ["SUM", "COUNT", "RETENSION", "CONVERSION"];
  const DATEPART = ['DAY', 'WEEK', 'MONTH']
  const OPERATORS: Operator[] =  ["<" , "<=" , ">" , ">=" , "=" , "<>"]

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row">
        <Typography variant="h4">Create New Metric</Typography>
      </div>
      <div className="flex flex-row my-3 w-full">
        <div className="flex flex-col w-3/4">
          <ABTestInput
            value={data.metric_name}
            label="Metric Name"
            type="text"
            onChangeHandler={(value) => handleDataChange(value, "metric_name")}
          />
          <ABTestCheckBox
            checked={checkBoxOpen.isOpen && checkBoxOpen.type == 'ratio'}
            label="Ratio Metric"
            handleIsCheck={(checked) => handleCheckBoxOpen(checked,"ratio")}
          />
        </div>
      </div>
      {
        checkBoxOpen?.isOpen 
        && 
        checkBoxOpen.type == "ratio" 
        && 
        (
        <>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <Typography variant="h4">Numerator</Typography>
            </div>
            <div className="flex flex-row my-3 w-3/4">
              <ABTestSelect
                label={"Event Name"}
                options={listEventTypes}
                value={data.fact[0]}
                onChangeHandler={(value) => handleDataChange(value, "fact", 0)}
              />
            </div>
            <div className="flex flex-row my-3 w-3/4">
              <ABTestSelect
                label={"AGGREGATION"}
                options={_.filter(AGGREGATION, (value) =>
                  _.includes(["SUM", "COUNT"], value)
                )}
                value={data.agg[0]}
                onChangeHandler={(value) => handleDataChange(value, "agg", 0)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <Typography variant="h4">Denominator</Typography>
            </div>
            <div className="flex flex-row my-3 w-3/4">
              <ABTestSelect
                label={"Event Name"}
                options={listEventTypes}
                value={data.fact[1]}
                onChangeHandler={(value) => handleDataChange(value, "fact", 1)}
              />
            </div>
            <div className="flex flex-row my-3 w-3/4">
              <ABTestSelect
                label={"AGGREGATION"}
                options={_.filter(AGGREGATION, (value) =>
                  _.includes(["SUM", "COUNT"], value)
                )}
                value={data.fact[1]}
                onChangeHandler={(value) => handleDataChange(value, "agg", 1)}
              />
            </div>
          </div>
        </>
        )
      }
      {
        checkBoxOpen.type != "ratio" 
        && 
        (
            <div className="flex flex-col">
                <div className="flex flex-row my-3 w-3/4">
                    <ABTestSelect
                    label={"Event Name"}
                    options={listEventTypes}
                    value={data.fact[0]}
                    onChangeHandler={(value) => handleDataChange(value, "fact", 0)}
                    />
                </div>
                <div className="flex flex-row my-3 w-3/4">
                    <ABTestSelect
                      label={"AGGREGATION"}
                      options={AGGREGATION}
                      value={data.agg[0]}
                      onChangeHandler={(value) => handleDataChange(value, "agg", 0)}
                    />
                </div>
            </div>
        )
      }
      {
        _.size(data.agg) === 1
        && 
        _.includes(['RETENSION', 'CONVERSION'], data.agg[0])
        &&
        (
            <div className="flex flex-col my-3">
                <div className="flex flex-col w-3/4">
                    <ABTestInput
                        value={data.time_settings.interval || ''}
                        label="Interval"
                        type="number"
                        min={1}
                        onChangeHandler={(value) => handleDataChange(+value, 'time_settings', 'interval')}
                    />
                </div>
                <div className="flex flex-col w-3/4">
                    <ABTestSelect
                        label={"Operators"}
                        options={OPERATORS}
                        value={data.time_settings.operators}
                        onChangeHandler={(value) => handleDataChange(value, "time_settings", "operators")}
                    />
                </div>
                <div className="flex flex-col w-3/4">
                    <ABTestSelect
                        label={"Date Part"}
                        options={DATEPART}
                        value={data.time_settings.date_part || ''}
                        onChangeHandler={(value) => handleDataChange(value, "time_settings", "date_part")}
                    />
                </div>
            </div>
        )
      }
        <div className="flex flex-col my-3">
            <div className="flex flex-row">
              <Typography variant="small">MINIMUM DETECTABLE EFFECT (MDE): {data.med}</Typography>
            </div>
            <div className="flex flex-row w-2/3 my-2">
              <ABTestSlider 
                    value={data.med} 
                    onChangeHandler={(value) => handleDataChange(value, 'med')} 
                    min={0.01} 
                    max={0.30}
                    step={0.01}
                />
            </div>
        </div>
        <div className="flex flex-col my-3">
            <div className="flex flex-row">
                <ABTestCheckBox
                    checked={false}
                    label="Filter Outlier"
                    handleIsCheck={(checked) => handleCheckBoxOpen(checked, "dimensions")}
                    disabled={true}
                />
            </div>
           {
            checkBoxOpen.type !== 'ratio'
            &&
            (
             <div className="flex flex-row">
              <ABTestCheckBox
                  checked={checkBoxOpen.isOpen && checkBoxOpen.type === 'dimensions' && !_.isEmpty(filterDimensionsData)}
                  label="DIMENSION"
                  handleIsCheck={(checked) => handleCheckBoxOpen(checked, "dimensions")}
                  disabled={_.isEmpty(filterDimensionsData)}
              />
            </div>
            )
           }
           {
            checkBoxOpen.isOpen
            &&
            checkBoxOpen.type == 'dimensions'
            && !_.isEmpty(filterDimensionsData)
            && 
            (
              <div className="flex flex-row">
                <ABTestSelect
                    label={"Choose Your Dimension (for normal_diff only)"}
                    options={filterDimensionsData}
                    value={data.dimensions}
                    onChangeHandler={(value) => handleDataChange(value, "dimensions")}
                    disabled={true}
                />
            </div>
            )
           }
           <div className="flex flex-col my-3 w-1/3">
               <Button color="red" onClick={(e) => handleSubmitData} disabled={handleValidateSubmit()}>
                  Create Metrics
               </Button>
            </div>
        </div>
    </div>
  );
};

const RenderMetricShowJsonCard = ({ data }: MetricShowJsonCardProps) => {
  return (
    <ABTestJsonEditor
      confirmGood={false}
      placeholder={data}
      reset={true}
      width="fit"
      viewOnly={true}
    />
  );
};

export default function MetricCreateMetrics({
  listEventTypes,
  allDimensions,
}: MetricCreateMetricsProps) {
    
  const defaultCreateMetricsData: CreateMetricData = {
    metric_name: "",
    fact: [],
    agg: [],
    time_settings: {
      interval: null,
      date_part: null,
      operators: '',
    },
    med: 0.05,
    filter_outlier: "",
    dimensions: "",
  };

  const [metricData, setMetricData] = useState<CreateMetricData>(defaultCreateMetricsData);
  const [checkBoxOpen, setCheckboxOpen] = useState<CheckboxOpen>({isOpen: false,type: ""});
  const filterDimensionsData = getFilterDimensionData(allDimensions, metricData.fact)


  const handleCheckBoxOpen = (checked: boolean, type: CheckboxType) => {
    if(checked === false)
    {
      setMetricData((prevState) => {
        if (type === 'ratio') {
          return { 
            ...prevState, 
            fact: [],
            agg: [],
            time_settings: {
              interval: 0,
              date_part: '',
              operators: '',
            },
            dimensions:''
          };
        }
        return { ...prevState, dimensions: '' };
      });
    }
    setCheckboxOpen((prevState) => ({
      ...prevState,
      isOpen: checked !== prevState.isOpen,
      type: !!prevState.isOpen ? "" : type,
    }));

    
    
  };
      
  const handleDataChange = (
    value: string | number, 
    name: MetricDataNameKey, 
    index?: number | TimeSettings
    ) => {
      setMetricData( (prevState) => {
        
        if (name === "fact" && index === 0) {
            const fact0NotInAllDimensions = !_.some(allDimensions, { metric: value });
            if (fact0NotInAllDimensions) {
              return {
                ...prevState,
                fact: [_.toString(value)],
                dimensions: '',
              };
            }
          }
          
        return {
          ...prevState,
          [name]: 
            (name === "fact" && index !== undefined) && _.set(_.clone(prevState.fact), index, value) 
            ||
            (name === "agg" && index !== undefined) && _.set(_.clone(prevState.agg), index, value)
            ||
            _.isString(index) && _.includes(['interval','operators', 'date_part'], index) && {...prevState.time_settings, [index]: value}
            ||
            value
        }     
    })
  };

  const handleValidateSubmit = (): boolean => {
    const { metric_name, fact, agg, med } = metricData;
    return (
        _.isEmpty(metric_name) 
        || _.isEmpty(fact) 
        || _.isEmpty(agg) 
        || _.isNaN(med)
    )
  };

  const handleSubmitData = (data: CreateMetricData) => {
    if(!handleValidateSubmit()) return;
    
  };


  return (
    <>
      <div className="flex flex-col w-2/3 border-r">
        <RenderCreateMetricsCard
          data={metricData}
          checkBoxOpen={checkBoxOpen}
          listEventTypes={listEventTypes}
          filterDimensionsData={filterDimensionsData}
          handleDataChange={handleDataChange}
          handleCheckBoxOpen={handleCheckBoxOpen}
          handleValidateSubmit={handleValidateSubmit}
          handleSubmitData={handleSubmitData}
        />
      </div>
      <div className="flex flex-col w-1/3">
        <RenderMetricShowJsonCard data={metricData} />
      </div>
    </>
  );
}
