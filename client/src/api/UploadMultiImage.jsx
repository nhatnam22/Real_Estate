import axios from 'axios'

export const UploadImageRequest = (data) => {
    return axios({
        method: 'post',
        url: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        data
    })
}