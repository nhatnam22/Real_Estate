import axios from '@/config/axios'

export const GetAllDirection = () => {
    return axios({
        method: 'get',
        url: 'property/direction/get-all'
    })
}