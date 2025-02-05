import React from 'react'
import { useSelector } from 'react-redux'
import { MdContentCopy } from "react-icons/md";
import { TbCreditCardPay } from "react-icons/tb";
import { Button } from '../ui/button';
import { imagesCity } from '@/ultils/imagesCity';

const ProfileUser = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const email = userInfo?.email;
    console.log(email);

    return (
        <div className='flex flex-col w-full items-center gap-6 p-2'>
            <div className='flex items-center gap-3 w-full'>
                <img className='rounded-full size-16' src={imagesCity.find(i => i.id = 1).image}></img>
                <div className='flex flex-col items-center gap-2 justify-center'>
                    <span className='text-xl'>{email}</span>
                    <span>0 điểm</span>
                </div>
            </div>
            <div className='bg-stone-200 px-4 py-2 flex flex-col rounded-md w-full gap-3'>
                <h1 className='text-black font-semibold text-xl'>Số dư tài khoản</h1>
                <span className='flex items-center justify-between'>
                    <h3 className='text-gray-600'>TK chính</h3>
                    <span>0</span>
                </span>
                <span className='flex items-center justify-between'>
                    <h3 className='text-gray-600'>TK khuyến mãi</h3>
                    <span>0</span>
                </span>
                <div className='bg-white px-4 rounded-md'>
                    <h3 className='text-gray-500'>Mã chuyển khoản</h3>
                    <span className='flex items-center justify-between'>
                        <span>00000000</span>
                        <MdContentCopy />
                    </span>
                </div>
                <Button variant='outline' className='border-red-600 p-6 text-red-600'>
                    <TbCreditCardPay />
                    Nạp tiền
                </Button>
            </div>
        </div>
    )
}

export default ProfileUser
