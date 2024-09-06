"use client"

import {memo, useMemo, useCallback} from 'react';
import Select, { components } from 'react-select';
import _ from 'lodash'
import { AutoCompleteOption } from '@/types/components/AutoCompleteTypes';


const DropdownIndicator = (props: any) => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.293 9.293a1 1 0 011.414 0L10 10.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </components.DropdownIndicator>
        )
    );
}


interface ABTestAutocompleteProps<T> {
    value: AutoCompleteOption | AutoCompleteOption[]
    options: AutoCompleteOption[] | [];
    onChange: (value: AutoCompleteOption) => void;
    isSearchable?: boolean;
    placeholder?: string;
    autoFocus?: boolean;
    className?: string;
    classNamePrefix?: string;
    isClearable?: boolean;
    isDisabled?: boolean;
    isMulti?: boolean;
    name?: string;
}

const ABTestAutocomplete = <T,>({
    value,
    options,
    onChange,
    isSearchable = true,
    placeholder = 'Select an option',
    autoFocus = false,
    className,
    classNamePrefix,
    isClearable = true,
    isDisabled = false,
    isMulti = false,
    name,
}: ABTestAutocompleteProps<T>) => {

    const isOptions = (value: AutoCompleteOption | AutoCompleteOption[]): value is AutoCompleteOption => !_.isArray(value);

    const sortedOptions = useMemo(() => {
        return isOptions(value)
            ? _.sortBy(options, (list) => (list.label === value.label ? 0 : 1))
            : options;
    }, [value, options]);

    const handleSelectChange = useCallback((selectedOption: any) => {
        if (_.isNull(selectedOption)) selectedOption = {label: '', value: ''}
        onChange(selectedOption);
    }, [onChange]);

    return (
        <div className="w-full">
            <Select
                components={{ DropdownIndicator }}
                value={value}
                onChange={handleSelectChange}
                options={sortedOptions}
                isSearchable={isSearchable}
                placeholder={placeholder}
                autoFocus={autoFocus}
                classNames={{
                    control: (state) =>
                      state.isFocused ? 'border-red-600' : 'border-grey-300',
                    dropdownIndicator: (styles) => 'bg-black',
                    multiValue: (styles) => 'text-black rounded-xl rounded-full',
                    menuList: (styles) => 'text-black rounded-xl rounded-full',
                  }
                }
                classNamePrefix={classNamePrefix}
                isClearable={isClearable} 
                isDisabled={isDisabled}
                isMulti={isMulti}
                name={name}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                        neutral40: 'gray',
                        primary: 'black',
                    },
                  })}
                closeMenuOnSelect={false}
            />
        </div>
    );
}

export default ABTestAutocomplete;
