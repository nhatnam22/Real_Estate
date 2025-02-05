import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { twMerge } from 'tailwind-merge'
import {Label} from '@/components/ui/label'

const Radio = ({defaultValue, className, value, id, name}) => {
    return (
        <div>
            <RadioGroup defaultValue={defaultValue}>
                <div className={twMerge("flex items-center space-x-2",clsx(className? className :""))}>
                    <RadioGroupItem value={value} id={id} />
                    <Label htmlFor={id}>{name}</Label>
                </div>
            </RadioGroup>
        </div>
    )
}

export default Radio
