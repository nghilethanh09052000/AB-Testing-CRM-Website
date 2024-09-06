"use client";

import {  memo, useCallback, useMemo } from "react";
import ABTestSlider from "@/components/ABTestSlider";
import { Typography } from "@material-tailwind/react";
import { HandleUpdateFunction } from "../_types";

type AlphaBetaType = "alpha" | "beta";
interface CreateABTestSliderProps {
    label: string;
    type: AlphaBetaType;
    value: number;
    min: number;
    max: number;
    step: number;
    handleUpdateCreateABTestingData: HandleUpdateFunction;
}

const CreateABTestSlider = 
  ({
    label,
    type,
    value,
    min,
    max,
    step,
    handleUpdateCreateABTestingData,
  }: CreateABTestSliderProps) => {
    const handleOnChangeSlider = useCallback(
      (type: "alpha" | "beta", value: number) => {
        handleUpdateCreateABTestingData(type, value);
      },
      [handleUpdateCreateABTestingData]
    );
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
            <Typography variant="small" className="font-bold">{label}</Typography>
            <Typography variant="small">{value}</Typography>
        </div>
        <div className="flex flex-col">
            <ABTestSlider
            value={value}
            min={min}
            max={max}
            step={step}
            onChangeHandler={(value) => handleOnChangeSlider(type, value)}
            />
        </div>
        <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between">
                <p className="text-xs">{min}</p>
                <p className="text-xs">{max}</p>
            </div>
        </div>
      </div>
    );
  }

export default CreateABTestSlider;
