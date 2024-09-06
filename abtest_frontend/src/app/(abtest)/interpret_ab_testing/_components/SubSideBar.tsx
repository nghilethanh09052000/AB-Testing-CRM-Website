"use client"

import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import ABTestAutocomplete from "@/components/ABTestAutoComplete";
import { ExpsData } from "@/types/api/Get/GetExpData";
import _ from "lodash";


interface Options {
    value: string;
    label: string;
}

interface InterpretABTestSubSideBarProps {
  selectedExpsData: Options;
  data: ExpsData[];
  handleValueChange: (value: Options) => void
}

export default function InterpretABTestSubSideBar({
  selectedExpsData,
  data,
  handleValueChange
}: InterpretABTestSubSideBarProps) {

   // Autocomplete option should have these two keys and sort the selected option to be first index
  const options: Options[] = _.map(data, item => ({value: item.exp_id, label: item.exp_id}))
  return (
    <div className="flex flex-col ">
      <Typography variant="h5" color="white" className="bold text-center mb-5">
        Interpret AB Testing
      </Typography>

      <ABTestAutocomplete
        value={selectedExpsData}
        options={options}
        onChange={(value: Options) => handleValueChange(value)}
        placeholder="Select a Exps Id"       
      />
    </div>
  );
}
