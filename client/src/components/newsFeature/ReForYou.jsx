import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

const ReForYou = () => {
    return (
        <div className='w-full bg-[#FAFAFA] py-[40px] px-[184px]'>
            <div className='flex items-center justify-between mt-[24px]'>
                <h2 className='font-bold text-[24px]'>Bất động sản dành cho bạn</h2>
                <div className='flex items-center justify-between gap-2'>
                    <span><Link to="/">Tin nhà đất bán mới nhất</Link></span>
                    <span>|</span>
                    <span><Link to="/">Tin nhà đất cho thuê mới nhất</Link></span>
                </div>
            </div>
            <div className='flex flex-wrap items-center justify-center gap-[30px] mt-[24px]'>
                <Card className='w-[292px] h-[318px]'/>
                <Card className='w-[292px] h-[318px]'/>
                <Card className='w-[292px] h-[318px]'/>
                <Card className='w-[292px] h-[318px]'/>
                <Card className='w-[292px] h-[318px]'/>
                <Card className='w-[292px] h-[318px]'/>
                <Card className='w-[292px] h-[318px]'/>
                <Card className='w-[292px] h-[318px]'/>
            </div>
            <div className='flex items-center justify-center mt-[24px]'>
                <Button variant='outline' className='px-8 py-6'>
                    <span className='text-[14px]'>Mở rộng</span>
                    <MdOutlineExpandMore className='text-[24px]' />
                </Button>
            </div>
        </div>
    )
}

export default ReForYou
