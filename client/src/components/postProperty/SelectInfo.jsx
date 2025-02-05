import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SelectInfo = ({value, setValue, type}) => {
    return (
        <div>
            <label htmlFor={id}>{type}</label>
            <Select id={id} value={value} onValueChange={setValue}>
                <SelectTrigger>
                    {/* Sử dụng SelectValue để hiển thị giá trị được chọn */}
                    <SelectValue placeholder={`Chọn ${type}`} />
                </SelectTrigger>
                <SelectContent>
                    {items?.data?.map(item => (
                        <SelectItem value={item.code} key={item._id}>
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectInfo
