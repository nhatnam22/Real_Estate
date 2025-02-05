import { combo, typePackage } from '@/ultils/TypePackage'
import React, { useMemo, useState, useEffect } from 'react'

const Combo = ({ data, value, setValue }) => {
  console.log(value)
  const onClickSelected = (e) => {
    const comboSelected = e.currentTarget.getAttribute("data")
    setValue(comboSelected)
  }
  const ComboChoosed = useMemo(() => {
    return data
      ? typePackage.find((el) => el.name === data)
      : typePackage.find((el) => el.name === "Tin Thường")
  }, [data]);
  return (
    <div className='w-full flex flex-col p-3 bg-gray-200 rounded-lg gap-3'>
      <h3>Đăng dài ngày hơn, tiết kiệm hơn!</h3>
      <div className='flex items-center justify-between'>
        {ComboChoosed?.subCombo?.map(cb => (
          <div data={cb.combo} onClick={onClickSelected} key={cb.id} className={`flex flex-col w-[30%] items-center bg-white border rounded-lg p-3 hover:cursor-pointer hover:bg-stone-100 ${value === cb.combo ? " border-black" : ""}`}>
            <span className='text-xl font-bold'>{cb.combo}</span>
            <span className='text-xl'>{cb.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Combo
