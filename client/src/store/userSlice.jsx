import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
// import { GetCurrentRequest } from '../api/GetCurrentRequest'
// import { GetRolesRequest } from '../api/GetRoles'
// import { BsCloudLightning } from 'react-icons/bs'
import { OK } from 'zod'
import { LoginRequest } from '@/api/LoginRequest'

export const useUserStore = create(persist((set, get) => ({
    token: null,
    current: null,
    roles: [],
    setToken: (token) => { set({ token }) },
    getCurrent: async () => {
        const response = await LoginRequest()
        if (response.status(OK)) {
            set({ current: response?.data?.name })
        } {
            set({ current: null })
        }

    },
    getRoles: async () => {
        const response = await GetRolesRequest()
        
        if (response.success === true) {
            console.log(response)
            set({ roles: [...response.data] })
        } {
            set({ roles: [] })
        }

    }
}),
    {
        name: "store_realestate",
        storage: createJSONStorage(() => localStorage),
        // partialize: (state) =>{Object.fromEntries(Object.entries(state).filter((el) =>{ return el[0] === "token" || el[0] === "current"}))}
    })
)