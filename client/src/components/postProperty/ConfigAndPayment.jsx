import React, { useEffect, useState } from 'react'
import { VscLightbulb } from "react-icons/vsc";
import { ChosseCalendar, Combo, TypePackage } from '../package';
import { typePackage } from '@/ultils/TypePackage';

const configAndPayment = ({packageValue, setPackagevalue, combo, setCombo, date, setDate, time, setTime}) => {
    // useEffect(() => {
    //     setPackagevalue("Tin Thường");
    //     setCombo("7 ngày");
    //   }, [])
    useEffect(() => {
        setCombo('7 ngày')
    }, [packageValue])
    return (
        <div className='w-[50%] flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
                <span className='text-xl font-semibold'>Chọn loại tin</span>
                <span className='text-sm'>So sánh các loại tin và giá</span>
            </div>
            <div className='flex flex-col'>
                <span className='flex items-center gap-2'>
                    <VscLightbulb />
                    Vị trí hiển thị càng cao, tỉ lệ chuyển đổi từ click thành liên hệ càng lớn
                </span>
                <TypePackage value={packageValue} setValue={setPackagevalue} />
            </div>
            <Combo data={packageValue} value={combo} setValue={setCombo}/>
            <ChosseCalendar valueDate={date} setValueDate={setDate} valueTime={time} setValueTime={setTime} valueCombo={combo}/>
        </div>
    )
}

export default configAndPayment
