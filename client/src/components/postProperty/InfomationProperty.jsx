import React, { memo } from 'react'
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

const InfomationProperty = ({ children, variant, onClickVariant, title, choose }) => {
    return (
        <div className='w-[50%] border border-stone-300 rounded-xl p-3'>
            <div className='flex justify-between text-xl font-bold'>
                <span>
                    {title}
                </span>
                <span onClick={onClickVariant}>
                    {!variant ? <MdOutlineExpandMore className='items-center' /> : <MdOutlineExpandLess className='items-center' />}
                </span>
            </div>
            <div className='mt-3 w-full'>
                {!variant ? <span className={choose ? 'font-semibold': 'underline font-semibold'}>{choose ? choose : "Thêm Thông Tin"}</span> : <div className='w-full flex gap-4'>
                    {children}
                </div>
                }
            </div>
        </div>
    )
}

export default memo(InfomationProperty)
