import React, { useEffect, useState } from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from 'react-router-dom'
import { navigation } from '@/ultils/Navigation'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTitle, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Login } from '@/components/login'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser } from '@/store/usersSlice'
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { paths } from '@/ultils/path'

const Header = () => {
    const [variant, setVariant] = useState(true)
    const handleSetvariant = ()=>{
        setVariant(!variant)
    }
    const navigate = useNavigate()
    const handleNavigate = () => { navigate("user/dang-bai") }

    const dispatch = useDispatch();
    const { current, roles, image, loading, error, email } = useSelector(state => state.userInfo);
    const { isLoggedIn } = useSelector(state => state.auth)

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchCurrentUser());
        }
    }, [dispatch, isLoggedIn]);
    return (
        <div className="flex h-24 items-center justify-between p-4 border-b-[1px]">
            <div className='flex gap-3 mr-4'>
                <Link to="/" className="px-2 text-3xl font-bold text-blue-600 hover:text-blue-700" >BDS VN</Link>
                <NavigationMenu>
                    <NavigationMenuList>
                        {navigation.map(item => (
                            item.hasSubs ? (
                                <NavigationMenuItem key={item.id}>
                                    <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                                    <NavigationMenuContent className='grid grid-cols-2 min-w-96'>
                                        {item.subs.map(sub => (
                                            <NavigationMenuLink key={sub} className=' text-sm mb-2 mx-4 px-2 hover:bg-stone-300'>
                                                {sub}
                                            </NavigationMenuLink>
                                        ))}
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ) : (
                                <NavigationMenuItem key={item.id}>
                                    <NavigationMenuLink key={item.id} href={item.path} className='hover:underline'>
                                        {item.name}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

            </div>
            <div onClick={e => e.stopPropagation()} className='flex gap-4 items-center'>
                <div><Button variant='outline' className='hover:bg-stone-200' onClick={handleNavigate}>Đăng tin</Button></div>
                {email ? (<div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex gap-2 items-center font-medium' onClick={handleSetvariant}>
                            {current} 
                            {variant === true?<MdOutlineExpandMore/>:<MdOutlineExpandLess/>}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><Link to={`user/${paths.user.DashBoard}`}>Tổng quan</Link></DropdownMenuItem>
                            <DropdownMenuItem>Quản lý tin đăng</DropdownMenuItem>
                            <DropdownMenuItem>Quản lý khách hàng</DropdownMenuItem>
                            <DropdownMenuItem>Thay đổi thông tin cá nhân</DropdownMenuItem>
                            <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>) : <Dialog>
                    <DialogTrigger asChild>
                        <Button variant='outline' className='hover:bg-stone-200'>
                            Đăng kí/ Đăng Nhập
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle></DialogTitle>
                        <Login />
                    </DialogContent>
                </Dialog>}
            </div>
        </div>
    )
}



export default Header
