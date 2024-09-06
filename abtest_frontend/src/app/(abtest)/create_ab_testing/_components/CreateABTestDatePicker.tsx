'use client'

import { Typography } from "@material-tailwind/react"
import { useState, memo, useCallback } from "react"
import { HandleUpdateFunction } from "../_types"
import { DateRangeType } from "react-tailwindcss-datepicker"
import Datepicker from "react-tailwindcss-datepicker"
import { style } from "d3"

interface CreateABTestDatePickerProps {
    label: string
    type: 'start_date' | 'end_date'
    handleUpdateCreateABTestingData: HandleUpdateFunction
}



const CreateABTestDatePicker = ({
    label,
    type,
    handleUpdateCreateABTestingData
}: CreateABTestDatePickerProps) => {

    const [initialValue, setValue] = useState<DateRangeType>({
        startDate: null,
        endDate: null
    })

    const handleValueChange = (newValue: any) => {
        const {startDate} = newValue
        setValue(newValue)
        handleUpdateCreateABTestingData(
            type,
            newValue = startDate
        )
    }

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    return (
        <div className="flex flex-col bg-black">
            <Typography variant="small" className="font-bold">{label}</Typography>
            <Datepicker
                asSingle={true} 
                value={initialValue}
                onChange={handleValueChange}
                primaryColor="red"
                displayFormat="YYYY/MM/DD"
                minDate={currentDate}
                dateLooking="middle"
            />
        </div>
    )
}

export default CreateABTestDatePicker