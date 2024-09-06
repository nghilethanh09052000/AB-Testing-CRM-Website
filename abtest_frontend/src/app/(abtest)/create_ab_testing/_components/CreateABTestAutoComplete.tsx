"use client";

import { memo, useCallback, useMemo } from "react";
import { Typography } from "@material-tailwind/react";
import ABTestAutocomplete from "@/components/ABTestAutoComplete";
import _ from "lodash";
import { HandleUpdateFunction } from "../_types";
import { AutoCompleteOption } from "@/types/components/AutoCompleteTypes";

type MetricType = 'kpi' | 'secondary_metrics'
interface CreateABTestAutoCompleteProps {
    type: MetricType
    data: string | string[];
    options: string[];
    handleUpdateCreateABTestingData: HandleUpdateFunction;
    title: string;
    placeholder: string;
    isMulti?: boolean
    disabled?: boolean
}

const getValueAutoCompleteData = (
    data: string | string[],
    type: MetricType
): AutoCompleteOption | AutoCompleteOption[] => (
    type === 'kpi'
        ? { value: data as string, label: data as string }
        : _.map(data, d => ({ value: d, label: d }))
)

const getAutoCompleteOption = (options: string[]): AutoCompleteOption[] => _.map(options, option => ({ label: option, value: option }))



const CreateABTestAutoComplete = 
    ({
        type,
        data,
        options,
        handleUpdateCreateABTestingData,
        title,
        placeholder,
        isMulti,
        disabled
    }: CreateABTestAutoCompleteProps) => {

        const value = getValueAutoCompleteData(data, type)
        const filterOptions = getAutoCompleteOption(options)

        const handleAutoCompleteChange = useCallback(
            (
                type: MetricType,
                value: AutoCompleteOption | AutoCompleteOption[]
            ) => {
                handleUpdateCreateABTestingData(
                    type,
                    type === "kpi"
                        ? (value as AutoCompleteOption).label
                        : _.map(value as AutoCompleteOption[], (d) => d.label)
                );
            },
            [handleUpdateCreateABTestingData]
        );

        return (
            <div className="flex flex-col">
                <div className="flex flex-col text-white">
                    <Typography variant="small" className="font-bold">
                        {title}
                    </Typography>
                    <ABTestAutocomplete
                        value={value}
                        options={filterOptions}
                        onChange={(value: AutoCompleteOption) =>
                            handleAutoCompleteChange(type, value)
                        }
                        placeholder={placeholder}
                        isDisabled={disabled}
                        isMulti={isMulti}
                    />
                </div>
            </div>
        );
    }


export default CreateABTestAutoComplete