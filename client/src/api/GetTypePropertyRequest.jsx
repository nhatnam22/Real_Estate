import axios from '@/config/axios'

export const GetTypePropertyRequest = () => {
    return axios({
        method: 'get',
        url: '/property/property-type',
    })
}
