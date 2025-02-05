import { typePackage } from '@/ultils/TypePackage';
import React, { useState } from 'react'
import { HiOutlineCircleStack } from "react-icons/hi2";

const TypePackage = ({ value, setValue }) => {
    console.log(value)
    const onClickChoosePackage = (e) => {
        const selectedValue = e.currentTarget.getAttribute("data-value")
        setValue(selectedValue)
    }
    return (
        <div className='w-full flex items-center gap-3 justify-between'>
            {typePackage.map(pk => (
                <div onClick={onClickChoosePackage} data-value={pk.name} key={pk.id} className={`flex flex-col gap-2 w-[25%] h-[185px] border border-gray-200 rounded-lg p-4 shadow-lg hover:cursor-pointer z-10 ${value === pk.name ? "border-stone-600" : ""}`}>
                    <HiOutlineCircleStack />
                    <h3 className='font-bold'>{pk.name}</h3>
                    <span className='text-[12px] font-semibold'>{pk.description}</span>
                    <span className={'flex gap-2 rounded-lg p-1'} style={{
                        background: `linear-gradient(to right, ${pk.corlor}, white)`,
                    }}>
                        {pk.purpose && (<span className={' text-white p-1 rounded-lg border border-stone-500'} style={{
                            backgroundColor: pk.corlor,
                        }} >{pk.purpose}</span>)}
                        {pk.purpose && (<span className='text-[12px] w-[90px]'>lượt liên hệ so với thị trường</span>)}
                    </span>
                    <span className='text-[12px] font-bold'>{pk.price}</span>
                </div>
            ))}
        </div>
    )
}

export default TypePackage
