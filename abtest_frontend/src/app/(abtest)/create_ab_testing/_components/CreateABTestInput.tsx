'use client'

import ABTestInput from "@/components/ABTestInput"
import { HandleUpdateFunction } from "../_types";
import { Typography } from "@material-tailwind/react";
import _ from 'lodash'


interface CreateABTestInputProps {
    label: string;
    dataType: 'experiment_name' | 'precision' | 'hypothesis' | 'weight_traffic_control' | 'weight_traffic_treatment';
    inputType?: 'text' | 'number';
    value: string | number;
    max?: number;
    min?:number;
    disabled?: boolean;
    handleUpdateCreateABTestingData: HandleUpdateFunction
}

const CreateABTestInput = ({
    label,
    dataType,
    inputType = 'text',
    value,
    max,
    min,
    disabled = false,
    handleUpdateCreateABTestingData
}:CreateABTestInputProps) => {

    const handleOnChangeInput = (value: number | string) => {
        
        if(min && max) {
            if(_.toNumber(value) < min || _.toNumber(value) > 100 ) return
        }

        handleUpdateCreateABTestingData(
            dataType, 
            (inputType === 'number' && inputType !== undefined) 
            ? +value
             : value
        )
        }
    return (
        <div className="flex flex-col">
        <div className="flex flex-col">
           <ABTestInput
                label={label}
                value={value}
                type={inputType}
                onChangeHandler={(value) => handleOnChangeInput(value)}
                min={min}
                max={max}
                disabled={disabled}
           />
        </div>
      </div>
    )
}
export default CreateABTestInput