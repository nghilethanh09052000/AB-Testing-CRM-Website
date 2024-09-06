'use client'
import Datepicker from "react-tailwindcss-datepicker"
import { DatepickerType } from "react-tailwindcss-datepicker"


export default function ABTestDatePicker(props: DatepickerType) {
    return (
        <Datepicker {...props} />
    )
}