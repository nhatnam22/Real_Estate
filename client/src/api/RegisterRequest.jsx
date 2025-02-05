import axios from '../config/axios'

//quên return dữ liệu làm response undefined
export const RegisterRequest = (data) => {
    return axios({
        method:'post',
        url: '/auth/users/register',
        data
    })
}