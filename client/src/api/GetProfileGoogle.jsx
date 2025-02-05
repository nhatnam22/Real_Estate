import axios from "@/config/axios"

export const GetProfileGoogle = (code)=>{
    return axios({
        method: 'get',
        url:`auth/users/login/exchange-code?code=${code}`
    })
}