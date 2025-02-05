import axios from '../config/axios'

export const GetRolesRequest = () => {
    return axios({
        method: 'get',
        url: '/roles'
    })
}