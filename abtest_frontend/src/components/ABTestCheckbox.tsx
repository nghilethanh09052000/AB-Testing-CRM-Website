'use client'

import { Checkbox } from "@material-tailwind/react";
import _ from 'lodash'

interface ABTestCheckBoxProps{
    checked: boolean;
    label: string;
    disabled?: boolean;
    handleIsCheck: (checked: boolean) => void;
}
const labelProps = {
  className: 'text-white'
}

export default function ABTestCheckBox({
    checked,
    label,
    disabled = false,
    handleIsCheck
}: ABTestCheckBoxProps) {
  return (
      <Checkbox 
        crossOrigin=''
        color="red"
        ripple
        disabled={disabled}
        label={label}
        onChange={(e) => handleIsCheck(e.target.checked)}
        checked={checked}
        labelProps={labelProps}
      />
  )
}