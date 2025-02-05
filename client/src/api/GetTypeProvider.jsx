import axios from "axios";

export const GetTypeProvider = ()=>{
    return axios({
        method: 'get',
        url:"/login/login-type/google"
    })
}