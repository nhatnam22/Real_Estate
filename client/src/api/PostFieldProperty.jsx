import axios from "@/config/axios"

export const PostFieldProperty = (data)=>{
    return axios({
        method: "POST",
        url: '/property/post-property',
        data
    })
}