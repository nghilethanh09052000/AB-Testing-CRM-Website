'use client'


import { Input, Typography } from "@material-tailwind/react";
import _ from 'lodash'

interface ABTestInputProps {
    value: string | number;
    label: string;
    type?: 'text' | 'email' | 'number';
    max?: number
    min?: number
    disabled?: boolean
    onChangeHandler: (e: string) => void;
    
}

export default function ABTestInput({
    value,
    label,
    type,
    max,
    min,
    disabled = false,
    onChangeHandler
}: ABTestInputProps) {


    return (
        <div className="grid gap-2 grid-cols-1 w-full">
            <Typography variant="small" className="font-bold">{_.toUpper(label)}</Typography>
            <Input 
                value={value}
                variant="outlined" 
                // label={_.toUpper(label)}
                onChange={(e) => onChangeHandler(e.target.value)}
                crossOrigin=""
                color="white"
                type={type || 'text'}
                min={min}
                max={max}
                disabled={disabled}
            />
        </div>
      );
}