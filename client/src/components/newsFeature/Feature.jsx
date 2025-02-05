import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { imagesCity } from '@/ultils/imagesCity'

const sub = [
    {
        id: 1,
        description: "Tiền Sử Dụng Đất: Thách Thức Của Doanh Nghiệp Và Thị Trường Bất Động Sản"
    },
    {
        id: 2,
        description: "Môi Giới Bất Động Sản Hướng Nội Và Khao Khát Chinh Phục Tự Do Tài Chính Từ Năm 22 Tuổi"
    },
    {
        id: 3,
        description: "Thị Trường Thuê Trọ Ngã Tư Sở Và Những Thông Tin Liên Quan Cần Biết"
    },
    {
        id: 4,
        description: "Căn Hộ Chung Cư – Điểm Nóng Của Thị Trường Bất Động Sản Việt Nam Năm 2024"
    },
    {
        id: 5,
        description: "Thị Trường BĐS Đà Nẵng: Dự Báo Xu Hướng Và Cơ Hội Đầu Tư"
    },
    {
        id: 6,
        description: "Giá Thuê Nhà Xưởng, Kho Bãi Tại Hà Nội Tăng Nhiệt"
    }
]

const Feature = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const menuItems = ["Tin nổi bật", "Tin tức", "BDS TPHCM", "BDS Hà Nội"]
    return (
        <div className='w-full mx-10' >
            <div className='grid grid-cols-4 w-full my-4'>
                <div className='col-span-3 flex-row'>
                    <div className="flex gap-6">
                        {menuItems.map((item, index) => (
                            <p
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`font-semibold text-2xl pb-2 
              ${activeIndex === index ? "border-b-4 border-red-500 text-red-500" : "border-b-2 border-stone-300 text-stone-400"}
              cursor-pointer hover:border-b-red-600`}
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                    <div className="w-full h-px bg-stone-200 mt-[-2px]"></div>

                    <div className='flex items-center justify-between gap-4'>
                        <div className='flex-col pt-4'>
                            <Card className='shadow-none outline-none border-none'>
                                <CardContent>
                                    <img className="object-cover w-[458px] h-[257px]" src={imagesCity.find(i => i.id = 1).image} alt="image" />
                                    <span className='text-3xl font-semibold'>Giá Thuê Nhà Xưởng, Kho Bãi Tại Hà Nội Tăng Nhiệt</span>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='p-4'>
                            {sub.map((el, index) => (
                                <span key={el.id}>
                                    <p className='text-md'>{el.description}</p>
                                    {index !== sub.length - 1 && (
                                        <div className="w-full h-6 flex items-center justify-center">
                                            <div className="w-full h-px bg-stone-200"></div>
                                        </div>
                                    )}
                                </span>
                            ))}
                        </div>


                    </div>
                </div>
                <div className='col-span-1 flex flex-col gap-4 w-full p-4'>
                    <img className="object-contain w-[250px] h-[250px] " src='https://tpc.googlesyndication.com/simgad/4851687981607128530' alt="Quảng cáo 1" />
                    <img className="object-contain w-[250px] h-[250px]" src='https://tpc.googlesyndication.com/simgad/4851687981607128530' alt="Quảng cáo 2" />
                </div>
            </div>
        </div>
    )
}




export default Feature
