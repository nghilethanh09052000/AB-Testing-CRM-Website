"use client";

import { Select, Option, Typography } from "@material-tailwind/react";
import _ from "lodash";

interface ABTestSelectProps {
  label: string;
  options: string[];
  value: string;
  success?:boolean;
  error?: boolean;
  disabled?:boolean
  onChangeHandler: (selectedValue: string) => void
}

export default function ABTestSelect({ 
  label, 
  options,
  value,
  success,
  error,
  disabled,
  onChangeHandler
}: ABTestSelectProps) {


  return (
    <div className="grid gap-2 grid-cols-1 w-full">
      <Typography variant="small" className="font-bold">{label}</Typography>
      <Select
        label={label}
        value={value}
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        onChange={ selectedValue => onChangeHandler(selectedValue || '')}
        className="text-white"
        success={success}
        error={error}
        disabled={disabled}
      >
        {_.map(options, (option) => (
          <Option key={option} value={option}>{option}</Option>
        ))}
      </Select>
    </div>
  );
}
