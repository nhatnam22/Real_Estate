import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const ProcessBar = ({ process }) => {
    const lengthArr = process.length; 
    return (
        <div className='flex gap-1 w-full h-[6px] relative overflow-hidden border rounded-[2px] mx-6'>
            <div className='w-full h-full bg-[#dc8282] rounded-[4px]'></div>
            <div
                className={lengthArr >= 2 ?'w-full h-full bg-[#dc8282] rounded-[4px]':'w-full h-full bg-stone-200 rounded-[4px]'}
            ></div>
            <div
                className={lengthArr >= 3 ?'w-full h-full bg-[#dc8282] rounded-[4px]':'w-full h-full bg-stone-200 rounded-[4px]'}
            ></div>
        </div>
    );
};

export default ProcessBar;
