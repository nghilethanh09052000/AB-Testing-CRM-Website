"use client";

import { AllDimensionData } from "@/types/api/Get/GetAllDimensionData";
import { ListEventTypeData } from "@/types/api/Get/GetListEventTypeData";
import { ListMetricsData } from "@/types/api/Get/GetListMetricsData";
import MetricCreateMetrics from "./MetricCreateMetrics";
import MetricShowTable from "./MetricShowTable";
import _ from "lodash";
import { Typography } from "@material-tailwind/react";

interface MetricsProps {
  allDimensions: AllDimensionData[];
  listEventTypes: ListEventTypeData;
  listMetrics: ListMetricsData[];
}


const Metrics = ({ allDimensions, listEventTypes, listMetrics }: MetricsProps) => {
  return (
    <>

      <div className="flex flex-row mt-5 justify-between">
        <MetricCreateMetrics listEventTypes={listEventTypes} allDimensions={allDimensions}/>
      </div>

      <div className="flex flex-col mt-5">
        <MetricShowTable listMetrics={listMetrics} />
      </div>

    </>
  );
};

export default Metrics;
