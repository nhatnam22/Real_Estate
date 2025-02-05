import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { IoCalendarOutline } from "react-icons/io5";
import { Calendar } from '../ui/calendar';
import { totalDate, formatDate, formatDateTime } from '@/ultils/Helper';
import { combo } from '@/ultils/TypePackage';
import SelectAddress from '../address/SelectAddress';
import { timer } from '@/ultils/Constant';

const ChosseCalendar = ({ valueDate, setValueDate, valueTime, setValueTime, valueCombo }) => {
    console.log(valueCombo)
    console.log(valueDate)
    console.log(totalDate(valueCombo, valueDate))
    return (
        <div className='flex w-full items-center gap-2'>
            {/* Chọn ngày đăng tin */}
            <div className='flex flex-col w-1/2 flex-none gap-3'>
                <h3 className='font-bold'>Ngày đăng tin</h3>
                <Popover className="w-full">
                    <PopoverTrigger className='w-full'>
                        <Button variant='outline' className='flex justify-between items-center w-full rounded-xl'>
                            {formatDate(valueDate)} {/* Hiển thị ngày được chọn */}
                            <IoCalendarOutline />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            mode="single"
                            selected={valueDate}
                            onSelect={setValueDate} // Cập nhật ngày được chọn
                            className="rounded-md border"
                        />
                    </PopoverContent>
                </Popover>
                <small>{`Hết hạn vào ngày ${formatDate(totalDate(valueCombo, valueDate))}`}</small>
            </div>

            {/* Hẹn giờ đăng tin */}
            <div className='flex flex-col flex-auto gap-3'>
                <h3 className='font-bold'>Hẹn giờ đăng tin</h3>
                    <SelectAddress type="Hẹn giờ đăng tin" value={valueTime} setValue={setValueTime} items={timer}/>
                <small>Chỉ áp dụng với tài khoản Pro & tin VIP</small>
            </div>
        </div>
    )
}

export default ChosseCalendar
