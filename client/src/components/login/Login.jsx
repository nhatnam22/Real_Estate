import React, { memo, useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormMessage, FormItem, FormControl, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { RegisterRequest } from '@/api/RegisterRequest'
import { LoginRequest } from '@/api/LoginRequest'
import Swal from 'sweetalert2'
import { GetTypeProvider } from '@/api/GetTypeProvider'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '@/store/authSlice'


const Login = () => {
    const [variant, setVariant] = useState("REGISTER")
    const { isLoggedIn } = useSelector(state => state.auth)

    useEffect(() => {
        console.log('Is logged in:', isLoggedIn);
    }, [isLoggedIn])

    const dispatch = useDispatch()
    const registerSchema = z.object({
        email: z.string().min(2, { message: "Email là bắt buộc" }).email("Định dạng email không hợp lệ"),
        name: z.string().min(2, { message: "Name là bắt buộc" }),
        roleID: z.string().min(1, { message: "RoleID là bắt buộc" }),
        password: z.string().min(8, { message: "Mật khẩu là bắt buộc" }),
        reTypePassword: z.string().min(8, { message: "Nhập lại mật khẩu" }),
    }).refine((data) => data.password === data.reTypePassword, {
        path: ["reTypePassword"],
        message: "Mật khẩu không khớp",
    });

    const loginSchema = z.object({
        email: z.string().min(2, { message: "Email là bắt buộc" }).email("Định dạng email không hợp lệ"),
        name: z.string().min(2, { message: "Name là bắt buộc" }),
        password: z.string().min(8, { message: "Mật khẩu là bắt buộc" }),
    });
    const form = useForm({
        resolver: zodResolver(variant === "REGISTER" ? registerSchema : loginSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            reTypePassword: "",
            roleID: ""
        }
    })


    const onChangeState = () => {
        form.reset();
        if (variant === "REGISTER") {
            setVariant("LOGIN")
        } else {
            setVariant("REGISTER")
        }
    }
    const onHandleGoogle = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/users/login/login-type/google');

            // Kiểm tra xem phản hồi có chứa URL hay không
            if (response.data && response.data.data && response.data.data.uri) {
                console.log(response)
                window.location.href = response.data.data.uri;
            }
        } catch (error) {
            console.error("Lỗi khi lấy URL đăng nhập Google:", error);
        }
    };
    const onHandleSubmit = async (data) => {
        console.log("Form data:", data);
        try {
            let response;
            if (variant === "LOGIN") {
                response = await LoginRequest(data);
                dispatch(login({
                    token: response.data.jwt_token,
                    refreshtoken: response.data.refresh_token,
                }))
                console.log(isLoggedIn)
            } else if (variant === "REGISTER") {
                response = await RegisterRequest(data);
                console.log(response);
            }
        } catch (error) {
            console.error("Error during API request:", error);
        }
    }
    return (
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onHandleSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>email</FormLabel>
                            <FormControl>
                                <Input placeholder="user@example.com" {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>name</FormLabel>
                            <FormControl>
                                <Input placeholder="Trần văn A" {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {variant === "REGISTER" && (<FormField
                    control={form.control}
                    name="roleID"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>roleID</FormLabel>
                            <FormControl>
                                <Input placeholder="1 or 2" {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />)}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter password" {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {variant === "REGISTER" && (
                    <FormField
                        control={form.control}
                        name="reTypePassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>retypePassword</FormLabel>
                                <FormControl>
                                    <Input placeholder="Retype password" {...field} type="password" aria-label="Retype Password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <Button className='w-full' type="submit">
                    {variant === "REGISTER" ? "Đăng Kí" : "Đăng Nhập"}
                </Button>
            </form>
            <div className="w-full h-6 flex items-center justify-center relative">
                <div className="w-full h-px bg-stone-300"></div>
                <span className="absolute bg-white px-2 text-stone-500">Hoặc</span>
            </div>
            <p className='text-center flex gap-1 text-sm'>
                {variant === "REGISTER" ? <span>Bạn là thành viên </span> : <span> Bạn đã là thành viên chưa?</span>}
                <span className='text-red-500 hover:underline' onClick={onChangeState}>{variant === "REGISTER" ? "Đăng nhập" : "Đăng kí"}</span>
                <span>Tại đây</span>
            </p>
            <Button onClick={onHandleGoogle}>Đăng nhập bằng Google</Button>
        </Form>
    )
}

export default memo(Login);
