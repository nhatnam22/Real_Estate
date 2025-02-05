import React from 'react'
import { Link } from 'react-router-dom'
import { RiDashboard3Fill,RiMoneyDollarCircleFill } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import { SlPeople } from "react-icons/sl";
import { BsPersonCircle, BsPersonUp, BsFillPostcardFill } from "react-icons/bs";
import { Generation } from '@/components/generationUser';

const DashBoard = () => {
    return (
        <div className='w-screen h-screen flex'>
            <div className='w-[7%] flex-none border border-gray-300 z-30 drop-shadow-xl bg-white flex flex-col items-center py-4 gap-10'>
                <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700" >BDS VN</Link>
                <Link to="/" className="text-lg font-semibold flex flex-col gap-2 items-center" >
                    <RiDashboard3Fill size={30} />
                    Tổng quan
                </Link>
                <Link to="/" className="text-sm font-semibold flex flex-col gap-2 items-center" >
                    <CiCirclePlus size={30} />
                    Tin đăng
                </Link>
                <Link to="/" className="text-sm font-semibold flex flex-col gap-2 items-center" >
                    <SlPeople size={30} />
                    Khách hàng
                </Link>
                <Link to="/" className="text-sm font-semibold flex flex-col gap-2 items-center" >
                    <BsPersonCircle size={30} />
                    Tài khoản
                </Link>
                <Link to="/" className="text-sm font-semibold flex flex-col gap-2 items-center" >
                    <BsPersonUp size={30} />
                    Gói hội viên
                </Link>
            </div>

            <div className='flex flex-col flex-auto'>
                <div className='flex items-center justify-between p-6'>
                    <span className='text-4xl font-bold m-4 text-gray-700'>Tổng quan</span>
                    <span>Thông báo</span>
                </div>
                <div className='h-[2px] w-full bg-stone-200'></div>
                <div className='text-2xl font-bold m-4 text-gray-700'> Tổng quan tài khoản</div>
                <div className='mx-4 flex gap-6 items-center h-[140px]'>
                    <Generation  title="Tin đăng" icon={<BsFillPostcardFill size={20}/>} cap="0 tin" sub="Đang hiển thị" action="Đăng tin"/>
                    <Generation title="Liên hệ trong 30 ngày" icon={<SlPeople size={20}/>} cap="0 người" sub="0 mới vào ngày"/>
                    <Generation title="Số dư" icon={<RiMoneyDollarCircleFill size={20}/>} cap="0 đồng" sub="Tài khoản chính" action="Nạp tiền"/>
                    <Generation title="Gói hội viên" icon={<BsPersonUp size={20}/>} cap="Thảnh thơi đăng tin/đẩy tin không lo biến động giá"/>
                </div>

            </div>
        </div>
    )
}

export default DashBoard
