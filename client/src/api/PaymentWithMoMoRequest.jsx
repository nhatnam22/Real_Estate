import qs from 'qs';
import axios from '@/config/axios'

export const PaymentWithMoMoRequest = (data) => {
    return axios({
        method: 'POST',
        url: 'http://localhost:8080/auth/users/charge',
        data: qs.stringify(data), // Chuyển đổi sang x-www-form-urlencoded
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};
