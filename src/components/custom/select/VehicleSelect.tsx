import React from 'react';
import {CustomSelect} from "../../common/CustomSelect.tsx";

interface VehicleSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: Array<{ value: string; label: string }>;
    placeholder: string;
    error?: string;
    isDisabled?: boolean;
}

export const VehicleSelect: React.FC<VehicleSelectProps> = ({
                                                                value,
                                                                onChange,
                                                                options,
                                                                placeholder,
                                                                error,
                                                                isDisabled
                                                            }) => {
    return (
        <CustomSelect
            value={value}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            error={error}
            isDisabled={isDisabled}
            isClearable
        />
    );
};