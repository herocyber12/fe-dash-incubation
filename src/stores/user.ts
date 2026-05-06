import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', () => {
    const deviceKey = ref(localStorage.getItem('deviceKey') || '')
    const setKey = (key: string) => {
        deviceKey.value = key
        localStorage.setItem('deviceKey', key)
    }

    const clearKey = () => {
        deviceKey.value = ''
        localStorage.removeItem('deviceKey')
    }

    const isLoggin = () => !!deviceKey.value

    return {
        deviceKey,
        setKey,
        clearKey,
        isLoggin
    }
})