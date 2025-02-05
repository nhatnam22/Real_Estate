import React from 'react'
import { GrFormNext } from "react-icons/gr";

const Generation = ({title, icon, cap, sub, action}) => {
  return (
    <div className='flex flex-col gap-1 font-semibold bg-stone-100 text-black h-full rounded-md py-2 px-3 w-1/4'>
      <span className='flex gap-2  items-center '>
        {icon}
        <h2 className='text-lg'>{title}</h2>
      </span>
      <span className='text-xl'>
        {cap}
      </span>
      <span className='text-md'>{sub}</span>
      {action && (
        <span className='text-md text-red-600 underline flex gap-1 items-center'>
            {action}
            <GrFormNext/>
        </span>
      )}
    </div>
  )
}

export default Generation
