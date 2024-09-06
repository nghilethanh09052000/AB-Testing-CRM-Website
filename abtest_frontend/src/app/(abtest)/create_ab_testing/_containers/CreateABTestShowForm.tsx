"use client";
import { HandleUpdateFunction } from "../_types";
import { CreateABTestingData } from "@/types/api/Post/PostCreateABTestingData";
import { ABTestTimeList } from "@/utils/string";
import _ from "lodash";
import { Button } from "@material-tailwind/react";
import {
  CreateABTestInput,
  CreateABTestSlider,
} from "../_components";
import ABTestSelect from "@/components/ABTestSelect";
import CreateABTestDatePicker from "../_components/CreateABTestDatePicker";


interface CreateABTestShowFormProps {
  createABTestingData: CreateABTestingData;
  handleUpdateCreateABTestingData: HandleUpdateFunction;
  handleValidateSubmit: () => boolean;
  handleSubmitData: () => void
}

const convertedPercentagePrecisionNumber = (precision: number) =>
  100 - _.multiply(precision, 100);


const CreateABTestShowForm = 
  ({
    createABTestingData,
    handleUpdateCreateABTestingData,
    handleValidateSubmit,
    handleSubmitData
  }: CreateABTestShowFormProps): JSX.Element => {
    return (
      <div className="flex flex-col w-3/4">
        <div className="flex flex-col">
          <div className="grid gap-4 grid-cols-1 w-3/4">

            <div className="flex flex-col">
              <CreateABTestInput
                label="AB Testing Name"
                dataType={"experiment_name"}
                value={createABTestingData.experiment_name}
                handleUpdateCreateABTestingData={
                  handleUpdateCreateABTestingData
                }
              />
            </div>

            <div className="flex flex-col">
              <CreateABTestSlider
                label="Significant Level"
                type={"alpha"}
                value={createABTestingData.alpha}
                min={0.01}
                max={0.1}
                step={0.01}
                handleUpdateCreateABTestingData={
                  handleUpdateCreateABTestingData
                }
              />
            </div>
            <div className="flex flex-col mt-6">
              <CreateABTestSlider
                label="Type II Error Rate"
                type={"beta"}
                value={createABTestingData.beta}
                min={0.1}
                max={0.3}
                step={0.01}
                handleUpdateCreateABTestingData={
                  handleUpdateCreateABTestingData
                }
              />
            </div>

            {/* <div className="flex flex-row justify-start">
             
              <div className="flex flex-row pt-8">
                <ABTestCheckBox
                  label="Cuped"
                  checked={createABTestingData.cuped}
                  handleIsCheck={(value) =>
                    handleUpdateCreateABTestingData("cuped", value)
                  }
                />
              </div>
            </div> */}

            <div className="flex flex-col">
              <ABTestSelect
                label="Confident Interval Method"
                value={createABTestingData.test_method}
                onChangeHandler={(value) =>
                  handleUpdateCreateABTestingData("test_method", value)
                }
                options={['Sequencial']}
              />
            </div>

            <div className="flex flex-col">
              <CreateABTestInput
                label="State your HYPOTHESIS (Optional)"
                dataType={"hypothesis"}
                value={createABTestingData.hypothesis}
                handleUpdateCreateABTestingData={
                  handleUpdateCreateABTestingData
                }
              />
            </div>
            <div className="grid gap-4 grid-cols-2 mt-3">
              <div className="flex flex-col">
                <ABTestSelect
                  label="Add Entity"
                  value={createABTestingData.entity}
                  onChangeHandler={(value) =>
                    handleUpdateCreateABTestingData("entity", value)
                  }
                  options={['User']}
                  disabled={false}
                />
                
              </div>
              <div className="flex flex-row">
                <CreateABTestInput
                  label="Set Precision (%)"
                  dataType="precision"
                  inputType="number"
                  value={convertedPercentagePrecisionNumber(
                    createABTestingData.precision
                  )}
                  handleUpdateCreateABTestingData={
                    handleUpdateCreateABTestingData
                  }
                  min={1}
                  max={100}
                />
              </div>

              {/* <div className="flex flex-col">
                <ABTestSelect
                  label="Feature Lag"
                  value={createABTestingData.feature_lag}
                  onChangeHandler={(value) =>
                    handleUpdateCreateABTestingData("feature_lag", value)
                  }
                  options={listFeatureLag}
                />
              </div> */}

              
            </div>
            <div className="grid gap-4 grid-cols-2 mt-3">
              <div className="flex flex-col">
                <CreateABTestInput
                  label="Control Weight Expected Traffic"
                  dataType={"weight_traffic_control"}
                  value={createABTestingData.weight_traffic_control}
                  handleUpdateCreateABTestingData={
                    handleUpdateCreateABTestingData
                  }
                  inputType="number"
                  disabled={true}
                />
              </div>

              <div className="flex flex-col">
                <CreateABTestInput
                  label="Control Weight Expected Traffic"
                  dataType={"weight_traffic_treatment"}
                  value={createABTestingData.weight_traffic_treatment}
                  handleUpdateCreateABTestingData={
                    handleUpdateCreateABTestingData
                  }
                  inputType="number"
                  disabled={true}
                />
              </div>
            </div>

            <div className="grid gap-4 grid-cols-2 mt-3">
              <div className="flex flex-col">
                <CreateABTestDatePicker
                  label="Select Start Date"
                  type="start_date"
                  handleUpdateCreateABTestingData={
                    handleUpdateCreateABTestingData
                  }
                />
              </div>
              <div className="flex flex-col">
                <CreateABTestDatePicker
                  label="Select End Date"
                  type="end_date"
                  handleUpdateCreateABTestingData={
                    handleUpdateCreateABTestingData
                  }
                />
              </div>
              <div className="flex flex-col">
                <ABTestSelect
                  label="Start Time"
                  value={createABTestingData.start_time}
                  onChangeHandler={(value) =>
                    handleUpdateCreateABTestingData("start_time", value)
                  }
                  options={ABTestTimeList}
                />
              </div>

              <div className="flex flex-col">
                <ABTestSelect
                  label="End Time"
                  value={createABTestingData.end_time}
                  onChangeHandler={(value) =>
                    handleUpdateCreateABTestingData("end_time", value)
                  }
                  options={ABTestTimeList}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <Button color="red" onClick={(e)=> handleSubmitData} disabled={handleValidateSubmit()}>
                Create A/B Testing
              </Button>
            </div>
          </div>
        </div>
       

      </div>
    );
  }


export default CreateABTestShowForm;
