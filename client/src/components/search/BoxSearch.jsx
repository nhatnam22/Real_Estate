// BoxSearch.js
import React from 'react'
import {
    DropdownMenuItem,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup
} from '@/components/ui/dropdown-menu'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { imagesCity } from '@/ultils/imagesCity'
import { provinces } from '@/ultils/Constant'
import { IoIosSearch } from "react-icons/io"

const BoxSearch = () => {
    return (
        <div className="w-full flex justify-center absolute top-1/2 transform -translate-y-1/2 z-20">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-100 w-[90vw] max-w-screen-lg">
                        <IoIosSearch className="text-xl" />
                        <p>Trên toàn quốc</p>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 p-2 bg-white border rounded-lg shadow-lg w-[90vw] max-w-screen-lg">
                    <DropdownMenuLabel className="text-gray-700 text-sm font-semibold mb-2">
                        Bạn muốn tìm bất động sản tại tỉnh thành nào?
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-2 border-gray-300" />
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-gray-600 text-xs font-semibold mb-1">
                            Các tỉnh thành nổi bật
                        </DropdownMenuLabel>
                        <div className="grid grid-cols-4 gap-2">
                            {imagesCity.map(i => (
                                <DropdownMenuItem key={i.id} asChild>
                                    <Card className="hover:bg-gray-100 p-2 rounded-lg">
                                        <CardContent className="flex flex-col items-center">
                                            <img src={i.image} alt={i.name} className="object-cover rounded-md w-full h-20" />
                                            <p className="text-center text-xs mt-2">{i.name}</p>
                                        </CardContent>
                                    </Card>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="my-2 border-gray-300" />
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-gray-600 text-xs font-semibold mb-1">
                            Tất cả tỉnh thành
                        </DropdownMenuLabel>
                        <div className="max-h-40 overflow-y-auto">
                            {provinces.map(el => (
                                <DropdownMenuItem key={el.id} className="hover:bg-gray-100 rounded-md p-2">
                                    {el.name}
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default BoxSearch
