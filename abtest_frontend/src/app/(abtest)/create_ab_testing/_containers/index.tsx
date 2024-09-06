"use client";
import { useState } from "react";

import _ from "lodash";

import { CreateABTestingData } from "@/types/api/Post/PostCreateABTestingData";
import CreateABTestShowForm from "./CreateABTestShowForm";
import CreateABTestShowJson from "./CreateABTestShowJson";
import { 
  UpdateCreateABTestingDataTypes, 
  CommonCreateABTestingTypes, 
  CreateABTestingDataValueTypes  
} from "../_types";
import { useSession } from "next-auth/react";

const initialCreateABTestingData: CreateABTestingData = {
  exp_id: "",
  alpha: 0.03,
  beta: 0.22,
  precision: 0.1,
  test_method: "Sequencial",
  entity: "Users",
  experiment_name: "",
  hypothesis: "",
  start_date: '',
  end_date:'',
  start_time: '',
  end_time:'',
  feature_lag: "",
  weight_traffic_control: 0.5,
  weight_traffic_treatment: 0.5,
  metrics: [
    {
      metric_name: '',
      param: '',
      event_name: '',
      mde: 0,
      agg: ''
    }
  ]
};

export default function CreateABTesting() {

  const { data: user } = useSession()

  const [createABTestingData, setCreateABTestingData] =
    useState<CreateABTestingData>(initialCreateABTestingData);

  const handleUpdateCreateABTestingData = (
    type: UpdateCreateABTestingDataTypes,
    value: CreateABTestingDataValueTypes
  ) => {

    type === "alpha" && handleUpdateCommonFields(type, value as number) 
    ||
    type === "beta" && handleUpdateCommonFields(type, value as number) 
    ||
    type === "precision" && handleUpdatePrecisionField(value as number)
    ||
    type === "test_method" && handleUpdateCommonFields(type, value as string)
    ||
    type === 'experiment_name' && handleUpdateCommonFields(type, value as string)
    ||
    type === 'entity' && handleUpdateCommonFields(type, value as string)
    ||
    type === 'hypothesis' && handleUpdateCommonFields(type, value as string)
    ||
    type === 'feature_lag' && handleUpdateCommonFields(type, value as string)
    || 
    type === 'start_date' && handleUpdateCommonFields(type, value as string)
    || 
    type === 'end_date' && handleUpdateCommonFields(type, value as string)
    || 
    type === 'start_time' && handleUpdateCommonFields(type, value as string)
    || 
    type === 'end_time' && handleUpdateCommonFields(type, value as string)
  };

  const handleUpdatePrecisionField = (value: number) => {
    setCreateABTestingData((prevState) => ({
      ...prevState,
      precision: _.round(1 - value / 100, 2),
    }));
  };


  const handleUpdateCommonFields = (
    type: CommonCreateABTestingTypes,
    value: CreateABTestingDataValueTypes
  ) => {
    setCreateABTestingData((prevState)=> ({
      ...prevState,
      [type]: value
    }))
  }

  const handleValidateSubmit = (): boolean => (
    _.isEmpty(createABTestingData.experiment_name)
    || _.isEmpty(createABTestingData.alpha)
    || _.isEmpty(createABTestingData.beta)
  )
   

  const handleSubmitData = () => {
    return
  }


  return (
    <div className="flex flex-row mt-5 justify-between">
      <CreateABTestShowForm
        createABTestingData={createABTestingData}
        handleUpdateCreateABTestingData={handleUpdateCreateABTestingData}
        handleValidateSubmit={handleValidateSubmit}
        handleSubmitData={handleSubmitData}
      />
      <CreateABTestShowJson data={createABTestingData} />
    </div>
  );
}
