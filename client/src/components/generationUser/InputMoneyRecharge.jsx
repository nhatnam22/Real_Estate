import React, { useState } from 'react'
import { Input } from '../ui/input'
import { MdNavigateNext } from "react-icons/md";
import { quickOptions } from '@/ultils/Constant';
import { Button } from '../ui/button';
import { Key } from 'lucide-react';
import { PaymentWithMoMoRequest } from '@/api/PaymentWithMoMoRequest';

const InputMoneyRecharge = ({ money, setMoney }) => {
    const handleQuickMoney = (val) => {
        setMoney(val)
    }
    const normalizeMoney = (money) => {
        const num = parseFloat(money)
        return isNaN(num) || num <= 0 ? null : num
    }
    const handleSubmit = async() =>{
        const normalizedMoney = normalizeMoney(money);
        if (!normalizedMoney) {
            alert("Vui lòng nhập số tiền hợp lệ!");
            return;
        }
        const data = {
            money: normalizedMoney
        }
        const response = await PaymentWithMoMoRequest(data)
        if(response.status == "CREATED"){
            window.location.href = response.data;
        }
    }
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='flex flex-col w-[60%] bg-white p-6 gap-2'>
                <label className='text-xl font-semibold' htmlFor="Nhập tiền">Nhập số tiền bạn muốn nạp (đ)</label>
                <Input className='w-full p-2 h-[60px]' value={money} onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                        setMoney(value);
                    }
                }} placeholder='Nhập số tiền cần nạp' id='Nhập tiền' />
                <div className='flex items-center justify-between'>
                    <span className='text-lg font-semibold'>Hoặc chọn nhanh</span>
                    <span className='flex text-red-400 text-lg hover:cursor-pointer items-center'>
                        Xem tất cả ưu đãi
                        <MdNavigateNext size={30} />
                    </span>
                </div>
                <div className='flex flex-wrap gap-4 justify-between'>
                    {quickOptions.map(option => (
                        <Button className='w-[30%]' key={option.value} variant='outline' onClick={() => handleQuickMoney(option.value)}>{option.value}</Button>
                    ))}
                </div>
                <Button variant='outline' className='bg-red-500 hover:bg-red-400' onClick={handleSubmit}>Tiếp tục</Button>
            </div>

        </div>
    )
}

export default InputMoneyRecharge
