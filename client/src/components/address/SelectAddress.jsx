import React, { memo } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SelectAddress = ({ type, items, id, value, setValue }) => {
    console.log(items)
    return (
        <div>
            {id && <label htmlFor={id}>{type}</label>}
            <Select id={id} value={value} onValueChange={setValue}>
                <SelectTrigger>
                    {/* Hiển thị giá trị được chọn */}
                    <SelectValue placeholder={`Chọn ${type}`} />
                </SelectTrigger>
                <SelectContent>
                    {type === "Loại BDS" &&
                        items?.map((item) => (
                            <SelectItem value={item.name} key={item.name}>
                                {item.name}
                            </SelectItem>
                        ))}

                    {type !== "Hướng Nhà" && items?.data?.map((item) => (
                        <SelectItem value={item.id} key={item.id}>
                            {item.name}
                        </SelectItem>
                    ))}

                    {type === "Hướng Nhà" &&
                        items?.map((item) => (
                            <SelectItem value={item} key={item}>
                                {item}
                            </SelectItem>
                        ))}
                    {type === "Hẹn giờ đăng tin" &&
                        items?.map((item) => (
                            <SelectItem value={item.name} key={item.id}>
                                {item.name}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default memo(SelectAddress);
