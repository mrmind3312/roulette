import { defineStore } from 'pinia'
import { apiService } from '~/services/apiService';

export const useUsersStore = defineStore('users', {
  state: () => ({
    user: null
  }),

  actions: {
    async login(email, password) {
      try {
        const { data, error } = await apiService.post('auth/login', { user: { email, password } })
        this.user = data;
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error)
        throw new Error('Invalid credentials')
      }
    },

    async logout() {
      this.user = null
    }
  }
})
