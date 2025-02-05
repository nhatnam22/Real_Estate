import axios from '@/config/axios'

export const LoginRequest = (data) => {
    return axios({
        method: 'post',
        url: '/auth/users/login',
        data
    })
}
