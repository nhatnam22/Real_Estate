import axios from '@/config/axios'

export const GetCurrentRequest = () => {
    return axios({
        method: 'get',
        url: 'auth/users/getuser'
    })
}