import React, { memo } from 'react';
import { Button } from '@/components/ui/button';

const IncreaButton = ({ value, setValue }) => {
    const handleIncre = () => setValue(value + 1);
    const handleDecre = () => {
        if (value > 0) setValue(value - 1);
    };

    return (
        <div className='flex justify-center items-center gap-4 text-md'>
            <Button onClick={handleDecre} variant='outline' className='rounded-full'>-</Button>
            <span>{value}</span>
            <Button onClick={handleIncre} variant='outline' className='rounded-full'>+</Button>
        </div>
    );
};

export default memo(IncreaButton);
