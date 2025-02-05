import { Payment, ProfileUser } from '@/components/generationUser'
import React, { useCallback } from 'react'

const RechargeMoney = () => {
    return (
        <div className='w-screen h-screen flex'>
            <div className='w-[20%] flex-none border border-gray-300 z-30 drop-shadow-xl bg-white flex flex-col items-center py-4 gap-10'>
                <ProfileUser/>
            </div>
            <div className='flex-auto bg-stone-100'>
                <Payment/>
            </div>
        </div>
    )
}

export default RechargeMoney
