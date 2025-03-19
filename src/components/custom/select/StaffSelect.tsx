import React from 'react';
import {Staff} from '../../../types/staff.ts';
import {CustomSelect} from "../../common/CustomSelect.tsx";

interface StaffSelectProps {
    value?: string;
    onChange: (value: string) => void;
    staff: Staff[];
    error?: string;
    isDisabled?: boolean;
}

export const StaffSelect: React.FC<StaffSelectProps> = ({
                                                            value,
                                                            onChange,
                                                            staff,
                                                            error,
                                                            isDisabled
                                                        }) => {
    const options = staff.map(member => ({
        value: member.id,
        label: `${member.firstName} ${member.lastName} - ${member.contactNo}`
    }));

    return (
        <CustomSelect
            value={value}
            onChange={onChange}
            options={options}
            placeholder="Select Staff Member"
            error={error}
            isDisabled={isDisabled}
            isClearable
        />
    );
};