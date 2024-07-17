import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', () => {
    const user = ref({email: '', password: ''})

    const setUser = (user) => {
        user.value = user   
    }

    return {setUser, user}
})